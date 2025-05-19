import { Appointment } from '../models/index.js';

const TIME_SLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

export async function getAvailableTimeSlots(req, res) {
  const { doctorId, date } = req.query;
  if (!doctorId || !date) {
    return res.status(400).json({ error: 'doctorId and date required' });
  }

  try {
    // Get all booked appointments for this doctor on that date
    const bookedAppointments = await Appointment.findAll({
      where: { doctorId, date }
    });

    // Extract booked times
    const bookedTimes = bookedAppointments.map(app => app.time);

    // Filter out booked times
    const availableTimes = TIME_SLOTS.filter(time => !bookedTimes.includes(time));

    res.status(200).json(availableTimes);
  } catch (err) {
    console.error('Error fetching times:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

