const Booking = require('../models/Booking');
const Expert = require('../models/Expert');
const { generateBookingId, isSlotAvailable } = require('../utils/slotHelper');

const createBooking = async (req, res) => {
  try {
    const { expertId, clientName, clientEmail, clientPhone, date, timeSlot, notes } = req.body;
    
    const expert = await Expert.findById(expertId);
    if (!expert) {
      return res.status(404).json({
        success: false,
        error: 'Expert not found'
      });
    }
    
    const available = isSlotAvailable(expert, date, timeSlot);
    if (!available) {
      return res.status(400).json({
        success: false,
        error: 'Time slot is not available'
      });
    }
    
    const existingBooking = await Booking.findOne({
      expertId,
      date: new Date(date),
      timeSlot
    });
    
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        error: 'This time slot is already booked'
      });
    }
    
    const session = await Expert.startSession();
    session.startTransaction();
    
    try {
      const booking = new Booking({
        expertId,
        clientName,
        clientEmail,
        clientPhone,
        date: new Date(date),
        timeSlot,
        notes,
        bookingId: generateBookingId()
      });
      
      await booking.save({ session });
      
      const dateStr = new Date(date).toDateString();
      const daySlots = expert.availableSlots.find(slot => 
        new Date(slot.date).toDateString() === dateStr
      );
      
      if (daySlots) {
        const slot = daySlots.timeSlots.find(s => s.time === timeSlot);
        if (slot) {
          slot.isBooked = true;
        }
      } else {
        expert.availableSlots.push({
          date: new Date(date),
          timeSlots: [{
            time: timeSlot,
            isBooked: true
          }]
        });
      }
      
      await expert.save({ session });
      
      await session.commitTransaction();
      session.endSession();
      
      const populatedBooking = await Booking.findById(booking._id)
        .populate('expertId', 'name category email');
      
      req.io.emit('slotBooked', {
        expertId,
        date,
        timeSlot,
        booking: populatedBooking
      });
      
      res.status(201).json({
        success: true,
        data: populatedBooking
      });
      
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }
    
    const bookings = await Booking.find({ clientEmail: email })
      .populate('expertId', 'name category email rating')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    
    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('expertId', 'name category email');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    req.io.emit('bookingStatusUpdated', {
      bookingId: booking._id,
      status,
      expertId: booking.expertId._id
    });
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus
};
