const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    require: [true, 'product price must be provided'],
  },
  image: {
    type: String,
    require: [true, 'product image must be provided'],
  },
  description: {
    type: String,
    min: 10,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  shipping: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  company: {
    type: String,
    emun: {
      values: ['marcos', 'liddy', 'ikea', 'caressa'],
      message: '{VALUE} is not supported',
    },
  },
  category: {
    type: String,
    emun: {
      values: ['kitchen', 'office', 'living room', 'bedroom', 'dining', 'kids'],
      message: '{VALUE} is not supported',
    },
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);
