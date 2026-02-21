import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../api/api';
import Loader from '../components/Loader';
import './MyBookingsPage.css';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [searchedEmail, setSearchedEmail] = useState('');

  const fetchBookings = async () => {
    if (!searchedEmail) return;
    
    try {
      setLoading(true);
      setError('');
      
      const response = await bookingAPI.getBookingsByEmail(searchedEmail);
      
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      setError(error.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [searchedEmail]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSearchedEmail(email.trim());
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return '#28a745';
      case 'Pending':
        return '#ffc107';
      case 'Completed':
        return '#17a2b8';
      case 'Cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="my-bookings-page">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>View and manage your expert session bookings</p>
      </div>
      
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="email-input"
            required
          />
          <button type="submit" className="search-btn">
            Search Bookings
          </button>
        </form>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {loading && searchedEmail ? (
        <Loader size="medium" text="Loading your bookings..." />
      ) : (
        <>
          {searchedEmail && bookings.length === 0 && !error && (
            <div className="no-bookings">
              <h3>No bookings found</h3>
              <p>You don't have any bookings associated with {searchedEmail}</p>
            </div>
          )}
          
          {bookings.length > 0 && (
            <div className="bookings-list">
              <h2>Your Bookings ({bookings.length})</h2>
              
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <div className="booking-header">
                    <div className="expert-info">
                      <h3>{booking.expertId.name}</h3>
                      <span className="expert-category">{booking.expertId.category}</span>
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
                      <span className="label">Booking ID:</span>
                      <span className="value">{booking.bookingId}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Date:</span>
                      <span className="value">{formatDate(booking.date)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Time:</span>
                      <span className="value">{booking.timeSlot}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Expert Email:</span>
                      <span className="value">{booking.expertId.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Your Email:</span>
                      <span className="value">{booking.clientEmail}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span className="value">{booking.clientPhone}</span>
                    </div>
                  </div>
                  
                  {booking.notes && (
                    <div className="booking-notes">
                      <h4>Notes</h4>
                      <p>{booking.notes}</p>
                    </div>
                  )}
                  
                  <div className="booking-footer">
                    <small>
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {!searchedEmail && (
        <div className="search-prompt">
          <div className="prompt-icon">📅</div>
          <h3>Find Your Bookings</h3>
          <p>Enter your email address to view all your expert session bookings</p>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
