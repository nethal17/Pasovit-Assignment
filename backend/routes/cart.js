const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Function for get or create cart
const getOrCreateCart = async (userId, sessionId) => {
  let cart;
  
  if (userId) {
    cart = await Cart.findOne({ user: userId }).populate('items.product');
  } else if (sessionId) {
    cart = await Cart.findOne({ sessionId }).populate('items.product');
  }

  if (!cart) {
    cart = new Cart({
      user: userId || undefined,
      sessionId: sessionId || undefined,
      items: []
    });
  }

  return cart;
};

// Get user's cart (supports both authenticated and guest users)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];

    const cart = await getOrCreateCart(userId, sessionId);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate size
    if (!product.sizes.includes(size)) {
      return res.status(400).json({ message: 'Invalid size for this product' });
    }

    // Get or create cart
    const cart = await getOrCreateCart(userId, sessionId);

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product._id.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        size,
        quantity
      });
    }

    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item quantity
router.put('/:itemId', optionalAuth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await getOrCreateCart(userId, sessionId);

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/:itemId', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];

    const cart = await getOrCreateCart(userId, sessionId);

    // Use pull to remove the item by its _id
    cart.items.pull(req.params.itemId);
    
    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Clear entire cart
router.delete('/', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?._id;
    const sessionId = req.headers['x-session-id'];

    const cart = await getOrCreateCart(userId, sessionId);
    cart.items = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
