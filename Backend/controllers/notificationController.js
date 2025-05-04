import { Notification } from '../models/index.js';

// Get all notifications for a patient
export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.findAll({
      where: { patientId: req.params.patientId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
}

// Mark as read
export async function markAsRead(req, res) {
  try {
    const notif = await Notification.findByPk(req.params.id);
    if (!notif) return res.status(404).json({ error: 'Notification not found' });

    notif.isRead = true;
    await notif.save();
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
}
