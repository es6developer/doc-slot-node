import express from 'express';
import { createTimeSlots, getSlots, getSlotsByDate } from '../controllers/slots';
// express router object
const router = express.Router();

// Api Routes 
router.post('/', createTimeSlots);
router.get('/', getSlotsByDate);

module.exports = router;