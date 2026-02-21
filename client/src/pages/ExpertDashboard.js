import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import './ExpertDashboard.css';

const ExpertDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, approved, confirmed, completed

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get all bookings and filter for current expert
      const response = await bookingAPI.getBookingsByEmail(user.email);
      
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingAPI.updateBookingStatus(bookingId, newStatus);
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: newStatus }
            : booking
        )
      );
    } catch (error) {
      alert('Failed to update booking status: ' + error.message);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#ffc107';
      case 'Confirmed': return '#28a745';
      case 'Completed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <Loader size="large" text="Loading your bookings..." />;
  }

  if (error) {
    return (
      <div className="expert-dashboard">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="expert-dashboard">
      <div className="dashboard-header">
        <h1>Expert Dashboard</h1>
        <p className="dashboard-subtitle">Manage your bookings and client sessions</p>
        {user && (
          <div className="expert-info">
            <div className="expert-details">
              <span className="expert-label">Name:</span>
              <span className="expert-value">{user.name}</span>
            </div>
            <div className="expert-details">
              <span className="expert-label">Category:</span>
              <span className="expert-value">{user.category || 'Expert'}</span>
            </div>
            <div className="expert-details">
              <span className="expert-label">Email:</span>
              <span className="expert-value">{user.email}</span>
            </div>
            <div className="expert-details">
              <span className="expert-label">Status:</span>
              <span className="expert-value status-approved">Approved Expert</span>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{bookings.length}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{bookings.filter(b => b.status === 'Approved').length}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{bookings.filter(b => b.status === 'Confirmed').length}</div>
          <div className="stat-label">Confirmed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{bookings.filter(b => b.status === 'Completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="dashboard-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({bookings.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved ({bookings.filter(b => b.status === 'Approved').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed ({bookings.filter(b => b.status === 'Confirmed').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({bookings.filter(b => b.status === 'Completed').length})
        </button>
      </div>

      <div className="bookings-container">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <h3>No {filter === 'all' ? '' : filter} bookings found</h3>
            <p>
              {filter === 'all' 
                ? 'You don\'t have any bookings yet.' 
                : `You don't have any ${filter} bookings.`
              }
            </p>
          </div>
        ) : (
          <div className="bookings-grid">
            {filteredBookings.map(booking => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-info">
                    <h3>{booking.clientInfo?.name || 'Client Name'}</h3>
                    <p className="booking-email">{booking.clientInfo?.email || 'client@example.com'}</p>
                    <p className="booking-phone">{booking.clientInfo?.phone || '+1 (555) 123-4567'}</p>
                    <p className="booking-expert">Expert: {booking.clientInfo?.expertName || 'Expert Name'}</p>
                  </div>
                  <div className="booking-status">
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(booking.status) }}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
                
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="detail-label">Expert:</span>
                    <span className="detail-value">{booking.expertId?.name || 'Expert Name'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{booking.expertId?.category || 'Category'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{formatDate(booking.date)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{booking.timeSlot}</span>
                  </div>
                  {booking.notes && (
                    <div className="detail-row">
                      <span className="detail-label">Notes:</span>
                      <span className="detail-value">{booking.notes}</span>
                    </div>
                  )}
                </div>

                <div className="booking-actions">
                  {booking.status === 'Approved' && (
                    <button 
                      className="action-btn confirm-btn"
                      onClick={() => handleStatusUpdate(booking._id, 'Confirmed')}
                    >
                      Accept Booking
                    </button>
                  )}
                  {booking.status === 'Approved' && (
                    <button 
                      className="action-btn reject-btn"
                      onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
                    >
                      Reject Booking
                    </button>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button 
                      className="action-btn complete-btn"
                      onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertDashboard;
