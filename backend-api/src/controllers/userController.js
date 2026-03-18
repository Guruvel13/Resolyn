const User = require('../models/User');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone,
      bio: user.bio,
      notifications: user.notifications,
      appearance: user.appearance,
      region: user.region
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.bio = req.body.bio || user.bio;
    user.notifications = req.body.notifications || user.notifications;
    user.appearance = req.body.appearance || user.appearance;
    user.region = req.body.region || user.region;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      department: updatedUser.department,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      notifications: updatedUser.notifications,
      appearance: updatedUser.appearance,
      region: updatedUser.region
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
