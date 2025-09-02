const express = require('express');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const router = express.Router();

// simple admin stats
router.get('/stats', auth, admin, async (req, res) => {
  try {
    const menuCount = await MenuItem.countDocuments();
    const orderCount = await Order.countDocuments();
    res.json({ menuCount, orderCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
