import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { expertAPI } from '../api/api';
import SlotList from '../components/SlotList';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import { useSocket } from '../context/SocketContext';
import { useSocketEvents } from '../hooks/useSocket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ExpertDetailPage.css';

const ExpertDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { socket, joinExpertRoom, leaveExpertRoom } = useSocket();
  
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);

  const fetchExpert = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await expertAPI.getExpertById(id);
      
      if (response.data.success) {
        setExpert(response.data.data);
        
        if (response.data.data.availableSlots?.length > 0) {
          const firstAvailableDate = response.data.data.availableSlots[0].date;
          setSelectedDate(firstAvailableDate);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
  }, [id]);

  useEffect(() => {
    if (expert?._id) {
      joinExpertRoom(expert._id);
    }
    
    return () => {
      if (expert?._id) {
        leaveExpertRoom(expert._id);
      }
    };
  }, [expert?._id, joinExpertRoom, leaveExpertRoom]);

  useSocketEvents({
    slotBooked: (data) => {
      if (data.expertId === expert?._id) {
        setExpert(prev => {
          const updated = { ...prev };
          const daySlot = updated.availableSlots.find(slot => 
            new Date(slot.date).toDateString() === new Date(data.date).toDateString()
          );
          
          if (daySlot) {
            const slot = daySlot.timeSlots.find(s => s.time === data.timeSlot);
            if (slot) {
              slot.isBooked = true;
            }
          }
          
          return updated;
        });
        
        // If current user was viewing this slot, clear selection
        if (selectedDate === data.date && selectedSlot === data.timeSlot) {
          setSelectedSlot('');
          toast.warning('The time slot you selected was just booked by another user!');
        } else {
          toast.info(`Time slot ${data.timeSlot} on ${new Date(data.date).toLocaleDateString()} was just booked by another user`);
        }
        
        setIsBookingInProgress(false);
      }
    },
    bookingInProgress: (data) => {
      if (data.expertId === expert?._id) {
        setIsBookingInProgress(true);
        toast.info(`Someone is booking ${data.timeSlot} on ${new Date(data.date).toLocaleDateString()}...`);
      }
    }
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookSlot = () => {
    if (selectedDate && selectedSlot) {
      setShowBookingForm(true);
    }
  };

  const handleBookingSuccess = (booking) => {
    setShowBookingForm(false);
    setSelectedSlot('');
    
    toast.success(`Booking confirmed! Your booking ID is ${booking.bookingId}`);
    
    setTimeout(() => {
      navigate('/my-bookings');
    }, 3000);
  };

  const handleBookingCancel = () => {
    setShowBookingForm(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  if (loading) {
    return <Loader size="large" text="Loading expert details..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          {error}
        </div>
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Experts
        </button>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="error-container">
        <div className="error-message">
          Expert not found
        </div>
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Experts
        </button>
      </div>
    );
  }

  return (
    <div className="expert-detail-page">
      <ToastContainer position="top-right" />
      
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Experts
      </button>
      
      <div className="expert-header">
        <div className="expert-info">
          <h1>{expert.name}</h1>
          <div className="expert-meta">
            <span className="category-badge">{expert.category}</span>
            <div className="rating">
              <span className="stars">{renderStars(expert.rating)}</span>
              <span className="rating-value">({expert.rating.toFixed(1)})</span>
            </div>
            <div className="experience">
              <span className="experience-label">Experience:</span>
              <span className="experience-value">{expert.experience} years</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="expert-content">
        <div className="expert-bio">
          <h2>About</h2>
          <p>{expert.bio}</p>
        </div>
        
        <div className="booking-section">
          <SlotList
            availableSlots={expert.availableSlots || []}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onDateSelect={handleDateSelect}
            onSlotSelect={handleSlotSelect}
            isBookingInProgress={isBookingInProgress}
          />
          
          {selectedDate && selectedSlot && (
            <div className="booking-actions">
              <button
                onClick={handleBookSlot}
                className="book-slot-btn"
              >
                Book {selectedSlot} on {new Date(selectedDate).toLocaleDateString()}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {showBookingForm && (
        <div className="booking-modal">
          <div className="modal-content">
            <BookingForm
              expert={expert}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onBookingSuccess={handleBookingSuccess}
              onCancel={handleBookingCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertDetailPage;
