const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { createBooking, getBookingsByEmail, updateBookingStatus } = require('../controllers/bookingController-demo');
const validate = require('../middleware/validateMiddleware');

const bookingValidation = [
  body('expertId').notEmpty().withMessage('Expert ID is required'),
  body('clientName').notEmpty().withMessage('Client name is required'),
  body('clientEmail').isEmail().withMessage('Valid email is required'),
  body('clientPhone').notEmpty().withMessage('Phone number is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('notes').optional().isString()
];

const statusValidation = [
  body('status').isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled']).withMessage('Invalid status')
];

router.post('/', bookingValidation, validate, createBooking);

router.get('/', getBookingsByEmail);

router.patch('/:id/status', statusValidation, validate, updateBookingStatus);

module.exports = router;
