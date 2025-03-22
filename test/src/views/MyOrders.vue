<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-800">
    <!-- Include the AccountSidebar component -->
    <AccountSideBar class="w-64"></AccountSideBar>

    <!-- Main Content Area -->
    <div class="flex-1 p-6 bg-white dark:bg-gray-600 rounded-lg shadow-lg">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">My Orders</h1>

      <!-- Filter Section -->
      <div class="flex justify-between items-center mb-6">
        <label class="text-gray-700 dark:text-gray-300">Orders per page:</label>
        <select
          v-model="ordersPerPage"
          @change="updateOrdersPerPage"
          class="ml-2 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div v-if="loading" class="text-gray-700 dark:text-gray-300">Loading orders...</div>
      <div v-else-if="orders.length === 0" class="text-gray-700 dark:text-gray-300">No orders found.</div>
      <div v-else class="space-y-6">
        <div
          v-for="order in paginatedOrders"
          :key="order._id"
          class="border p-4 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex justify-between items-center cursor-pointer" @click="toggleOrderDetails(order._id)">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Order #{{ order._id }}</h2>
            <span :class="isOrderOpen(order._id) ? 'rotate-180' : ''" class="transition-transform ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-gray-500 dark:text-gray-300">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Date: {{ new Date(order.createdAt).toLocaleString() }}</p>
          <p class="text-gray-600 dark:text-gray-400">Total: {{ order.totalPrice }} €</p>
          <p class="text-gray-600 dark:text-gray-400">Status: {{ order.status }}</p> <!-- Displaying the delivery status -->

          <!-- Order details are shown/hidden based on the state -->
          <div v-if="isOrderOpen(order._id)" class="mt-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  border dark:border-gray-600">
                <tr>
                  <th scope="col" class="px-6 py-3">Product name</th>
                  <th scope="col" class="px-6 py-3">Quantity</th>
                  <th scope="col" class="px-6 py-3">Price</th>
                  <th scope="col" class="px-6 py-3">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in order.items"
                  :key="item._id"
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <RouterLink :to="`/product-details/${item.productId}`">{{ item.name }}</RouterLink>
                  </th>
                  <td class="px-6 py-4">x {{ item.quantity || 'N/A' }}</td> <!-- Assuming color is part of the item object -->
                  <td class="px-6 py-4">{{ item.price || 'N/A' }} €</td> <!-- Assuming category is part of the item object -->
                  <td class="px-6 py-4">{{ item.price * item.quantity }}  €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-center mt-6 bg-gray-800 p-2 max-w-full">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 rounded text-gray-800 dark:text-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="setPage(page)"
            :class="{
              'bg-blue-500 text-white': page === currentPage,
              'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200': page !== currentPage,
            }"
            class="px-4 py-2 mx-1 rounded"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 rounded text-gray-800 dark:text-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <Footer/>
  </template>
  
  <script setup>
  import { ref, computed, onMounted,watch } from "vue";
  import axios from "axios";
  import AccountSideBar from "@/components/AccountSideBar.vue";
  import { backendUrl } from '@/js/index'; // Adjust the path if necessary
  import Footer from '../components/Footer.vue';

  const orders = ref([]);
  const loading = ref(true);
  const openOrders = ref([]); // Track which orders are open
  const ordersPerPage = ref(10);
  const currentPage = ref(1);
  
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/my-orders`, {
        withCredentials: true,
      });
      orders.value = response.data;
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      loading.value = false;
    }
  };
  
  // Update orders per page and reset to the first page
  const updateOrdersPerPage = () => {
    currentPage.value = 1;
  };
  watch(ordersPerPage, () => {
  openOrders.value = []; // Reset openOrders when ordersPerPage changes
});
  // Pagination logic
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * ordersPerPage.value;
    const end = start + ordersPerPage.value;
    return orders.value.slice(start, end);
  });
  
  const totalPages = computed(() => Math.ceil(orders.value.length / ordersPerPage.value));
  
  const setPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
    }
  };
  
  const toggleOrderDetails = (orderId) => {
    if (openOrders.value.includes(orderId)) {
      openOrders.value = openOrders.value.filter((id) => id !== orderId);
    } else {
      openOrders.value.push(orderId);
    }
  };
  
  const isOrderOpen = (orderId) => openOrders.value.includes(orderId);
  
  onMounted(fetchOrders);
  </script>
  
  <style scoped>
  /* Add any additional styles you need here */
  </style>
  