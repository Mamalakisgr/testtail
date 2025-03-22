<template >

  <!-- <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div class="flex-shrink-0">
      <img class="h-12 w-12" src="/public/logo.png" alt="ChitChat Logo" />
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-gray-500">You have a new message!</p>
    </div>
  </div>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Extracting classes using @apply
  </button> -->
  <div class="alert bg-gradient-to-r from-gray-900 to-gray-700 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 text-white px-4 py-3 relative flex justify-between items-center" role="alert">
    <span class="alert-text-left">Free delivery on all orders over $180!</span>
    <span class="alert-text-right">Phone Orders: 2221022990</span>
    <span class="alert-text-right">Up to 18 installments</span>
  </div>
  
  <Carousel2/>
  <ProductSlider class="shadow dark:bg-gray-900 dark:border-gray-700"/>
<RegionOneJumbo class="bg-black"/>
  <NewProductsSlider class="shadow dark:bg-gray-900 dark:border-gray-700"/>
<section class="container  max-w-full  shadow dark:bg-gray-900 dark:border-gray-700 flex flex-col lg:flex-row items-center justify-between px-10 py-6 border-t border-white">
  <div class="text-white mb-6 lg:mb-0 lg:mr-10">
    <h2 class="text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-5xl">Region-2</h2>
    <p class="text-lg font-normal text-gray-300 lg:text-xl mt-4 lg:mt-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
  <div class="flex-shrink-0 w-full lg:w-1/2 h-64 lg:h-80 rounded-lg">
    <img src="/public/store-inside-2.jpg" alt="Jacket Cat Image" class="w-full h-full object-cover rounded-lg">
  </div>
</section>
<SeenRecently/>

<div class="flex flex-col lg:flex-row mx-auto max-w-full">
  <div class="flex flex-col items-center bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-5  flex-grow">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
    <p class="text-center text-lg font-medium text-gray-700 dark:text-gray-400">Free Shipping Over 180 Euro</p>
  </div>

  <div class="flex flex-col items-center bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-5 flex-grow">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
    <p class="text-center text-lg font-medium text-gray-700 dark:text-gray-400">Up to 15 years guarantee</p>
  </div>

  <div class="flex flex-col items-center bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-5 flex-grow">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
    </svg>
    <p class="text-center text-lg font-medium text-gray-700 dark:text-gray-400">50 Stores all over Greece</p>
  </div>

  <div class="flex flex-col items-center bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-5 flex-grow">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
    <p class="text-center text-lg font-medium text-gray-700 dark:text-gray-400">Return Products within 14 days</p>
  </div>
</div>
  <Footer/>



</template>

<script setup>
import ProductSlider from '../components/ProductSlider.vue';
import Footer from '../components/Footer.vue';
import Carousel2 from '../components/CarouselMain.vue';
import NewProductsSlider from '../components/NewProductsSlider.vue';
import RegionOneJumbo from '../components/Region-One-Jumbo.vue';
import SeenRecently from '@/components/SeenRecently.vue';
</script>

<style scoped>
h1 {
  color: #42b983;
}


.alert-text-left {
  @apply block;
}

.alert-text-right {
  @apply block sm:inline ml-auto;
}
</style>
