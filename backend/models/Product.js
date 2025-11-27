const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image URL is required']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Men', 'Women', 'Kids']
  },
  sizes: [{
    type: String,
    enum: ['S', 'M', 'L', 'XL']
  }],
  stock: {
    type: Number,
    default: 100,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
