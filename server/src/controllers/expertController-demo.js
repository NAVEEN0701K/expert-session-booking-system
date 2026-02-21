const ExpertModel = require('../models/Expert-demo');

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
    
    const experts = await ExpertModel.find(query);
    
    const total = await ExpertModel.countDocuments(query);
    const categories = await ExpertModel.distinct('category');
    
    const paginatedExperts = experts.slice(skip, skip + limit);
    
    res.json({
      success: true,
      data: {
        experts: paginatedExperts,
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
    const expert = await ExpertModel.findById(req.params.id);
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        error: 'Expert not found'
      });
    }
    
    res.json({
      success: true,
      data: expert
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
