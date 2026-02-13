// routes/order.js
const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  getTransactions,
} = require('../controllers/orderController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/').post(protect, createOrder).get(protect, getOrders);

router.route('/:id').get(protect, getOrder).put(protect, authorize('admin'), updateOrderStatus);

router.route('/transactions/all').get(protect, authorize('admin'), getTransactions);

module.exports = router;