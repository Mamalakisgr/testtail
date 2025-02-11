<template>
  <transition name="slide">
    <div v-if="isCartOpen" class="fixed inset-0 flex z-10" style='z-index: 99;'>
      <div class="bg-gray-900 bg-opacity-50 w-full" @click="toggleCart"></div>
      <aside class="w-64 bg-gray-800 text-white z-20 fixed right-0 h-full">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4">Cart Items</h2>
          
          <!-- Loading spinner -->
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="loader"></div>
          </div>

     <!-- Cart Items -->
     <div v-else>
            <div v-if="cartItems.length">
              <ul>
                <li v-for="(item, index) in cartItems" :key="index" class="mb-2 flex items-center">
                  <img :src="item.image" alt="Product Image" class="w-10 h-10 object-cover mr-2">
                  <div class="flex-1">
                    <RouterLink :to="`/product-details/${item.productId}`">
                      <span>{{ item.name }}</span>
                    </RouterLink>
                    <span class="block text-sm text-gray-400">{{ item.quantity }} x</span>
                  </div>
                  
                  <!-- Display original price first, then offer price if available -->
                  <div class="text-right">
                    <div v-if="item.offer_price">
                      <span class="line-through text-gray-400">{{ (item.quantity * item.price).toFixed(2) }} €</span>
                      <br>
                      <span class="text-red-500">{{ (item.quantity * item.offer_price).toFixed(2) }} €</span>
                    </div>
                    <div v-else>
                      <span>{{ (item.quantity * item.price).toFixed(2) }} €</span>
                    </div>
                  </div>

                  <button @click="removeFromCart(item.productId)" class="ml-2 text-red-500 hover:text-red-700">X</button>
                </li>
              </ul>
              
              <RouterLink to="/cart" class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block">
                Cart Page
              </RouterLink>
              <RouterLink to="/checkout" class="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block">
                Checkout
              </RouterLink>
            </div>
            <div v-else>
              <p>Your cart is empty.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import eventBus from '../js/eventBus';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

const props = defineProps({
  isCartOpen: Boolean,
  toggleCart: Function,
});

const cartItems = ref([]);
const loading = ref(true); // Loading state

const fetchCartItems = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${backendUrl}/api/cart-items`, { withCredentials: true });
    cartItems.value = response.data.items.map(item => {
      // Construct the image URL or provide a fallback
      item.image =  `${backendUrl}/api/product-image/${item.image}`;
      return item;
    });
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  } finally {
    loading.value = false; // Set loading to false once data is fetched
  }
};

const removeFromCart = async (productId) => {
  if (!productId) {
    console.error('Product ID is undefined');
    return;
  }

  console.log('Removing product with ID:', productId); // Debug log

  try {
    const response = await axios.delete(`${backendUrl}/api/cart-items/${productId}`, { withCredentials: true });
    // Fetch updated cart items
    fetchCartItems();
    // Emit event to update cart count
    eventBus.emit('product-removed', response.data.totalItems);
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

/* Loading spinner styles */
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
