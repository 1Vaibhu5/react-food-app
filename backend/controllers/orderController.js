// controllers/orderController.js
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const sendEmail = require('../utils/sendEmail');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryDetails, paymentInfo } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      deliveryDetails,
      paymentInfo,
      paidAt: Date.now(),
    });

    // Create transaction
    await Transaction.create({
      userId: req.user.id,
      orderId: order._id,
      amount: paymentInfo.grandTotal,
      paymentMethod: 'COD',
      transactionStatus: 'completed',
    });

    // Send email
    try {
      const itemsList = items.map((item) => `${item.name} x ${item.qty} = ₹${item.price * item.qty}`).join('\n');

      await sendEmail({
        email: req.user.email,
        subject: 'Order Confirmation - FoodBite',
        message: `Hello ${req.user.name},\n\nYour order has been placed successfully!\n\nOrder ID: ${order._id}\nTotal: ₹${paymentInfo.grandTotal}\n\nItems:\n${itemsList}\n\nDelivery Address:\n${deliveryDetails.address}, ${deliveryDetails.city} - ${deliveryDetails.pincode}\n\nThank you!\nFoodBite Team`,
      });
    } catch (err) {
      console.log('Email error:', err.message);
    }

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get orders with search & sort
exports.getOrders = async (req, res) => {
  try {
    let query = { user: req.user.id };

    // Search
    if (req.query.search) {
      query.$or = [
        { 'deliveryDetails.name': { $regex: req.query.search, $options: 'i' } },
        { 'deliveryDetails.city': { $regex: req.query.search, $options: 'i' } },
        { orderStatus: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Filter by status
    if (req.query.status) {
      query.orderStatus = req.query.status;
    }

    // Sort
    let sortOptions = {};
    if (req.query.sort) {
      sortOptions[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
    } else {
      sortOptions.createdAt = -1;
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const orders = await Order.find(query).sort(sortOptions).limit(limit).skip(startIndex);

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get transactions (Admin)
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ transactionDate: -1 }).populate('userId', 'name email').populate('orderId');

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};