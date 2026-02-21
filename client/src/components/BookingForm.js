import React, { useState } from 'react';
import { validateBookingForm } from '../utils/validators';
import { bookingAPI } from '../api/api';
import './BookingForm.css';

const BookingForm = ({ expert, selectedDate, selectedSlot, onBookingSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      ...formData,
      expertId: expert._id,
      date: selectedDate,
      timeSlot: selectedSlot
    };
    
    const validation = validateBookingForm(bookingData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await bookingAPI.createBooking(bookingData);
      
      if (response.data.success) {
        onBookingSuccess(response.data.data);
      } else {
        setErrors({ submit: response.data.error });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form">
      <div className="booking-header">
        <h3>Book Session with {expert.name}</h3>
        <div className="booking-details">
          <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {selectedSlot}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="clientName">Full Name *</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className={errors.clientName ? 'error' : ''}
            placeholder="Enter your full name"
          />
          {errors.clientName && <span className="error-message">{errors.clientName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="clientEmail">Email Address *</label>
          <input
            type="email"
            id="clientEmail"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className={errors.clientEmail ? 'error' : ''}
            placeholder="your.email@example.com"
          />
          {errors.clientEmail && <span className="error-message">{errors.clientEmail}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="clientPhone">Phone Number *</label>
          <input
            type="tel"
            id="clientPhone"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            className={errors.clientPhone ? 'error' : ''}
            placeholder="+1 (555) 123-4567"
          />
          {errors.clientPhone && <span className="error-message">{errors.clientPhone}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Additional Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Any specific topics or questions you'd like to discuss..."
          />
        </div>
        
        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
        
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
