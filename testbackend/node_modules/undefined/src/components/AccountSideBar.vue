<template>
  <aside class="w-64 bg-gray-800 text-gray-100 min-h-screen flex flex-col">
    <!-- User Profile Section -->
    <div class="p-6 border-b border-gray-700">
      <h2 class="text-xl font-bold text-white mb-2">Account Settings</h2>
      <p class="text-sm text-gray-400">Manage your account preferences</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-4">
      <div class="space-y-2">
        <RouterLink 
          to="/my-account" 
          class="flex items-center px-4 py-3 rounded-lg transition-colors duration-150"
          :class="{
            'bg-blue-600 text-white': isActive('/my-account'),
            'hover:bg-gray-700 text-gray-300': !isActive('/my-account')
          }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          My Account
        </RouterLink>

        <RouterLink 
          to="/my-account/shipping-address" 
          class="flex items-center px-4 py-3 rounded-lg transition-colors duration-150"
          :class="{
            'bg-blue-600 text-white': isActive('/my-account/shipping-address'),
            'hover:bg-gray-700 text-gray-300': !isActive('/my-account/shipping-address')
          }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Shipping Address
        </RouterLink>

        <RouterLink 
          to="/my-account/billing-address" 
          class="flex items-center px-4 py-3 rounded-lg transition-colors duration-150"
          :class="{
            'bg-blue-600 text-white': isActive('/my-account/billing-address'),
            'hover:bg-gray-700 text-gray-300': !isActive('/my-account/billing-address')
          }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Billing Address
        </RouterLink>

        <RouterLink 
          to="/my-account/my-orders" 
          class="flex items-center px-4 py-3 rounded-lg transition-colors duration-150"
          :class="{
            'bg-blue-600 text-white': isActive('/my-account/my-orders'),
            'hover:bg-gray-700 text-gray-300': !isActive('/my-account/my-orders')
          }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          My Orders
        </RouterLink>
      </div>
    </nav>

    <!-- Logout Button -->
    <div class="p-4 border-t border-gray-700">
      <button 
        @click="logout" 
        class="flex items-center w-full px-4 py-3 text-left rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-150"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>

<script>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

export default {
  name: 'AccountSidebar',
  setup() {
    const router = useRouter();
    const auth = inject('auth');

    const isActive = (path) => {
      return router.currentRoute.value.path === path;
    };

    const logout = async () => {
      try {
        await axios.post(`${backendUrl}/api/logout`)
        // Clear local auth state and redirect to home or login page
        localStorage.removeItem('userId');
        auth.loggedIn = false;
        auth.userId = null;
        router.push('/');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    return {
      isActive,
      logout,
    };
  },
};
</script>

<style scoped>
.router-link-active {
  font-weight: 500;
}
</style>