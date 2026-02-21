const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Healthcare', 'Finance', 'Education', 'Business', 'Other']
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  availableSlots: [{
    date: {
      type: Date,
      required: true
    },
    timeSlots: [{
      time: {
        type: String,
        required: true
      },
      isBooked: {
        type: Boolean,
        default: false
      }
    }]
  }]
}, {
  timestamps: true
});

expertSchema.index({ category: 1, rating: -1 });
expertSchema.index({ name: 'text' });

module.exports = mongoose.model('Expert', expertSchema);
