// src/addToCart.js
import axios from 'axios';
import eventBus from './eventBus';
import { ref, watch } from 'vue';
const cartItems = ref([]);
export default {
};
export const addToCart = async (productId) => {
  try {
    const response = await axios.post('http://localhost:5174/api/add-to-cart', { productId, quantity: 1 }, { withCredentials: true });
    eventBus.cartCount.value = response.data.totalItems;
    eventBus.emit('product-added', response.data.totalItems);
  } catch (error) {
    console.error('Failed to add to cart', error);
  }
};

export const removeFromCart = async (productId) => {
  if (!productId) {
    console.error('Product ID is undefined');
    return;
  }

  try {
    const response = await axios.delete(`http://localhost:5174/api/cart-items/${productId}`, { withCredentials: true });
    // Fetch updated cart items
    fetchCartItems();
    // Emit event to update cart count
    eventBus.emit('product-removed', response.data.totalItems);
  } catch (error) {
    console.error('Failed to remove item from cart', error);
  }
};
export const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/cart-items', { withCredentials: true });
    cartItems.value = response.data.items;
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  }
};

watch(() => (newVal) => {
  if (newVal) {
    fetchCartItems();
   
  }
});