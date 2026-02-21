const Expert = require('../models/Expert');
const { generateTimeSlots } = require('../utils/slotHelper');

const getExperts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const skip = (page - 1) * limit;
    
    const experts = await Expert.find(query)
      .select('-availableSlots')
      .sort({ rating: -1, name: 1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Expert.countDocuments(query);
    
    const categories = await Expert.distinct('category');
    
    res.json({
      success: true,
      data: {
        experts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        categories
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        error: 'Expert not found'
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 7);
    
    if (expert.availableSlots.length === 0) {
      const availableSlots = [];
      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(today);
        currentDate.setDate(currentDate.getDate() + d);
        
        availableSlots.push({
          date: currentDate,
          timeSlots: generateTimeSlots().map(time => ({
            time,
            isBooked: false
          }))
        });
      }
      
      expert.availableSlots = availableSlots;
      await expert.save();
    }
    
    const filteredSlots = expert.availableSlots.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate >= today && slotDate <= futureDate;
    });
    
    res.json({
      success: true,
      data: {
        ...expert.toObject(),
        availableSlots: filteredSlots
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getExperts,
  getExpertById
};
