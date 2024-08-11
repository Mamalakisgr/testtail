<template>
  <div class="container mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 sm:p-6">
      <p class="text-xl font-semibold text-gray-400 dark:text-black">Order summary</p>
      <div class="space-y-4">
        <div class="space-y-2">
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-gray-400">Original price</dt>
            <dd class="text-base font-medium text-gray-400 dark:text-black">${{ originalPrice }}</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-black-400">Savings</dt>
            <dd class="text-base font-medium text-green-600">-{{ savings }}</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-black-400">Store Pickup</dt>
            <dd class="text-base font-medium text-gray-400 dark:text-black">${{ deliveryPickup }}</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-black-400">Tax</dt>
            <dd class="text-base font-medium text-gray-400 dark:text-black">${{ tax }}</dd>
          </dl>
        </div>
        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt class="text-base font-bold text-gray-400 dark:text-black">Total</dt>
          <dd class="text-base font-bold text-gray-400 dark:text-black">${{ totalPrice }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

export default {
  name: "OrderSynopsis",
 
  setup(props, { emit }) {
    const cartItems = ref([]);

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/cart-items`, { withCredentials: true });
        cartItems.value = response.data.items;
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };

    onMounted(() => {
      fetchCartItems();
    });

    const originalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const savings = computed(() => {
      return 0; // Example savings value
    });

    const deliveryPickup = computed(() => {
      return 99; // Example store pickup value
    });

    const tax = computed(() => {
      return 24; // Example tax value
    });

    const totalPrice = computed(() => {
      return originalPrice.value - savings.value + deliveryPickup.value + tax.value;
    });

    // Emit the total price when it changes
    watch(totalPrice, (newTotalPrice) => {
      emit('update:totalPrice', newTotalPrice);
    });

    return {
      originalPrice,
      savings,
      deliveryPickup,
      tax,
      totalPrice
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
