<template>
  <div id="default-carousel" class="relative w-full">
    <div class="relative h-56 overflow-hidden md:h-96">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute w-full h-full duration-700 ease-in-out"
        :class="{ hidden: activeSlide !== index }"
      >
        <img
          :src="slide.src"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          :alt="slide.alt"
        />
      </div>
    </div>
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
      <button
        v-for="(slide, index) in slides"
        :key="`indicator-${index}`"
        type="button"
        class="w-3 h-3 rounded-full"
        :aria-current="activeSlide === index"
        @click="goToSlide(index)"
      ></button>
    </div>
    <button
      type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="prevSlide"
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
        <svg
          class="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="nextSlide"
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
        <svg
          class="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 9 5 5 1 1"
          />
        </svg>
      </span>
    </button>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const activeSlide = ref(0);

const slides = [
  { src: new URL('/public/store-inside-2.jpg', import.meta.url), alt: 'Jacket Category' },
  { src: new URL('/public/store-inside.jpg', import.meta.url), alt: 'Leather Jacket Category' },
  { src: new URL('/public/store-out-carousel.jpg', import.meta.url), alt: 'Jacket Category' },
];

const goToSlide = (index) => {
  activeSlide.value = index;
};

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length;
};

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % slides.length;
};
</script>
