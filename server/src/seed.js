require('dotenv').config();
const connectDB = require('./config/db');
const seedExperts = require('./utils/seedData');

const seed = async () => {
  try {
    await connectDB();
    await seedExperts();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
