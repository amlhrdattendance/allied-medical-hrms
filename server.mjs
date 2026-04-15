import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';
import { authenticateToken, authorizeRoles } from './middleware/auth.mjs';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'ape-self-secret-2026';

app.use(cors());
app.use(express.json());

// --- SEED: Create Super Admin if none exists ---
const seedAdmin = async () => {
    const adminCount = await prisma.user.count({ where: { role: 'Admin' } });
    if (adminCount === 0) {
        const hashedPassword = await bcrypt.hash('Allied@0103', 10);
        await prisma.user.create({
            data: {
                username: 'superadmin',
                password: hashedPassword,
                role: 'Admin'
            }
        });
        console.log("✅ Default Super Admin created: superadmin / Allied@0103");
    }
};
seedAdmin().catch(console.error);

// --- AUTH ROUTES ---

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: { employee: true }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, error: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role, employeeId: user.employeeId },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                employee: user.employee
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- EMPLOYEE MANAGEMENT ---

app.get('/api/employees', authenticateToken, async (req, res) => {
    try {
        const employees = await prisma.employeeMaster.findMany({
            include: { branch: true, department: true, designation: true }
        });
        res.json({ success: true, data: employees });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/employees', authenticateToken, authorizeRoles('Admin', 'HR'), async (req, res) => {
    const payload = req.body;
    try {
        // Auto-generate employeeCode
        if (!payload.employeeCode) {
            const count = await prisma.employeeMaster.count();
            payload.employeeCode = `AS-${String(count + 1).padStart(4, '0')}`;
        }

        const newEmp = await prisma.employeeMaster.create({
            data: payload
        });
        res.json({ success: true, data: newEmp });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- ATTENDANCE ---

app.post('/api/attendance/clock-in', authenticateToken, async (req, res) => {
    const { employeeId, location, ipAddress } = req.body;
    const date = new Date().toISOString().split('T')[0];
    try {
        const existing = await prisma.attendance.findFirst({
            where: { employeeId, date }
        });

        if (existing) {
            return res.status(400).json({ success: false, error: "Already clocked in today" });
        }

        const log = await prisma.attendance.create({
            data: {
                employeeId,
                date,
                clockIn: new Date(),
                locationIn: location,
                ipAddress,
                status: 'Present'
            }
        });
        res.json({ success: true, data: log });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- LEAVE MANAGEMENT ---

app.post('/api/leave/apply', authenticateToken, async (req, res) => {
    const payload = req.body;
    try {
        const leave = await prisma.leaveRequest.create({
            data: {
                ...payload,
                status: 'Pending'
            }
        });
        res.json({ success: true, data: leave });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- COMPANY SETUP ---

app.get('/api/company/setup', async (req, res) => {
    try {
        const profile = await prisma.companyProfile.findFirst();
        res.json({ success: true, data: profile });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/company/setup', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
    const payload = req.body;
    try {
        const existing = await prisma.companyProfile.findFirst();
        let result;
        if (existing) {
            result = await prisma.companyProfile.update({
                where: { id: existing.id },
                data: payload
            });
        } else {
            result = await prisma.companyProfile.create({
                data: payload
            });
        }
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- MASTER DATA ---

app.get('/api/masters', authenticateToken, async (req, res) => {
    try {
        const [branches, departments, designations] = await Promise.all([
            prisma.branch.findMany(),
            prisma.department.findMany(),
            prisma.designation.findMany()
        ]);
        res.json({ success: true, data: { branches, departments, designations } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3001, () => {
    console.log('🚀 Ape Self HRMS API running on port 3001');
});
