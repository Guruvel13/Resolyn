const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: String
  },
  ticketId: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedOfficial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

complaintSchema.pre('save', async function(next) {
  if (!this.ticketId) {
    const deptMap = {
      'Water & Supply': 'WTR',
      'Electricity': 'ELC',
      'Electrical': 'ELC',
      'Sanitation': 'SAN',
      'Roads & Traffic': 'RDS',
      'Roads': 'RDS',
      'Public Health': 'HLT',
      'Parks & Recreation': 'PRK'
    };
    const deptCode = deptMap[this.department] || 'RES';
    
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    
    const randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomSuffix = '';
    for (let i = 0; i < 4; i++) {
      randomSuffix += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    this.ticketId = `${deptCode}-${dateStr}-${randomSuffix}`;
  }
  next();
});

complaintSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Complaint', complaintSchema);
