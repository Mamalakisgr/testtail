<template>
    <div v-if="hasRecentProducts" class="bg-gray-800">
      <h1 class="text-2xl  p-4 font-bold text-center  bg-gray-800 text-white dark:bg-gray-1000 shadow-md">Products that you've seen recently :</h1>
      <div class="w-full bg-gray-700 rounded-lg flex flex-wrap justify-center">
        <div
          v-for="(product, index) in recentProducts"
          :key="index"
          class="p-2"
        >
          <div class="relative w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a class="w-full max-w-xs">
            <img class="p-4 rounded-t-lg" :src="`${product.image}`" alt="product image" />
          </a>
          <div class="px-5 pb-5">
            <RouterLink class="w-full max-w-xs h-xs max-h-xs" :to="`/product-details/${product._id}`">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.product_name }}</h5>
            </RouterLink>
            <div class="flex items-center justify-between">
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
        </div>
        <ProgressBar/>
      </div>
    </div>
  </template>
  
  <script >
  import { ref, onMounted } from 'vue';
  import ProgressBar from '../components/ProgressBar.vue';
  import { addToCart } from '@/js';
  import { fetchWishlist } from '@/js/wishlist.js'; // Adjust the import path accordingly
  import { backendUrl } from '@/js/index'; // Adjust the path if necessary

  export default {
   data()
   { return{
      backendUrl,
    }
  },
    components: {
      ProgressBar,
    },

    setup() {
      const recentProducts = ref([]);
      const hasRecentProducts = ref(false);
  
      // Fetch recently visited products from localStorage
      const fetchRecentProducts = () => {
  const recent = JSON.parse(localStorage.getItem('recentProducts')) || [];
  console.log('Retrieved recent products:', recent); // Log retrieved products
  if (recent.length) {
    recentProducts.value = recent;
    hasRecentProducts.value = true;
  }
};

  
      onMounted(() => {
        fetchWishlist();
        fetchRecentProducts();
      });
  
      return {
        recentProducts,
        addToCart,
        hasRecentProducts,
      };
    },
  };
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
}</style>