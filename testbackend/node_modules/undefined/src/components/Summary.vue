<template>
  <div class="col-span-1 lg:col-span-4 order-first lg:order-last bg-white rounded-lg shadow-md p-6">
    <h4 class="text-3xl text-black mb-5">Cart Summary</h4>
    <div class="space-y-4">
      <Item v-for="(item, i) in items" :key="i" :item="item" />
    </div>
    <div class="mt-4 space-y-2">
      <div v-if="originalPrice > 0" class="flex items-center justify-between">
        <dt class="text-base font-normal text-gray-400 dark:text-black-400">Original Price</dt>
        <dd class="text-base font-medium text-gray-900 dark:text-black-100">${{ originalPrice }}</dd>
      </div>
      <div v-if="savings > 0" class="flex items-center justify-between">
        <dt class="text-base font-normal text-gray-400 dark:text-black-400">Savings</dt>
        <dd class="text-base font-medium text-green-600">-${{ savings }}</dd>
      </div>
      <div v-if="deliveryPickup > 0" class="flex items-center justify-between">
        <dt class="text-base font-normal text-gray-400 dark:text-black-400">Store Pickup</dt>
        <dd class="text-base font-medium text-gray-900 dark:text-black-100">${{ deliveryPickup }}</dd>
      </div>
      <div v-if="tax > 0" class="flex items-center justify-between">
        <dt class="text-base font-normal text-gray-400 dark:text-black-400">Tax</dt>
        <dd class="text-base font-medium text-gray-900 dark:text-black-100">${{ tax }}</dd>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700 mt-4">
      <dt class="text-base font-bold text-gray-400 dark:text-black">Total</dt>
      <dd class="text-base font-bold text-gray-400 dark:text-black">${{ totalPrice }}</dd>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "Summary",
  components: {
    Item
  },
  props: {
    items: Array
  },
  setup() {
    const cartItems = ref([]);

    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5174/api/cart-items', { withCredentials: true });
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

    return {
      items: cartItems,
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
