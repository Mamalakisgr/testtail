<template>
  <section class="text-gray-700 body-font overflow-hidden bg-white">
    <div class="container px-5 py-24 mx-auto">
      <Breadcrumb />
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img :alt="product.product_name" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" :src="`http://localhost:5174/${product.image}`" />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">{{ product.p_brand }}</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ product.product_name }}</h1>
          <div class="flex mb-4">
            <!-- Add rating or other details if necessary -->
          </div>
          <p class="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.{{ product.description }}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div class="flex ml-6 items-center">
              <span class="mr-3">Size</span>
              <div class="relative">
                <select v-model="selectedSize" class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                  <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
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
            <span class="title-font font-medium text-2xl text-gray-900">{{ product.p_price }} €</span>
            <button @click="addToCart(product._id, 1)" class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add to Cart</button>
            <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { addToCart } from '@/js';
import Footer from '../components/Footer.vue';
import Breadcrumb from '../components/Breadcrump.vue';

const route = useRoute();
const productId = route.params.productId;

const product = ref({});
const sizes = ref(['SM', 'M', 'L', 'XL']);
const selectedSize = ref(sizes.value[0]);

const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:5174/api/products`, {
      params: {
        productId: productId
      }
    });
    product.value = response.data[0]; // Assuming response is an array with a single product
  } catch (error) {
    console.error('Failed to fetch product', error);
  }
};

onMounted(fetchProduct);
</script>

<style scoped>
/* Add any additional styling you need here */
</style>
