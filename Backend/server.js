import express from 'express';
import {json} from 'express';
const app = express();
import { sequelize } from './models/index.js';
import cors from 'cors';
app.use(cors());


app.use(json());

// Route imports
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

import notificationRoutes from './routes/notificationRoutes.js';
app.use('/api/notifications', notificationRoutes);

// Route mounting
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admin', adminRoutes);

// Start
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('🔥 Server running on http://localhost:3000');
  });
});


