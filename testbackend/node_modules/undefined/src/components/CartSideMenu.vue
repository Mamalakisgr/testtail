<template>
  <transition name="slide">
    <div
      v-if="isCartOpen"
      class="fixed inset-0 flex z-50"
      aria-modal="true"
      role="dialog"
    >
      <!-- Backdrop -->
      <div
        class="bg-gray-900 bg-opacity-50 w-full"
        @click="toggleCart"
        aria-label="Close Cart"
      ></div>

      <!-- Sidebar Cart -->
      <aside
        class="w-full sm:w-80 md:w-96 bg-white dark:bg-gray-800 text-gray-900 dark:text-white z-50 fixed right-0 h-full shadow-lg overflow-y-auto"
      >
        <div class="p-6">
          <!-- Header with title and close button -->
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Your Cart</h2>
            <button
              @click="toggleCart"
              aria-label="Close Cart"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Loading Spinner -->
          <div v-if="loading" class="flex justify-center items-center h-64">
            <div role="status">
              <svg
                class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908c0 27.614-22.386 50-50 50-27.614 0-50-22.386-50-50 0-27.614 22.386-50 50-50 27.614 0 50 22.386 50 50z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409c2.523 7.617 2.107 16.125-.999 23.173-3.108 7.048-8.503 12.942-15.373 15.96-7.571 3.35-16.17 3.515-23.737.441-7.57-3.073-13.676-8.671-16.922-16.016-3.245-7.345-3.492-16.008-.718-23.196 2.775-7.188 8.58-12.774 16.117-15.174 7.536-2.399 16.151-2.357 23.678.107 7.527 2.464 13.543 7.838 16.273 15.059z"
                  fill="#3B82F6"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <!-- Cart Items -->
          <div v-else>
            <div v-if="cartItems.length">
              <ul class="space-y-4">
                <li
                  v-for="(item, index) in cartItems"
                  :key="index"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center space-x-3">
                    <img
                      :src="item.image"
                      alt="Product Image"
                      class="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <RouterLink
                        :to="`/product-details/${item.productId}`"
                        class="font-medium hover:underline"
                      >
                        {{ item.name }}
                      </RouterLink>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ item.quantity }} x
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div v-if="item.offer_price">
                      <p
                        class="text-sm text-gray-500 dark:text-gray-400 line-through"
                      >
                        {{ formatPrice(item.price * item.quantity) }}
                      </p>
                      <p class="font-semibold text-red-500">
                        {{ formatPrice(item.offer_price * item.quantity) }}
                      </p>
                    </div>
                    <div v-else>
                      <p class="font-semibold">
                        {{ formatPrice(item.price * item.quantity) }}
                      </p>
                    </div>
                  </div>
                  <button
                    @click="removeFromCart(item.productId)"
                    class="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                    aria-label="Remove item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 8.586l3.536-3.536a1 1 0 111.414 1.414L11.414 10l3.536 3.536a1 1 0 01-1.414 1.414L10 11.414l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 10 5.05 6.464a1 1 0 011.414-1.414L10 8.586z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>

              <!-- Navigation Buttons -->
              <div class="mt-6">
                <RouterLink
                  to="/cart"
                  class="w-full block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow"
                  data-cy="cart_page_button"
                >
                  View Cart
                </RouterLink>
                <RouterLink
                  to="/checkout"
                  class="w-full block mt-3 text-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow"
                  data-cy="checkout_page_button"
                >
                  Checkout
                </RouterLink>
              </div>
            </div>

            <!-- Empty Cart Message -->
            <div v-else class="text-center py-16">
              <p class="text-lg text-gray-600 dark:text-gray-400">
                Your cart is empty.
              </p>
              <RouterLink
                to="/"
                class="mt-4 inline-block text-blue-600 hover:underline"
              >
                Continue Shopping
              </RouterLink>
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
import { backendUrl } from '@/js/index';

const props = defineProps({
  isCartOpen: Boolean,
  toggleCart: Function,
});

const cartItems = ref([]);
const loading = ref(true);

// Utility function to format prices as EUR currency.
const formatPrice = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

const fetchCartItems = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${backendUrl}/api/cart-items`, {
      withCredentials: true,
    });
    cartItems.value = response.data.items.map((item) => {
      // Construct the image URL or provide a fallback
      item.image = `${backendUrl}/api/product-image/${item.image}`;
      return item;
    });
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  } finally {
    loading.value = false;
  }
};

const removeFromCart = async (productId) => {
  if (!productId) return;
  try {
    const response = await axios.delete(
      `${backendUrl}/api/cart-items/${productId}`,
      { withCredentials: true }
    );
    await fetchCartItems();
    eventBus.emit('product-removed', response.data.totalItems);
  } catch (error) {
    console.error('Failed to remove item from cart', error);
  }
};

watch(
  () => props.isCartOpen,
  (newVal) => {
    if (newVal) {
      fetchCartItems();
    }
  }
);
</script>

<style scoped>
/* Slide transition for the sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
