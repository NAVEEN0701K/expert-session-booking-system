# Expert Session Booking System - Frontend

## Overview

This is the frontend React application for the Expert Session Booking System, providing a modern and intuitive interface for booking expert sessions.

## Features

- Expert listing with search and filtering
- Expert detail pages with real-time slot availability
- Booking form with validation
- My Bookings page to view booking history
- Real-time updates using Socket.io
- Responsive design with modern UI
- Toast notifications for user feedback

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
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── api/            # API service functions
├── components/     # Reusable UI components
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── routes/         # App routing configuration
├── utils/          # Utility functions
├── App.js          # Main App component
└── index.js        # Entry point
```

## Components

### Core Components
- **ExpertCard** - Display expert information in grid layout
- **SlotList** - Show available time slots with date selection
- **BookingForm** - Form for creating new bookings
- **Pagination** - Navigate through paginated results
- **SearchBar** - Search experts by name
- **FilterDropdown** - Filter experts by category
- **Loader** - Loading indicator component

### Pages
- **ExpertListPage** - Main experts listing with search and filters
- **ExpertDetailPage** - Expert details with booking functionality
- **BookingPage** - Booking page (redirects to expert detail)
- **MyBookingsPage** - View user's booking history

## Features Implemented

✅ Real-time slot updates when booked by other users
✅ Form validation with error handling
✅ Responsive design for mobile and desktop
✅ Toast notifications for user feedback
✅ Loading states and error handling
✅ Search and filtering functionality
✅ Pagination for large datasets
✅ Modern UI with gradients and animations
✅ Socket.io integration for real-time updates

## Technologies Used

- **React 18** - UI framework
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **CSS3** - Styling with modern features

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL
- `REACT_APP_SOCKET_URL` - Socket.io server URL

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
