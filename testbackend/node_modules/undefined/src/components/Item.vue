<template>
  <div class="grid grid-cols-1 md:grid-cols-8 gap-4 mb-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
    <div class="md:col-span-2 flex justify-center items-center">
      <a  class="shrink-0">
        <img :src="`${backendUrl}/api/product-image/${item.image}`" alt="product image" class="h-20 w-20 object-cover rounded-lg" />
      </a>
    </div>
    <div class="md:col-span-3 space-y-2">
      <h5 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ item.name }}</h5>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ item.description }}</p>
    </div>
    <div class="md:col-span-1 flex flex-col items-end justify-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">Unit Price</p>
      <p class="text-base font-bold text-gray-900 dark:text-gray-100">${{ item.offer_price || item.price }}</p>
    </div>
    <div class="md:col-span-1 flex flex-col items-end justify-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
      <p class="text-base font-bold text-gray-900 dark:text-gray-100">{{ item.quantity }}</p>
    </div>
    <div class="md:col-span-1 flex flex-col items-end justify-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
      <p class="text-base font-bold text-gray-900 dark:text-gray-100">${{  item.offer_price || item.price * item.quantity }}</p>
    </div>
  </div>
</template>

<script >
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

export default {
  name: "Item",
  data() {
    return {
      backendUrl, // Assign backendUrl here
    };
  },
  props: {
    item: Object
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
