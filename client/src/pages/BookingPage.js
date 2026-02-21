import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Booking Page</h1>
        <p>This page is handled within the Expert Detail Page.</p>
        <button 
          onClick={() => navigate('/')}
          className="back-to-experts-btn"
        >
          Browse Experts
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
