const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expert',
    required: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  clientPhone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  bookingId: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

bookingSchema.index({ expertId: 1, date: 1, timeSlot: 1 }, { unique: true });
bookingSchema.index({ clientEmail: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
