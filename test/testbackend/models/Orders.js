const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  billingFirstName:{ type: String, required: true },
  billingLastName: { type: String, required: true },
  billingEmail:{ type: String, required: true },
  billingAddress:{ type: String, required: true },
  billingCity:{ type: String, required: true },
  billingZip: { type: String, required: true },
  billingCountry: { type: String, required: true },
  originalPrice: { type: String, required: false},
  totalPrice: { type: String, required: false},
  paymentMethod: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  status: { type: String, required: false, default: 'pending' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
