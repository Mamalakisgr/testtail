<template>
    <div>
      <h1 class="text-2xl  mb-5 mt-5 font-bold mb-4 text-center">New Products!</h1>
      <Carousel :items-to-show="3" :wrap-around="true" class="w-full">
        <Slide v-for="(product, index) in products" :key="index" class="p-2">
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="p-8 rounded-t-lg" :src="`http://localhost:5174/${product.image}`" alt="product image" />
            </a>
            <div class="px-5 pb-5">
              <a :href="`/product-details/${product._id}`">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.product_name }}</h5>
              </a>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ product.p_price }} €</span>
                <button @click="addToCart(product._id, quantity= 1)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  import axios from 'axios';
  import 'vue3-carousel/dist/carousel.css';
  import { addToCart } from '@/js';
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
  });
  </script>
  
  <style scoped>
  .carousel {
    width: 100%;
    max-width: 100%;
    margin: auto;
  }
  img{
    height: 300px;
    width: 400px;
  }
  </style>
  