const mongoose = require('mongoose');
const Expert = require('../models/Expert');
const { generateTimeSlots } = require('./slotHelper');

const seedExperts = async () => {
  try {
    await Expert.deleteMany({});
    
    const experts = [
      {
        name: 'Dr. Sarah Johnson',
        category: 'Healthcare',
        experience: 15,
        rating: 4.8,
        bio: 'Board-certified physician specializing in internal medicine with extensive experience in preventive care and chronic disease management.',
        email: 'sarah.johnson@expert.com',
        availableSlots: []
      },
      {
        name: 'Michael Chen',
        category: 'Technology',
        experience: 12,
        rating: 4.9,
        bio: 'Senior software architect with expertise in cloud computing, microservices, and scalable system design.',
        email: 'michael.chen@expert.com',
        availableSlots: []
      },
      {
        name: 'Emily Rodriguez',
        category: 'Finance',
        experience: 10,
        rating: 4.7,
        bio: 'Certified Financial Planner specializing in investment strategies, retirement planning, and wealth management.',
        email: 'emily.rodriguez@expert.com',
        availableSlots: []
      },
      {
        name: 'Prof. James Wilson',
        category: 'Education',
        experience: 20,
        rating: 4.9,
        bio: 'PhD in Educational Psychology with expertise in learning strategies, curriculum development, and academic coaching.',
        email: 'james.wilson@expert.com',
        availableSlots: []
      },
      {
        name: 'Lisa Thompson',
        category: 'Business',
        experience: 18,
        rating: 4.6,
        bio: 'Executive coach and business strategist helping professionals and organizations achieve peak performance.',
        email: 'lisa.thompson@expert.com',
        availableSlots: []
      },
      {
        name: 'Dr. Robert Kim',
        category: 'Healthcare',
        experience: 8,
        rating: 4.5,
        bio: 'Mental health professional specializing in anxiety, depression, and stress management techniques.',
        email: 'robert.kim@expert.com',
        availableSlots: []
      },
      {
        name: 'Amanda Foster',
        category: 'Technology',
        experience: 6,
        rating: 4.4,
        bio: 'Full-stack developer with expertise in React, Node.js, and modern web development practices.',
        email: 'amanda.foster@expert.com',
        availableSlots: []
      },
      {
        name: 'David Martinez',
        category: 'Finance',
        experience: 14,
        rating: 4.8,
        bio: 'Tax specialist and financial advisor helping individuals and businesses optimize their financial strategies.',
        email: 'david.martinez@expert.com',
        availableSlots: []
      }
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const expert of experts) {
      const availableSlots = [];
      
      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(today);
        currentDate.setDate(currentDate.getDate() + d);
        
        availableSlots.push({
          date: currentDate,
          timeSlots: generateTimeSlots().map(time => ({
            time,
            isBooked: Math.random() > 0.8
          }))
        });
      }
      
      expert.availableSlots = availableSlots;
    }

    await Expert.insertMany(experts);
    console.log('Sample experts seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding experts:', error);
  }
};

module.exports = seedExperts;
