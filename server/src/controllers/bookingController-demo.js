const BookingModel = require('../models/Booking-demo');
const ExpertModel = require('../models/Expert-demo');
const { isSlotAvailable } = require('../utils/slotHelper');

const createBooking = async (req, res) => {
  try {
    const { expertId, clientName, clientEmail, clientPhone, date, timeSlot, notes } = req.body;
    
    // Emit booking progress event
    if (req.io) {
      req.io.emit('bookingInProgress', {
        expertId,
        date,
        timeSlot
      });
    }
    
    const expertData = await ExpertModel.findById(expertId);
    if (!expertData) {
      return res.status(404).json({
        success: false,
        error: 'Expert not found'
      });
    }
    
    const available = isSlotAvailable(expertData, date, timeSlot);
    if (!available) {
      return res.status(400).json({
        success: false,
        error: 'Time slot is not available'
      });
    }
    
    const existingBooking = await BookingModel.findOne({
      expertId,
      date,
      timeSlot
    });
    
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        error: 'This time slot is already booked'
      });
    }
    
    const booking = await BookingModel.create({
      expertId,
      clientName,
      clientEmail,
      clientPhone,
      date: new Date(date),
      timeSlot,
      notes,
      status: 'Approved' // New bookings start as "Approved" instead of "Pending"
    });
    
    // Create response with expert information included
    const populatedBooking = {
      ...booking,
      expertId: {
        _id: expertData._id,
        name: expertData.name,
        category: expertData.category,
        email: expertData.email
      },
      // Include expert name in client information for display
      clientInfo: {
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        expertName: expertData.name // Add expert name for client-side display
      }
    };
    
    if (req.io) {
      req.io.emit('slotBooked', {
        expertId,
        date,
        timeSlot,
        booking: populatedBooking
      });
    }
    
    res.status(201).json({
      success: true,
      data: populatedBooking
    });
    
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
    
    let bookings = await BookingModel.find();
    
    // If email provided, filter for that user (client or expert)
    if (email) {
      bookings = bookings.filter(booking => 
        booking.clientEmail === email || booking.expertId?.email === email
      );
    }
    
    // Convert all "Pending" bookings to "Approved" in the response
    bookings = bookings.map(booking => ({
      ...booking,
      status: booking.status === 'Pending' ? 'Approved' : booking.status
    }));
    
    // Populate expert information for each booking
    const populatedBookings = await Promise.all(bookings.map(async (booking) => {
      const expert = await ExpertModel.findById(booking.expertId);
      return {
        ...booking,
        expertId: expert ? {
          _id: expert._id,
          name: expert.name, // Use actual expert name
          category: expert.category,
          email: expert.email
        } : {
          _id: booking.expertId,
          name: 'Expert Name',
          category: 'Category',
          email: 'expert@example.com'
        }
      };
    }));
    
    res.json({
      success: true,
      data: populatedBookings
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
    
    const booking = await BookingModel.findByIdAndUpdate(id, { status });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    const populatedBooking = {
      ...booking,
      expertId: {
        _id: booking.expertId,
        name: 'Expert Name',
        category: 'Category',
        email: 'expert@example.com'
      }
    };
    
    if (req.io) {
      req.io.emit('bookingStatusUpdated', {
        bookingId: booking._id,
        status,
        expertId: booking.expertId
      });
    }
    
    res.json({
      success: true,
      data: populatedBooking
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
