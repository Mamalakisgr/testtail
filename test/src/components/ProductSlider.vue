<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Product Slider</h1>
      <Carousel :items-to-show="3" :wrap-around="true" class="w-full">
        <Slide v-for="(product, index) in products" :key="index" class="p-2">
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="p-8 rounded-t-lg" :src="product.image" alt="product image" />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.title }}</h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="{'text-yellow-300': i <= product.rating, 'text-gray-200 dark:text-gray-600': i > product.rating}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{{ product.rating.toFixed(1) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ product.price }}</span>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Carousel, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';
  
  const products = ref([
    {
      image: new URL('@/images/leatherjacketcat.png', import.meta.url).href,
      title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
      rating: 5,
      price: '$599',
    },
    {
      image: new URL('@/images/jacketcat.png', import.meta.url).href,
      title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
      rating: 4,
      price: '$499',
    },
    // Add more products as needed
  ]);
  </script>
  
  <style scoped>
  .carousel {
    width: 100%;
    max-width: 100%;
    margin: auto;
  }
  </style>
  