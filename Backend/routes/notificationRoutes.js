import { Router } from 'express';
const router = Router();
import { getNotifications, markAsRead } from '../controllers/notificationController.js';

router.get('/:patientId', getNotifications);
router.put('/:id/read', markAsRead);

export default router;
