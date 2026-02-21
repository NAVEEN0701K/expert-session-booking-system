import React from 'react';
import './SlotList.css';

const SlotList = ({ availableSlots, selectedDate, selectedSlot, onDateSelect, onSlotSelect, isBookingInProgress }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    const slotDate = new Date(date);
    return today.toDateString() === slotDate.toDateString();
  };

  const isPastTime = (time) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes);
    
    return slotTime < now;
  };

  const isPastSlot = (date, time) => {
    if (!isToday(date)) return false;
    return isPastTime(time);
  };

  return (
    <div className="slot-list">
      <h3 className="slot-list-title">
        Available Time Slots 
        {isBookingInProgress && <span className="booking-indicator"> (Booking in progress...)</span>}
      </h3>
      
      <div className="date-tabs">
        {availableSlots.map((daySlot) => (
          <button
            key={daySlot.date}
            className={`date-tab ${selectedDate === daySlot.date ? 'active' : ''} ${isToday(daySlot.date) ? 'today' : ''}`}
            onClick={() => onDateSelect(daySlot.date)}
          >
            {formatDate(daySlot.date)}
            {isToday(daySlot.date) && <span className="today-badge">Today</span>}
          </button>
        ))}
      </div>
      
      {selectedDate && (
        <div className="time-slots">
          {(() => {
            const selectedDaySlot = availableSlots.find(slot => slot.date === selectedDate);
            return selectedDaySlot?.timeSlots.map((slot) => (
              <button
                key={slot.time}
                className={`time-slot ${slot.isBooked ? 'booked' : ''} ${selectedSlot === slot.time ? 'selected' : ''} ${isPastSlot(selectedDate, slot.time) ? 'past' : ''}`}
                onClick={() => !slot.isBooked && !isPastSlot(selectedDate, slot.time) && onSlotSelect(slot.time)}
                disabled={slot.isBooked || isPastSlot(selectedDate, slot.time)}
              >
                {slot.time}
                {slot.isBooked && <span className="booked-badge">Booked</span>}
                {isPastSlot(selectedDate, slot.time) && <span className="past-badge">Past</span>}
              </button>
            ));
          })()}
        </div>
      )}
      
      {!selectedDate && (
        <div className="select-date-prompt">
          <p>Please select a date to view available time slots</p>
        </div>
      )}
    </div>
  );
};

export default SlotList;
