const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getExperts, getExpertById } = require('./controllers/expertController-demo');
const { createBooking, getBookingsByEmail, updateBookingStatus } = require('./controllers/bookingController-demo');
const { register, login } = require('./controllers/authController-demo');
const { authenticateToken } = require('./middleware/authMiddleware-demo');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes-demo');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running in demo mode with authentication' });
});

app.use('/api/auth', authRoutes);

app.get('/api/experts', getExperts);
app.get('/api/experts/:id', getExpertById);

app.post('/api/bookings', authenticateToken, createBooking);
app.get('/api/bookings', authenticateToken, getBookingsByEmail);
app.patch('/api/bookings/:id/status', authenticateToken, updateBookingStatus);

app.use(errorHandler);

module.exports = app;
