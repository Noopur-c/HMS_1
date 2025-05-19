import {Doctor } from '../models/index.js';

export async function getDepartments(req, res) {
  try {
    const departments = await Doctor.findAll({
      attributes: ['specialization'],
      group: ['specialization']
    });

    const departmentList = departments.map(d => d.specialization);
    res.status(200).json(departmentList);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
}