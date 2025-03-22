<template>
  <Header/>
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

      <!-- Loading spinner -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="loader"></div>
      </div>

      <div v-else class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div class="space-y-6">
            <div v-if="cartItems.length === 0" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 text-center text-gray-900 dark:text-white">
              <p>Your cart is empty.</p>
            </div>
            <div
              v-else
              v-for="(item, index) in cartItems"
              :key="index"
              class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
            >
              <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href="#" class="shrink-0 md:order-1">
                  <img :src="`${backendUrl}/api/product-image/${item.image}`" alt="product image" class="h-20 w-20 dark:hidden" />
                  <img :src="`${backendUrl}/api/product-image/${item.image}`" alt="product image" class="hidden h-20 w-20 dark:block" />
                </a>

                <label for="counter-input" class="sr-only">Choose quantity:</label>
                <div class="flex items-center justify-between md:order-3 md:justify-end">
                  <div class="flex items-center">
                    <button
                      type="button"
                      @click="decrementQuantity(index)"
                      class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      v-model="item.quantity"
                      class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                      readonly
                    />
                    <button
                      type="button"
                      @click="incrementQuantity(item.productId)"
                      class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                  <div class="text-end md:order-4 md:w-32">
                    <div v-if="item.offer_price">
                      <span class="line-through text-gray-400">{{ (item.quantity * item.price).toFixed(2) }} €</span>
                      <br>
                      <span class="text-red-500">{{ (item.quantity * item.offer_price).toFixed(2) }} €</span>
                    </div>
                    <div v-else>
                      <span class="text-white">{{ (item.quantity * item.price).toFixed(2) }} €</span>
                    </div>
                 
                  </div>
                </div>

                <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                  <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{{ item.name }}</a>

                  <div class="flex items-center gap-4">
                    <button
                      type="button"
                      @click="toggleWishlist(item.productId)"

                      class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    >
                    <svg
              v-if="wishlist.includes(item.productId)"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8.5a5.5 5.5 0 0110.42-2.2A5.5 5.5 0 0121 8.5c0 3.58-3.28 6.44-8.28 11.05L12 20.35l-1.28-1.16C6.28 14.94 3 12.08 3 8.5z"
              />
            </svg>
                      Add to Favorites
                    </button>

                    <button
                      type="button"
                      @click="removeItem(item.productId)"
                      class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      <svg
                        class="me-1.5 h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

            <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">${{ originalPrice }}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                  <dd class="text-base font-medium text-green-600">-{{ savings.toFixed(2) }}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Cost</dt>
                  <dd class="text-base font-small text-gray-900 dark:text-white">Calculated in Checkout</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">${{ tax.toFixed(2) }}</dd>
                </dl>
              </div>

              <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">${{ totalPrice.toFixed(2) }}</dd>
              </dl>
            </div>

            <RouterLink to="/checkout"
              class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" data-cy="checkout_page_button"
            > Proceed to Checkout
            </RouterLink>

            <div class="flex items-center justify-center gap-2">
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
              <a
                href="/"
                title=""
                class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Continue Shopping
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </a>
            </div>
          </div>

          <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <form class="space-y-4">
              <div>
                <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                <input
                  type="text"
                  id="voucher"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder=""
                  required
                />
              </div>
              <button
                type="submit"
                class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Apply Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import eventBus from '../js/eventBus';
import Footer from '../components/Footer.vue';
const cartItems = ref([]);
const loading = ref(true); // Loading state
import { backendUrl } from '@/js/index'; // Adjust the path if necessary
import { wishlist, toggleWishlist } from '@/js/wishlist.js';  // Adjust the import path accordingly
import AlsoBought from '@/components/AlsoBought.vue';

const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/cart-items`, { withCredentials: true });
    cartItems.value = response.data.items;
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  } finally {
    loading.value = false;  // Set loading to false once data is fetched
  }
};

const updateCartItemQuantity = async (productId, quantity) => {
  try {
    await axios.put(
      `${backendUrl}/api/cart-items/${productId}`,
      { quantity },
      { withCredentials: true }
    );
    console.log(`Updated product ${productId} with quantity ${quantity}`);
  } catch (error) {
    console.error(`Failed to update quantity for productId: ${productId}`, error);
  }
};

const incrementQuantity = (productId) => {
  const index = cartItems.value.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    cartItems.value[index].quantity++;
    updateCartItemQuantity(productId, cartItems.value[index].quantity);
  } else {
    console.error(`Invalid productId: ${productId}`, cartItems.value);
  }
};

// Decrement quantity
const decrementQuantity = async (index) => {
  const item = cartItems.value[index];
  if (item && item.quantity > 1) {
    item.quantity--;
    try {
      await axios.put(`${backendUrl}/api/cart-items/${item.productId}`, { quantity: item.quantity }, { withCredentials: true });
    } catch (error) {
      console.error('Failed to update quantity', error);
      item.quantity++; // Revert in case of error
    }
  }
};



const removeItem = async (productId) => {
  if (!productId) {
    console.error('Product ID is undefined');
    return;
  }

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

watch(() => (newVal) => {
  if (newVal) {
    fetchCartItems();
  }
});
// Calculate the original price of all items in the cart
const originalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 0);
  }, 0);
});

// Calculate the total savings based on the difference between the price and offer price
const savings = computed(() => {
  return cartItems.value.reduce((total, item) => {
    // Only calculate savings if there is an offer price
    const itemSavings = (item.price || 0) - (item.offer_price || item.price); // No savings if no offer price
    return total + itemSavings * (item.quantity || 0); // Multiply by quantity
  }, 0);
});

// Set delivery or pickup charges based on user selection (can be a prop)
const deliveryOption = 'courier'; // This could be dynamically set
const deliveryPickup = computed(() => {
  return deliveryOption === 'courier' ? 0 : 99; // 99 for delivery, 0 for pickup
});

// Calculate tax (assuming it's a percentage of the original price)
const taxRate = 0.08; // Example: 8% tax
const tax = computed(() => {
  return originalPrice.value * taxRate;
});

// Calculate the total price (including savings, delivery charges, and tax)
const totalPrice = computed(() => {
  const totalBeforeTaxAndDelivery = cartItems.value.reduce((total, item) => {
    // Use offer price if available, otherwise fallback to regular price
    const priceToUse = item.offer_price || item.price;
    return total + (priceToUse || 0) * (item.quantity || 0);
  }, 0);

  return totalBeforeTaxAndDelivery + deliveryPickup.value;
});

onMounted(()=>{
  fetchCartItems();
})
</script>

<style scoped>
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
