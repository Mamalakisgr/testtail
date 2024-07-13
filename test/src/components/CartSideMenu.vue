<template>
  <transition name="slide">
    <div v-if="isCartOpen" class="fixed inset-0 flex z-10" style='z-index: 99;'>
      <div class="bg-gray-900 bg-opacity-50 w-full" @click="toggleCart"></div>
      <aside class="w-64 bg-gray-800 text-white z-20 fixed right-0 h-full">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4">Cart Items</h2>
          <div v-if="cartItems.length">
            <ul>
              <li v-for="(item, index) in cartItems" :key="index" class="mb-2 flex items-center">
                <img :src="`http://localhost:5174/${item.image}`" alt="Product Image" class="w-10 h-10 object-cover mr-2">
                <div class="flex-1">
                  <span>{{ item.name }}</span>
                  <span class="block text-sm text-gray-400">{{ item.quantity }} x</span>
                </div>
                <span>{{ (item.quantity * item.price).toFixed(2) }}</span>
                <button @click="removeFromCart(item.id)" class="ml-2 text-red-500 hover:text-red-700">X</button>
              </li>
            </ul>
            <RouterLink to="/cart" class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block">
              Checkout
            </RouterLink>
          </div>
          <div v-else>
            <p>Your cart is empty.</p>
          </div>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  isCartOpen: Boolean,
  toggleCart: Function,

});

const cartItems = ref([]);

const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/cart-items', { withCredentials: true });
    cartItems.value = response.data.items;
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  }
};
const removeFromCart = async (itemId) => {
  try {
    await axios.delete(`http://localhost:5174/api/cart-items/${itemId}`, { withCredentials: true });
    // Fetch updated cart items
    fetchCartItems();
  } catch (error) {
    console.error('Failed to remove item from cart', error);
  }
};

watch(() => props.isCartOpen, (newVal) => {
  if (newVal) {
    fetchCartItems();
  }
});
</script>

<style scoped>
/* Transition for the slide effect */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
