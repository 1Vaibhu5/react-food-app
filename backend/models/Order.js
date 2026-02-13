// models/Order.js - Order Model
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  deliveryDetails: {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
  },
  paymentInfo: {
    subTotal: Number,
    deliveryCharge: Number,
    tax: Number,
    grandTotal: Number,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'on-the-way', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paidAt: Date,
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for search and sort
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1 });

module.exports = mongoose.model('Order', OrderSchema);