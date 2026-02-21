# Expert Session Booking System

A real-time expert session booking system built with React (frontend) and Node.js + Express + MongoDB (backend).

## 🚀 Features

### Core Functionality
- **Expert Listing**: Browse experts with search and filtering capabilities
- **Real-time Booking**: Book sessions with real-time slot availability updates
- **Double Booking Prevention**: Atomic transactions prevent race conditions
- **Booking Management**: View and manage your booking history
- **Real-time Updates**: Socket.io integration for live slot updates

### Technical Features
- **Frontend**: React 18 with modern hooks and context API
- **Backend**: Node.js + Express with proper REST API design
- **Database**: MongoDB with optimized indexing
- **Real-time**: Socket.io for live updates
- **Validation**: Comprehensive input validation
- **Error Handling**: Proper error handling throughout the application
- **Responsive Design**: Mobile-first responsive UI

## 📁 Project Structure

```
expert-session-booking-system/
├── client/                        # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                  # API service functions
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # React context providers
│   │   ├── hooks/                # Custom React hooks
│   │   ├── pages/                # Page components
│   │   ├── routes/               # App routing
│   │   ├── utils/                # Utility functions
│   │   └── App.js                # Main App component
│   ├── package.json
│   └── README.md
│
├── server/                        # Node.js + Express Backend
│   ├── src/
│   │   ├── config/               # Database configuration
│   │   ├── controllers/          # Route controllers
│   │   ├── middleware/           # Custom middleware
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # API routes
│   │   ├── sockets/              # Socket.io handlers
│   │   ├── utils/                # Utility functions
│   │   ├── app.js                # Express app configuration
│   │   └── server.js             # Server startup
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expert-booking-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

5. Start the frontend development server:
```bash
npm start
```

## 📱 Application Usage

### For Users
1. **Browse Experts**: View available experts with filtering by category and search by name
2. **View Expert Details**: See expert profiles, ratings, and available time slots
3. **Book Sessions**: Select date and time slots, fill booking form with validation
4. **Track Bookings**: View your booking history and status updates

### Real-time Features
- Live slot availability updates when other users book
- Instant notifications for booking confirmations
- Real-time status updates for existing bookings

## 🔧 API Endpoints

### Experts
- `GET /api/experts` - Get all experts with pagination and filtering
- `GET /api/experts/:id` - Get expert by ID with available slots

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings?email=<email>` - Get bookings by email
- `PATCH /api/bookings/:id/status` - Update booking status

## 🎯 Key Features Implemented

### ✅ Frontend Features
- [x] Expert listing with search and category filtering
- [x] Expert detail pages with comprehensive information
- [x] Real-time slot availability display
- [x] Booking form with client-side validation
- [x] My Bookings page with email lookup
- [x] Responsive design for all screen sizes
- [x] Toast notifications for user feedback
- [x] Loading states and error handling
- [x] Pagination for large datasets

### ✅ Backend Features
- [x] RESTful API with proper HTTP methods
- [x] MongoDB integration with Mongoose ODM
- [x] Real-time updates using Socket.io
- [x] Double booking prevention with atomic transactions
- [x] Comprehensive input validation
- [x] Error handling middleware
- [x] Environment variable configuration
- [x] CORS configuration for frontend integration

### ✅ Critical Requirements
- [x] **Double Booking Prevention**: Uses MongoDB transactions to prevent race conditions
- [x] **Real-time Updates**: Socket.io integration for live slot updates
- [x] **Proper Error Handling**: Validation and meaningful error responses
- [x] **Environment Variables**: Secure configuration management

## 🎨 UI/UX Features

- Modern gradient designs and smooth animations
- Intuitive navigation with breadcrumb trails
- Real-time feedback with toast notifications
- Mobile-responsive design with touch-friendly interfaces
- Accessible color schemes and typography
- Loading states and skeleton screens
- Error states with helpful messages

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred hosting platform
3. Ensure MongoDB is accessible from your deployment environment

### Frontend Deployment
1. Build the production bundle:
```bash
npm run build
```
2. Deploy the `build` folder to your hosting service
3. Update environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.
