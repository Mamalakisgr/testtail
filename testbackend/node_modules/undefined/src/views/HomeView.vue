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
    <span class="alert-text-left">Free delivery on all orders over $50!</span>
    <span class="alert-text-right">Phone Orders: 2221022990</span>
    <span class="alert-text-right">Up to 18 installments</span>
  </div>
  
  <Carousel2 class=""/>
  <ProductSlider class="shadow dark:bg-gray-900 dark:border-gray-700 "/>
<RegionOneJumbo class="bg-black animate-fade-down"/>
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

<div class="flex flex-col lg:flex-row mx-auto max-w-full">
    <div
      v-for="(info, index) in infoCards"
      :key="info.id"
      ref="el => elementsToAnimate.value[index] = el"
      class="flex flex-col items-center bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-5 flex-grow opacity-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      <p class="text-center text-lg font-medium text-gray-700 dark:text-gray-400">
        {{ info.text }}
      </p>
    </div>
  </div>

  <Footer />

<!-- <div id="newsletter-banner" tabindex="-1" class=" flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
    <div class="flex items-center flex-shrink-0 w-full mx-auto sm:w-auto">
        <form class="flex flex-col items-center w-full md:flex-row">
            <label for="email" class="flex-shrink-0 mb-2 me-auto text-sm font-medium text-gray-500 md:mb-0 md:me-4 dark:text-gray-400 md:m-0">Sign up for our newsletter</label>
            <input type="email" id="email" placeholder="Enter your email" class="bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:me-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</button>
        </form>
    </div>
    <div class="flex items-center absolute top-2.5 end-2.5 md:relative md:top-auto md:end-auto">
        
    </div>


</div> -->



</template>

<script setup>
import ProductSlider from '../components/ProductSlider.vue';
import Footer from '../components/Footer.vue';
import Carousel2 from '../components/CarouselMain.vue';
import NewProductsSlider from '../components/NewProductsSlider.vue';
import RegionOneJumbo from '../components/Region-One-Jumbo.vue';
import SeenRecently from '@/components/SeenRecently.vue';
import { ref, onMounted } from 'vue';

const elementsToAnimate = ref([]);

const addScrollObserver = (element) => {
  if (element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-down');
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);
  }
};
const infoCards = [
  { id: 1, text: 'Free Shipping Over 180 Euro' },
  { id: 2, text: 'Up to 15 years guarantee' },
  { id: 3, text: '50 Stores all over Greece' },
  { id: 4, text: 'Return Products within 14 days' },
];
onMounted(() => {
  elementsToAnimate.value.forEach((element) => {
    addScrollObserver(element);
  });
});
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
