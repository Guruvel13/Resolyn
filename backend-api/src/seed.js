require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (Optional, but good for clean state)
    // await User.deleteMany();
    // await Complaint.deleteMany();

    // Create Admin
    const adminExists = await User.findOne({ email: 'admin@resolyn.com' });
    if (!adminExists) {
      await User.create({
        name: 'System Administrator',
        email: 'admin@resolyn.com',
        password: 'admin123',
        role: 'admin',
        department: 'Command Center'
      });
      console.log('Admin user created');
    } else {
      console.log('Admin already exists');
    }

    // Create a dummy complaint if none exist
    const complaintCount = await Complaint.countDocuments();
    if (complaintCount === 0) {
      const admin = await User.findOne({ role: 'admin' });
      await Complaint.create({
        title: 'Initial Streetlight Failure',
        description: 'Streetlight out on 5th Avenue, multiple reports from residents.',
        department: 'Electricity',
        priority: 'High',
        status: 'Pending',
        user: admin._id,
        location: {
           type: 'Point',
           coordinates: [77.5946, 12.9716],
           address: '5th Avenue, Bangalore'
        }
      });
      console.log('Seed complaint created');
    }

    console.log('Seeding completed successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
