<template>
  <aside class="sticky top-[10rem] max-h-[calc(100vh-12rem)] bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mx-4 mt-12">
    <!-- Header Section with Gradient -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-800/20 dark:to-purple-800/20"></div>
      <div class="relative p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Company Information
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Learn more about our company
        </p>
      </div>
    </div>

    <!-- Navigation Menu with Enhanced Hover Effects -->
    <nav class="p-4 space-y-1">
      <router-link
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden"
        :class="{
          'bg-blue-50 dark:bg-gray-700': isActive(item.path),
          'hover:bg-gray-50 dark:hover:bg-gray-700/50': !isActive(item.path)
        }"
      >
        <!-- Hover Effect Background -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:to-purple-500/10 transition-opacity duration-300"></div>
        
        <!-- Icon -->
        <span 
          class="relative flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" 
          v-html="item.icon"
        ></span>
        
        <!-- Text -->
        <span 
          class="relative text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-medium"
        >
          {{ item.name }}
        </span>

        <!-- Active Indicator -->
        <div 
          v-if="isActive(item.path)"
          class="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
        ></div>
      </router-link>
    </nav>

    <!-- Footer Section with Enhanced Design -->
    <div class="mt-auto">
      <div class="p-4 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">
          © 2024 Fashionistas A.E.
        </p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const menuItems = [
  {
    name: 'Company Profile',
    path: '/company-profile',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>`
  },
  {
    name: 'History',
    path: '/company-history',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`
  },
  {
    name: 'Privacy Policy',
    path: '/privacy',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>`
  },
  {
    name: 'Licensing',
    path: '/licensing',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>`
  },
  {
    name: 'Terms & Conditions',
    path: '/terms-conditions',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
          </svg>`
  }
];

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-50 dark:bg-gray-700;
}

.router-link-active span {
  @apply text-blue-600 dark:text-blue-400;
}

/* Smooth scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-500;
}
</style>