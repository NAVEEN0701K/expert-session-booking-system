const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getExperts, getExpertById } = require('./controllers/expertController-demo');
const { createBooking, getBookingsByEmail, updateBookingStatus } = require('./controllers/bookingController-demo');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running in demo mode' });
});

app.get('/api/experts', getExperts);
app.get('/api/experts/:id', getExpertById);
app.post('/api/bookings', createBooking);
app.get('/api/bookings', getBookingsByEmail);
app.patch('/api/bookings/:id/status', updateBookingStatus);

app.use(errorHandler);

module.exports = app;
