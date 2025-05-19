import express from 'express';
import { json } from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import PatientsNotification from './models/patientsNotification.js';

// Route imports
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

const app = express();

// ✅ Enable CORS for frontend on port 4200 with credentials
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(json()); // for parsing application/json

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
console.log('Mounting patient routes at /patients');
app.use('/api/doctors', doctorRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);

// ✅ Start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Database sync error:', err);
  });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});



