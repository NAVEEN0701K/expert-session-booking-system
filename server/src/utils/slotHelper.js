const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    slots.push(time);
  }
  return slots;
};

const generateBookingId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BK${timestamp}${random}`.toUpperCase();
};

const isSlotAvailable = (expert, date, timeSlot) => {
  const dateStr = new Date(date).toDateString();
  const daySlots = expert.availableSlots.find(slot => 
    new Date(slot.date).toDateString() === dateStr
  );
  
  if (!daySlots) return false;
  
  const slot = daySlots.timeSlots.find(s => s.time === timeSlot);
  return slot && !slot.isBooked;
};

module.exports = {
  generateTimeSlots,
  generateBookingId,
  isSlotAvailable
};
