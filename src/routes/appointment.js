import express from 'express';
import { createAppointment, getAppointments } from '../controllers/appointments';
// express router object
const router = express.Router();

// Api Routes 
router.post('/', createAppointment);
router.get('/', getAppointments);

module.exports = router;