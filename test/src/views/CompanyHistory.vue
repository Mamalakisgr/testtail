<template>
  <!-- Fade Transition for About Section -->
  <transition name="fade">
    <section
      v-if="showContent"
      class="about bg-cover bg-center bg-gray-100 dark:bg-gray-900 min-h-[50vh] flex items-center justify-center px-4"
      style="background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg');"
    >
      <div class="max-w-3xl text-center">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Our Company's History
        </h1>
        <p class="text-lg text-gray-300">
          Welcome to our company's history page. Explore the journey of our brand, our milestones, and the mission that drives us forward.
        </p>
      </div>
    </section>
  </transition>

  <!-- Timeline Section with Fade Transition -->
  <transition name="fade">
    <section
      v-if="showContent"
      class="bg-gray-100 dark:bg-gray-900 min-h-[50vh] flex items-center justify-center px-4 py-12  border-t border-white"
    >
      <div class="flex flex-col lg:flex-row w-full max-w-6xl gap-12">
        <!-- Timeline Section -->
        <ol class="relative border-l border-gray-200 dark:border-gray-700 pl-8 lg:w-2/3">
          <header class="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            Our Timeline
          </header>

          <!-- Timeline Item 1 -->
          <li class="mb-10 ml-6">
            <span
              class="absolute flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full -left-5 ring-8 ring-white dark:ring-gray-900"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12h6m-6 4h6M9 8h6m4-4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
            </span>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Started Development
              <span class="bg-blue-100 text-blue-800 text-sm font-medium ml-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Latest
              </span>
            </h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on January 13th, 2024
            </time>
            <p class="text-base font-normal text-gray-600 dark:text-gray-400">
              Our first version was launched with 20+ pages, including a dashboard, charts, kanban board, and calendar.
            </p>
          </li>

          <!-- Timeline Item 2 -->
          <li class="mb-10 ml-6">
            <span
              class="absolute flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full -left-5 ring-8 ring-white dark:ring-gray-900"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12h6m-6 4h6M9 8h6m4-4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
            </span>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Vue 3.js Integration</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 7th, 2021
            </time>
            <p class="text-base font-normal text-gray-600 dark:text-gray-400">
              We transitioned to Vue 3.js for faster, smoother, and modern front-end development.
            </p>
          </li>

          <!-- Timeline Item 3 -->
          <li class="ml-6">
            <span
              class="absolute flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full -left-5 ring-8 ring-white dark:ring-gray-900"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12h6m-6 4h6M9 8h6m4-4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
            </span>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Cypress Automation</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Released on December 2nd, 2021
            </time>
            <p class="text-base font-normal text-gray-600 dark:text-gray-400">
              We implemented Cypress for E2E automation, ensuring a high level of quality in all our releases.
            </p>
          </li>
        </ol>

        <!-- Store Image Section -->
        <div class="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src="/public/store.webp"
            alt="Store Image"
            class="rounded-lg shadow-lg w-full h-auto max-w-xl"
          />
        </div>
      </div>
    </section>
  </transition>

  <!-- Enhanced Store Section -->
  <a
    class="flex flex-col items-center   shadow md:flex-row dark:bg-gray-900  hover:shadow-lg transition-shadow duration-300  border-t border-white"
  >
    <!-- Image Section -->
    <img
      class="object-cover w-full h-48 rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg"
      src="/public/store.webp"
      alt="Store Image"
    />

    <!-- Text Section -->
    <div class="flex flex-col justify-center p-6 md:w-1/2">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy Technology Acquisitions 2021
      </h5>
      <p class="mb-4 text-lg font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </div>
  </a>

  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Footer from '@/components/Footer.vue';

// Initially hide content to trigger fade-in when component mounts
const showContent = ref(false);

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 500); // Delay to simulate fade-in effect
});
</script>

<style scoped>
/* Custom fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
