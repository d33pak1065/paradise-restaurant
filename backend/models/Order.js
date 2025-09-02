const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    qty: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: 'Placed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
