require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const connectDB = require('./config/db');

const generateTicketId = (department) => {
  const deptMap = {
    'Water': 'WTR',
    'Electricity': 'ELC',
    'Roads': 'RDS',
    'Sanitation': 'SAN',
    'Public Health': 'HLT',
    'Parks & Recreation': 'PRK'
  };
  const deptCode = deptMap[department] || 'RES';
  const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomSuffix = '';
  for (let i = 0; i < 4; i++) {
    randomSuffix += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return `${deptCode}-${dateStr}-${randomSuffix}`;
};

const seedData = async () => {
  try {
    await connectDB();

    // 1. Create/Find Admin User
    let admin = await User.findOne({ email: 'admin@resolyn.com' });
    if (!admin) {
      admin = await User.create({
        name: 'System Administrator',
        email: 'admin@resolyn.com',
        password: 'admin123',
        role: 'admin',
        department: 'Command Center'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // 2. Clear Existing Complaints for a Fresh Seed
    await Complaint.deleteMany();
    console.log('🗑️ Existing complaints cleared');

    // 3. Read generated complaints.json
    const complaintsPath = path.join(__dirname, '..', 'complaints.json');
    if (fs.existsSync(complaintsPath)) {
      const complaintsData = JSON.parse(fs.readFileSync(complaintsPath, 'utf8'));
      
      // 4. Transform and Insert
      const seededComplaints = complaintsData.map(c => ({
        ...c,
        ticketId: generateTicketId(c.department), // Pre-generate IDs to avoid duplicates/nulls
        user: admin._id // Link to admin user for testing
      }));

      await Complaint.insertMany(seededComplaints);
      console.log(`🚀 Successfully seeded ${seededComplaints.length} complaints!`);
    } else {
      console.warn('⚠️ complaints.json not found. Run node generateData.js first.');
    }

    console.log('✨ Seeding process completed successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
