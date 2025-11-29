const mongoose = require('mongoose');
const { MONGODB_URI } = require('./environment');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;