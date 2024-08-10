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
  <div class="alert" role="alert">
    <span class="alert-text-left">Free delivery on all orders over $50!</span>
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
    <img src="../images/jacketcat.png" alt="Jacket Cat Image" class="w-full h-full object-cover rounded-lg">
  </div>
</section>
<SeenRecently/>
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
.alert {
  @apply bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 relative flex justify-between items-center;
}

.alert-text-left {
  @apply block;
}

.alert-text-right {
  @apply block sm:inline ml-auto;
}
</style>
