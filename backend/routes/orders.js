const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const router = express.Router();

// place order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = new Order({
      user: req.user._id,
      items,
      total
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// user order history
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// admin - all orders
router.get('/', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.menuItem').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// admin update status
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
