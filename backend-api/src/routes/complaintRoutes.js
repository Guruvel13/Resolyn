const express = require('express');
const { 
  createComplaint, 
  getComplaints, 
  getMyComplaints, 
  updateComplaintStatus,
  getStats
} = require('../controllers/complaintController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, admin, getComplaints)
  .post(protect, createComplaint);

router.get('/my', protect, getMyComplaints);
router.get('/stats', protect, admin, getStats);

router.route('/:id')
  .get(protect, getComplaintById)
  .put(protect, admin, updateComplaintStatus);

module.exports = router;
