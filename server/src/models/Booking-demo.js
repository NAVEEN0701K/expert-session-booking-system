const { generateBookingId } = require('../utils/slotHelper');

let mockBookings = [];

class BookingModel {
  static async create(bookingData) {
    const booking = {
      _id: Date.now().toString(),
      ...bookingData,
      bookingId: generateBookingId(),
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    mockBookings.push(booking);
    return booking;
  }
  
  static async find(query = {}) {
    let filteredBookings = mockBookings;
    
    if (query.clientEmail) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.clientEmail === query.clientEmail
      );
    }
    
    return filteredBookings;
  }
  
  static async findByIdAndUpdate(id, updateData) {
    const bookingIndex = mockBookings.findIndex(booking => booking._id === id);
    if (bookingIndex !== -1) {
      mockBookings[bookingIndex] = {
        ...mockBookings[bookingIndex],
        ...updateData,
        updatedAt: new Date()
      };
      return mockBookings[bookingIndex];
    }
    return null;
  }
  
  static async findOne(query) {
    return mockBookings.find(booking => 
      booking.expertId === query.expertId && 
      booking.date === query.date && 
      booking.timeSlot === query.timeSlot
    );
  }
  
  static async populate(field) {
    return this;
  }
}

module.exports = BookingModel;
