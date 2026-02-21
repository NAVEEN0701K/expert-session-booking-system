# Expert Session Booking System - Backend

## Overview

This is the backend server for the Expert Session Booking System, built with Node.js, Express, and MongoDB.

## Features

- RESTful API for experts and bookings
- Real-time updates using Socket.io
- Double booking prevention with race condition handling
- Proper validation and error handling
- MongoDB database integration

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expert-booking-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Experts
- `GET /api/experts` - Get all experts with pagination and filtering
- `GET /api/experts/:id` - Get expert by ID with available slots

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings?email=<email>` - Get bookings by email
- `PATCH /api/bookings/:id/status` - Update booking status

### Socket.io Events
- `joinExpertRoom` - Join a room for expert-specific updates
- `leaveExpertRoom` - Leave an expert room
- `slotBooked` - Real-time slot booking updates
- `bookingStatusUpdated` - Real-time booking status updates

## Database Models

### Expert
- name, category, experience, rating, bio, email
- availableSlots with date and timeSlots array

### Booking
- expertId, clientName, clientEmail, clientPhone
- date, timeSlot, notes, status, bookingId

## Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── sockets/        # Socket.io handlers
├── utils/          # Utility functions
├── app.js          # Express app configuration
└── server.js       # Server startup file
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `NODE_ENV` - Environment (development/production)

## Features Implemented

✅ Real-time slot updates with Socket.io
✅ Double booking prevention with database transactions
✅ Proper validation using express-validator
✅ Error handling middleware
✅ MongoDB indexing for performance
✅ CORS configuration
✅ Environment variable configuration
