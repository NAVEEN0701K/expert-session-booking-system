import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ExpertListPage from '../pages/ExpertListPage';
import ExpertDetailPage from '../pages/ExpertDetailPage';
import BookingPage from '../pages/BookingPage';
import MyBookingsPage from '../pages/MyBookingsPage';
import LoginPage from '../pages/LoginPage';
import AboutPage from '../pages/AboutPage';
import ExpertDashboard from '../pages/ExpertDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import { SocketProvider } from '../context/SocketContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import './AppRoutes.css';

const Navigation = () => {
  const { user, logout } = useAuth();

  const isExpert = user?.email && (
    user.email.includes('expert') ||
    user.email.includes('dr.') ||
    user.email.includes('sarah') ||
    user.email.includes('michael') ||
    user.email.includes('emily') ||
    user.email.includes('james') ||
    user.email.includes('lisa')
  );

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <header className="app-header">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo">Expert Booking</h1>
          <div className="nav-links">
            <a href="/" className="nav-link">Experts</a>
            <a href="/my-bookings" className="nav-link">My Bookings</a>
            {isExpert && (
              <a href="/expert-dashboard" className="nav-link">Expert Dashboard</a>
            )}
            <a href="/about" className="nav-link">About</a>
            {user && (
              <div className="user-menu">
                <span className="user-name">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="app">
            <Navigation />

            <main className="main-content">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/expert-dashboard" element={
                  <ProtectedRoute>
                    <ExpertDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/" element={
                  <ProtectedRoute>
                    <ExpertListPage />
                  </ProtectedRoute>
                } />
                <Route path="/expert/:id" element={
                  <ProtectedRoute>
                    <ExpertDetailPage />
                  </ProtectedRoute>
                } />
                <Route path="/booking" element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                } />
                <Route path="/my-bookings" element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>

            <footer className="app-footer">
              <div className="footer-content">
                <p>&copy; 2026 Expert Session Booking System. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
