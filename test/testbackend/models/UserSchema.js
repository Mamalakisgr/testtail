// User Schema
const mongoose = require('mongoose');


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
}]
});
  
  module.exports = mongoose.model('User', UserSchema);