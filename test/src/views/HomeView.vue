<template>
  <div>
    <h1>Welcome to the E-commerce Site</h1>
  </div>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
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
  </button>
  
  <Carousel2/>
  <ProductSlider/>



  <footer class="bg-white" aria-labelledby="footerHeading">
    <h2 id="footerHeading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <img class="h-10" src="../images/jacketcat.png" alt="Company name" />
          <p class="text-gray-500 text-base">
            Creating a slider for fun and educational purposes using Vue Js & Tailwind
          </p>
        </div>
        <div class="space-y-8 xl:col-span-1">
          <img class="h-10" src="../images/jacketcat.png" alt="Company name" />
          <p class="text-gray-500 text-base">
            Creating a slider for fun and educational purposes using Vue Js & Tailwind
          </p>
        </div>
        <div class="space-y-8 xl:col-span-1">
          <img class="h-10" src="../images/jacketcat.png" alt="Company name" />
          <p class="text-gray-500 text-base">
            Creating a slider for fun and educational purposes using Vue Js & Tailwind
          </p>
        </div>
        <div class="space-y-8 xl:col-span-1">
          <img class="h-10" src="../images/jacketcat.png" alt="Company name" />
          <p class="text-gray-500 text-base">
            Creating a slider for fun and educational purposes using Vue Js & Tailwind
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted } from 'vue';
import { Carousel } from 'flowbite';
import ProductSlider from '../components/ProductSlider.vue';
import Carousel2 from '../components/Carousel.vue';
onMounted(() => {
  const carouselElement = document.getElementById('default-carousel');

  const options = {
    defaultPosition: 0,
    interval: 3000,
    indicators: {
      activeClasses: 'bg-white dark:bg-gray-800',
      inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
    },
    onNext: () => {
      console.log('next slider item is shown');
    },
    onPrev: () => {
      console.log('previous slider item is shown');
    },
    onChange: () => {
      console.log('new slider item has been shown');
    },
  };

  if (carouselElement) {
    const carousel = new Carousel(carouselElement, options);

    const nextButton = carouselElement.querySelector('[data-carousel-next]');
    const prevButton = carouselElement.querySelector('[data-carousel-prev]');

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        console.log('next button clicked');
        carousel.next();
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        console.log('prev button clicked');
        carousel.prev();
      });
    }

    const indicators = carouselElement.querySelectorAll('[data-carousel-slide-to]');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        console.log(`indicator ${index} clicked`);
        carousel.slideTo(index);
      });
    });

    // Ensure that the initial active item is shown
    const activeItem = carouselElement.querySelector('[data-carousel-item="active"]');
    if (activeItem) {
      activeItem.classList.remove('hidden');
    }
  }
});
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
