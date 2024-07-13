// User Schema
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    product_name: String,
    p_price: String,
    p_category: String,
    p_tag: [String],
    p_brand: String,
    p_quantity: String,
    offer_price: String, // Added field for offer price
    image: String  // Path to the image file
});
  
  module.exports = mongoose.model('Product', ProductSchema);