<template>

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
  <ProductSlider/>
<RegionOneJumbo/>
  <NewProductsSlider/>
  <Footer/>



</template>

<script setup>
import ProductSlider from '../components/ProductSlider.vue';
import Footer from '../components/Footer.vue';
import Carousel2 from '../components/CarouselMain.vue';
import NewProductsSlider from '../components/NewProductsSlider.vue';
import RegionOneJumbo from '../components/Region-One-Jumbo.vue';
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
