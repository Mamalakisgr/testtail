<template>
  <div>
    <h1 class="text-2xl mb-5 mt-5 font-bold text-center">New Products!</h1>
    <Carousel :items-to-show="4" :wrap-around="true" class="w-80 bg-gray-200 rounded-lg">
      <Slide v-for="(product, index) in products" :key="index" class="p-2">
        <div class="relative w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <button
            @click="toggleWishlist(product._id)"
            class="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            <svg
              v-if="wishlist.includes(product._id)"
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
          </button>
          <a class="w-full max-w-xs">
            <img class="p-4 rounded-t-lg" :src="`http://localhost:5174/${product.image}`" alt="product image" />
          </a>
          <div class="px-5 pb-5">
            <a class="w-full max-w-xs h-xs max-h-xs" :href="`/product-details/${product._id}`">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.product_name }}</h5>
            </a>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ product.p_price }} €</span>
              <button @click="addToCart(product._id, 1)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
            </div>
          </div>
        </div>
      </Slide>
      <ProgressBar/>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import { addToCart } from '@/js';
import ProgressBar from '../components/ProgressBar.vue';
import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';  // Adjust the import path accordingly

const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/products', {
      params: { tag: 'new' }
    });
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

onMounted(() => {
  fetchProducts();
  fetchWishlist();
});
</script>

<style scoped>
.carousel {
  width: 100%;
  max-width: 75%;
  margin: auto;
}
img {
  height: 300px;
  width: 400px;
}
</style>
