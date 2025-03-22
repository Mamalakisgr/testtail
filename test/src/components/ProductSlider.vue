<template>
  <div>
    <h1 class="text-2xl mb-5 p-4 font-bold text-center bg-gray-800 text-white dark:bg-gray-1000">Products with Offers!</h1>
    
    <!-- Loading spinner -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loader"></div>
    </div>

    <!-- Carousel -->
    <Carousel 
      v-else
      :items-to-show="itemsToShow" 
      :wrap-around="true" 
      class="w-full bg-gray-200 rounded-lg"
    >
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
          <RouterLink :to="`/product-details/${product._id}`" class="block">
            <img class="p-4 rounded-t-lg w-full h-48 object-cover" :src="`${product.image}`" alt="product image" />
          </RouterLink>
          <div class="px-5 pb-5">
            <RouterLink :to="`/product-details/${product._id}`" class="block text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {{ product.product_name }}
            </RouterLink>
            <div class="flex items-center justify-between mt-2">
              <span v-if="product.offer_price" class="text-lg font-bold text-red-600">
                  {{ product.offer_price }} €
                </span>
                <span v-if="product.offer_price" class="text-base text-gray-500 line-through ml-2">
                  {{ product.p_price }} €
                </span>
                <span v-else class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ product.p_price }} €
                </span>
              <button @click="addToCart(product._id, 1)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import axios from 'axios';
import { addToCart } from '@/js';
import 'vue3-carousel/dist/carousel.css';
import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';  // Adjust the import path accordingly
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

const products = ref([]);
const loading = ref(true);  // Loading state
const itemsToShow = ref(4);  // Default value for larger screens

const updateItemsToShow = () => {
  const width = window.innerWidth;
  if (width >= 1024) {
    itemsToShow.value = 4;
  } else if (width >= 768) {
    itemsToShow.value = 3;
  } else if (width >= 640) {
    itemsToShow.value = 2;
  } else {
    itemsToShow.value = 1;
  }
};

const fetchProductsOffer = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/products`, {
      params: { tag: 'offers' }
    });
    products.value = response.data.map(product => {
      // Construct the image URL or provide a fallback
      product.image = product.p_images ? `${backendUrl}/api/product-image/${product.p_images}` : '/path/to/fallback-image.jpg';
      return product;
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;  // Set loading to false once data is fetched
  }
};

onMounted(() => {
  fetchProductsOffer();
  fetchWishlist();
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsToShow);
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
