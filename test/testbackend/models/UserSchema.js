const mongoose = require('mongoose');

// Define an Address Schema
const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});

// Update the User Schema to include shipping and billing addresses
const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  mobilePhone: String,
  phone: String,
  password: String,
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    image: String,
    quantity: Number
  }],
  wishlist: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
  shippingAddresses: [addressSchema],  // Array of shipping addresses
  billingAddresses: [addressSchema],   // Array of billing addresses
});

module.exports = mongoose.model('User', UserSchema);
