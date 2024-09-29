<template>
    <div v-if="hotProducts.length > 0" class="mb-6 p-4 rounded-lg bg-gray-800">
      <h2 class="text-xl text-center font-semibold text-gray-200 mb-4">Hot Products</h2>
      <div class="flex gap-3 overflow-x-auto scrollbar-hide">
        <div
          v-for="product in hotProducts"
          :key="product._id"
          class="w-36 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600"
        >
          <img
            :src="product.image"
            alt="Hot Product"
            class="w-full h-28 object-cover rounded-t-md"
          />
          <div class="p-2 text-center">
            <RouterLink
              :to="`/product-details/${product._id}`"
              class="text-xs font-medium tracking-tight text-gray-900 dark:text-white hover:underline"
            >
              {{ product.product_name }}
            </RouterLink>
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
              {{ product.p_price }} €
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      hotProducts: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  