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


<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>


<div id="newsletter-banner" tabindex="-1" class=" flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
    <div class="flex items-center flex-shrink-0 w-full mx-auto sm:w-auto">
        <form class="flex flex-col items-center w-full md:flex-row">
            <label for="email" class="flex-shrink-0 mb-2 me-auto text-sm font-medium text-gray-500 md:mb-0 md:me-4 dark:text-gray-400 md:m-0">Sign up for our newsletter</label>
            <input type="email" id="email" placeholder="Enter your email" class="bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:me-4 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Subscribe</button>
        </form>
    </div>
    <div class="flex items-center absolute top-2.5 end-2.5 md:relative md:top-auto md:end-auto">
        <button data-dismiss-target="#newsletter-banner" type="button" class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close banner</span>
        </button>
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
