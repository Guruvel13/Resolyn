const express = require('express');
const { 
  getDrafts, 
  createDraft, 
  deleteDraft 
} = require('../controllers/draftController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getDrafts)
  .post(protect, createDraft);

router.route('/:id')
  .delete(protect, deleteDraft);

module.exports = router;
