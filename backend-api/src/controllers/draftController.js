const Draft = require('../models/Draft');

// @desc    Get user drafts
// @route   GET /api/drafts
// @access  Private
const getDrafts = async (req, res) => {
  try {
    const drafts = await Draft.find({ user: req.user._id });
    res.json(drafts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a draft
// @route   POST /api/drafts
// @access  Private
const createDraft = async (req, res) => {
  try {
    const { department, title, description, position, progress } = req.body;
    const draft = new Draft({
      user: req.user._id,
      department,
      title,
      description,
      position,
      progress
    });

    const savedDraft = await draft.save();
    res.status(201).json(savedDraft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a draft
// @route   DELETE /api/drafts/:id
// @access  Private
const deleteDraft = async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (draft && draft.user.toString() === req.user._id.toString()) {
      await draft.deleteOne();
      res.json({ message: 'Draft removed' });
    } else {
      res.status(404).json({ message: 'Draft not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDrafts,
  createDraft,
  deleteDraft
};
