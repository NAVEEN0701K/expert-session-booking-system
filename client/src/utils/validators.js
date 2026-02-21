export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.length >= 10;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateBookingForm = (formData) => {
  const errors = {};

  if (!validateName(formData.clientName)) {
    errors.clientName = 'Name must be at least 2 characters long';
  }

  if (!validateEmail(formData.clientEmail)) {
    errors.clientEmail = 'Please enter a valid email address';
  }

  if (!validatePhone(formData.clientPhone)) {
    errors.clientPhone = 'Please enter a valid phone number';
  }

  if (!formData.date) {
    errors.date = 'Please select a date';
  }

  if (!formData.timeSlot) {
    errors.timeSlot = 'Please select a time slot';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
