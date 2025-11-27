const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendOrderConfirmation } = require('../utils/email');

// Create new order (checkout)
router.post('/', protect, async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total and prepare order items
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      if (!item.product) {
        return res.status(400).json({ message: 'Invalid product in cart' });
      }

      const itemTotal = item.product.price * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      shippingAddress,
      orderDate: new Date()
    });

    // Clear the cart
    cart.items = [];
    await cart.save();

    // Populate order for email
    await order.populate('user');

    // Send confirmation email
    await sendOrderConfirmation(order, req.user.email, req.user.name);

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ orderDate: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Make sure order belongs to user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
