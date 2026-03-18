const Complaint = require('../models/Complaint');

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = async (req, res) => {
  const { title, description, department, priority, location } = req.body;

  try {
    const complaint = await Complaint.create({
      title,
      description,
      department,
      priority,
      location,
      user: req.user._id
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private/Admin
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({}).populate('user', 'name email');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user complaints
// @route   GET /api/complaints/my
// @access  Private
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private/Admin
const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
      complaint.status = req.body.status || complaint.status;
      complaint.assignedOfficial = req.body.assignedOfficial || complaint.assignedOfficial;
      
      const updatedComplaint = await complaint.save();
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ message: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('user', 'name email');
    if (complaint) {
      res.json(complaint);
    } else {
      res.status(404).json({ message: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get complaint stats
// @route   GET /api/complaints/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments({});
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    
    // Simulate some recent activity for the dashboard
    const recentActivity = await Complaint.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name');

    res.json({
      total,
      pending,
      inProgress,
      resolved,
      recentActivity: recentActivity.map(a => ({
        type: 'incident',
        title: a.title,
        time: 'Recently',
        status: a.priority.toLowerCase() === 'critical' ? 'critical' : 'update'
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getMyComplaints,
  updateComplaintStatus,
  getStats,
  getComplaintById
};
