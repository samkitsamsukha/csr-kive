import express from 'express';
import { submitReport } from '../controllers/submitReportController.js';
const router = express.Router();

// POST: Submit report for an event
router.post('/:adminId/:eventId/submit', submitReport);

export default router;