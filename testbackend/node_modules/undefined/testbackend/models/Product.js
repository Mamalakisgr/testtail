const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name: String,
  p_price: String,
  p_category: String,
  p_tag: [String],
  p_brand: String,
  p_quantity: String,
  offer_price: String, // Added field for offer price
  p_images: String  // Stores the GridFS file ID as a reference to the image
});

module.exports = mongoose.model('Product', ProductSchema);
