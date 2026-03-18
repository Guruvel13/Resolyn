const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  department: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Incomplete Report'
  },
  description: {
    type: String,
    default: ''
  },
  position: {
    type: [Number], // [lat, lng]
    default: null
  },
  progress: {
    type: String,
    default: '0%'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Draft', draftSchema);
