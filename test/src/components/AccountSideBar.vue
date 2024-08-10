<!-- AccountSidebar.vue -->
<template>
    <aside class="w-64 bg-gray-800 text-white p-6">
      <h2 class="text-xl font-semibold mb-6">Account Settings</h2>
      <nav class="space-y-4">
        <RouterLink to="/my-account" class="block py-2 px-4 rounded hover:bg-gray-700" :class="{ 'bg-gray-700': isActive('/my-account') }">
          My Account
        </RouterLink>
        <RouterLink to="/my-account/shipping-address" class="block py-2 px-4 rounded hover:bg-gray-700" :class="{ 'bg-gray-700': isActive('/my-account/shipping-address') }">
          Shipping Address
        </RouterLink>
        <RouterLink to="/my-account/billing-address" class="block py-2 px-4 rounded hover:bg-gray-700" :class="{ 'bg-gray-700': isActive('/my-account/billing-address') }">
          Billing Address
        </RouterLink>
        <RouterLink to="/my-account/my-orders" class="block py-2 px-4 rounded hover:bg-gray-700" :class="{ 'bg-gray-700': isActive('/my-account/my-orders') }">
          My orders
        </RouterLink>
        <button @click="logout" class="w-full text-left py-2 px-4 mt-4 bg-red-500 hover:bg-red-700 rounded">
          Logout
        </button>
      </nav>
    </aside>
  </template>
  
  <script>
  import { inject } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

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
    await axios.post('http://localhost:5174/api/logout', {}, { withCredentials: true });
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
  /* Additional styling for the sidebar can go here */
  </style>
  