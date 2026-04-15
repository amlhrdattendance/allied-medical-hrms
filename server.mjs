import express from 'express';
import cors from 'cors';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Get existing company profile (for hydration)
app.get('/api/company/setup', async (req, res) => {
  try {
    const profile = await prisma.companyProfile.findFirst();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create or update company profile
app.post('/api/company/setup', async (req, res) => {
  try {
    const payload = req.body;
    
    // Check if one exists to act as an update or create
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
    
    console.log("✅ REAL-TIME HRMS DB INSERT:", result);
    res.json({ success: true, data: result, autoSync: 'Allied Medical HRMS DB Updated' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE: Employee Onboarding
app.post('/api/onboarding/employee', async (req, res) => {
  try {
    const payload = req.body;
    
    // Auto-generate employeeCode if missing
    if(!payload.employeeCode) {
      const count = await prisma.employeeMaster.count();
      payload.employeeCode = `AML-EMP-${String(count + 1).padStart(3, '0')}`;
    }

    const newEmp = await prisma.employeeMaster.create({
      data: payload
    });
    
    res.json({ success: true, data: newEmp, message: 'Employee Onboarded successfully!' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: All Employees (Master View)
app.get('/api/employees', async (req, res) => {
  try {
    const emps = await prisma.employeeMaster.findMany();
    res.json({ success: true, data: emps });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => {
  console.log('🚀 Local Allied HRMS Express/Prisma API running on port 3001');
});
