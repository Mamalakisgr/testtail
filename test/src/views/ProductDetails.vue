<template>
  <section class="text-gray-700 body-font overflow-hidden bg-gray-700 text-white">
    <div class="container px-5 py-24 mx-auto">
      <Breadcrumb :category="product.p_category" :product="product.product_name" />
      <div class="lg:w-4/5 mx-auto flex flex-wrap rounded dark:bg-gray-900 p-2">
        <!-- Display loading spinner while the image is loading -->
        <div class="relative lg:w-1/2 w-full">
          <div v-if="loadingImage" class="absolute inset-0 flex justify-center items-center">
            <svg
              class="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.75v14.5M19.25 12H4.75"
              />
            </svg>
          </div>
          <img
            :alt="product.product_name"
            class="lg:w-full w-full object-cover object-center rounded border border-gray-200 h-full max-w-sm max-h-96"
            :src="product.image"
            @load="loadingImage = false"
          />
        </div>
        
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font tracking-widest">{{ product.p_brand }}</h2>
          <h1 class="text-3xl title-font font-medium mb-1">{{ product.product_name }}</h1>
          <div class="flex mb-4">
            <!-- Add rating or other details if necessary -->
          </div>
          <p class="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{{ product.description }}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div class="flex ml-6 items-center">
              <span class="mr-3">Size</span>
              <div class="relative">
                <select v-model="selectedSize" class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10 text-gray-600">
                  <option v-for="size in sizes" :key="size" :value="size" class="text-gray-600">{{ size }}</option>
                </select>
                <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="flex">
            <div>
                <span v-if="product.offer_price" class="text-lg font-bold text-red-600">
                  {{ product.offer_price }} €
                </span>
                <span v-if="product.offer_price" class="text-base text-gray-500 line-through ml-2">
                  {{ product.p_price }} €
                </span>
                <span v-else class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ product.p_price }} €
                </span>
              </div>
            <button @click="addToCart(product._id, 1)" class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" data-cy="add_cart">Add to Cart</button>
            <button
            @click="toggleWishlist(product._id)"
            class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
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
          </div>
        </div>
      </div>
    </div>
  </section>
  <SeenRecently class="bg-gray-300 my-0"></SeenRecently>
  <Footer />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { addToCart } from '@/js';
import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';
import Footer from '../components/Footer.vue';
import Breadcrumb from '../components/Breadcrump.vue';
import SeenRecently from '@/components/SeenRecently.vue';
import { backendUrl } from '@/js/index';

// Declare productId as a prop
const props = defineProps({
  productId: {
    type: String,
    required: false,
  },
});
const route = useRoute();
const product = ref({});
const sizes = ref(['SM', 'M', 'L', 'XL']);
const selectedSize = ref(sizes.value[0]);
const loadingImage = ref(true); // State to track image loading

const fetchProduct = async (productId) => {
  loadingImage.value = true; // Set to true while fetching the product
  try {
    const response = await axios.get(`${backendUrl}/api/products`, {
      params: {
        productId: productId,
      },
    });

    if (response.data && response.data.length > 0) {
      const fetchedProduct = response.data[0];

      // Check if p_images is defined
      if (fetchedProduct.p_images) {
        fetchedProduct.image = `${backendUrl}/api/product-image/${fetchedProduct.p_images}`;
      } else {
        console.error('p_images field is undefined for the product');
      }

      product.value = fetchedProduct;

      storeRecentProduct(product.value);
    } else {
      console.error('Product data is empty');
    }
  } catch (error) {
    console.error('Failed to fetch product', error);
  }
};

const storeRecentProduct = (product) => {
  // Validate the product data
  if (!product._id || !product.product_name || !product.image) {
    console.error('Invalid product data', product);
    return;
  }

  // Get the current list of recent products from localStorage
  let recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];

  // Remove the product if it's already in the list (to avoid duplicates)
  recentProducts = recentProducts.filter((p) => p._id !== product._id);

  // Add the product to the beginning of the list
  recentProducts.unshift({
    _id: product._id,
    product_name: product.product_name,
    image: product.image,
    p_price: product.p_price,
    offer_price: product.offer_price
  });

  // If the list exceeds 5 items, remove the last one (FILO principle)
  if (recentProducts.length > 5) {
    recentProducts.pop();
  }

  // Save the updated list back to localStorage
  localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
};

// Fetch the product initially when the component is mounted
onMounted(() => {
  fetchWishlist();
  fetchProduct(props.productId || route.params.productId);});

// Watch for changes in the route parameters to refetch the product
watch(
  () => route.params.productId,
  (newProductId) => {
    fetchProduct(newProductId);
  }
);
</script>

<style scoped>
.w-64 {
  width: 16rem;
}

.h-96 {
  height: 24rem;
}

.object-cover {
  object-fit: cover;
}</style>
