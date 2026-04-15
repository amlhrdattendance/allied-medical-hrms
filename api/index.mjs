import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';
// Use local path for middleware in serverless env
import { authenticateToken, authorizeRoles } from '../middleware/auth.mjs';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'ape-self-secret-2026';

app.use(cors());
app.use(express.json());

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

// --- MASTERS ---
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

// --- EMPLOYEES ---
app.post('/api/employees', authenticateToken, authorizeRoles('Admin', 'HR'), async (req, res) => {
    const payload = req.body;
    try {
        if (!payload.employeeCode) {
            const count = await prisma.employeeMaster.count();
            payload.employeeCode = `AS-${String(count + 1).padStart(4, '0')}`;
        }
        const newEmp = await prisma.employeeMaster.create({ data: payload });
        res.json({ success: true, data: newEmp });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Export for Vercel
export default app;
