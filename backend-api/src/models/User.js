const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  department: {
    type: String,
    default: 'General'
  },
  phone: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
    emergency: { type: Boolean, default: true },
    newComplaints: { type: Boolean, default: true },
    performance: { type: Boolean, default: false },
    systemUpdates: { type: Boolean, default: true }
  },
  appearance: {
    theme: { type: String, enum: ['Light', 'Dark', 'System'], default: 'Light' },
    compactMode: { type: Boolean, default: false }
  },
  region: {
    language: { type: String, default: 'English (US)' },
    timezone: { type: String, default: '(GMT+05:30) India Standard Time' }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
