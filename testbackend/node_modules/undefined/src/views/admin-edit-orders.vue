<template>
  <div class="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Order List Dashboard</h1>

    <!-- Filter/Search Bar -->
    <div class="mb-4 flex justify-between items-center">
      <div class="relative">
        <input v-model="searchQuery" type="text" placeholder="Search Orders..."
          class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" />
      </div>
      <div class="flex items-center">
        <div class="mr-4">
          <label for="filter-status" class="text-gray-800 dark:text-gray-200 mr-2">Status:</label>
          <select id="filter-status" v-model="selectedStatus" @change="filterOrders"
            class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label for="sort-order" class="text-gray-800 dark:text-gray-200 mr-2">Sort by Date:</label>
          <select id="sort-order" v-model="sortOrder" @change="sortOrders"
            class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Order List Table -->
    <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-white dark:text-gray-200 uppercase tracking-wider">
              Order ID
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Customer Name
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Date
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Status
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in paginatedOrders" :key="order._id" @dblclick="selectOrder(order)" class="cursor-pointer">
            <td class="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-800 text-sm text-white">
              {{ order._id }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200">
  {{ order.customerId ? `${order.customerId.firstName} ${order.customerId.lastName}` : 'Guest' }}
</td>

            <td class="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-800 text-sm text-white">
              {{ new Date(order.createdAt).toLocaleDateString() }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-800 text-sm text-white">
              <span :class="statusClass(order.status)"
                class="relative inline-block px-3 py-1 font-semibold leading-tight rounded-full">
                <span aria-hidden class="absolute inset-0 opacity-50 rounded-full"></span>
                <span class="relative">{{ (order.status) }}</span>
              </span>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white dark:bg-gray-800 text-sm text-white">
              ${{ order.totalPrice }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-4">
      <div>
        <label for="itemsPerPage" class="text-gray-800 dark:text-gray-200 mr-2">Items per page:</label>
        <select id="itemsPerPage" v-model="itemsPerPage" @change="updatePagination"
          class="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div>
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md disabled:opacity-50">Previous</button>
        <span class="mx-2 text-gray-800 dark:text-gray-200">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md disabled:opacity-50">Next</button>
      </div>
    </div>

    <!-- Order Edit Modal -->
    <transition name="modal">
      <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-50 ">
        <div class="bg-black bg-opacity-50 absolute inset-0 " @click="closeModal"></div>
        <div class="bg-white p-6 rounded-lg shadow-lg z-10 max-w-3xl w-full dark:bg-gray-800 ">
          <h2 class="text-xl font-semibold mb-4 ">Edit Order: {{ selectedOrder._id }}</h2>
          <form @submit.prevent="saveOrder">
            <div class="grid grid-cols-2 gap-4 ">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">First Name:</label>
                <input type="text" v-model="selectedOrder.firstName"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-500 dark:border-gray-600 dark:text-gray-200 p-1" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Last Name:</label>
                <input type="text" v-model="selectedOrder.lastName"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-500 dark:border-gray-600 dark:text-gray-200 p-1" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email:</label>
                <input type="text" v-model="selectedOrder.email"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-500 dark:border-gray-600 dark:text-gray-200 p-1" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Payment Method:</label>
                <input type="text" v-model="selectedOrder.paymentMethod"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-500 dark:border-gray-600 dark:text-gray-200 p-1" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Delivery Method:</label>
                <input type="text" v-model="selectedOrder.deliveryMethod"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-500 dark:border-gray-600 dark:text-gray-200 p-1" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Total Price:</label>
                <input type="text" v-model="selectedOrder.totalPrice"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-500 dark:border-gray-600 dark:text-gray-200 p-1" />
              </div>
              <!-- Add more fields as necessary -->
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Status:</label>
              <select v-model="selectedOrder.status"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-500 dark:border-gray-600 dark:text-gray-200 p-1">
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="mt-6 flex justify-end">
              <button type="button" @click="closeModal"
                class="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

const orders = ref([]);
const searchQuery = ref("");
const selectedStatus = ref("all");
const sortOrder = ref("desc"); // Default sort order: Newest First
const loading = ref(true);

const currentPage = ref(1);
const itemsPerPage = ref(5);

const isModalVisible = ref(false);
const selectedOrder = ref(null);

const fetchOrders = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/admin/orders`, {
      withCredentials: true,
    });
    // Ensure orders are always an array
    orders.value = Array.isArray(response.data) ? response.data : [];

    // Sanitize each order to have a valid customerId object
    orders.value = orders.value.map(order => ({
      ...order,
      customerId: order.customerId || null,

    }));
  } catch (error) {
    console.error("Failed to fetch orders", error);
    orders.value = []; // Ensure orders is an empty array on error
  } finally {
    loading.value = false;
  }
};
const filteredOrders = computed(() => {
  let filtered = orders.value;

  if (searchQuery.value) {
    filtered = filtered.filter(order =>
      order._id.includes(searchQuery.value) ||
      `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedStatus.value !== "all") {
    filtered = filtered.filter(order => order.status === selectedStatus.value);
  }

  return filtered;
});

const sortedOrders = computed(() => {
  return filteredOrders.value.sort((a, b) => {
    if (sortOrder.value === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
});

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedOrders.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(sortedOrders.value.length / itemsPerPage.value));

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

const updatePagination = () => {
  currentPage.value = 1; // Reset to the first page when items per page changes
};

const sortOrders = () => {
  currentPage.value = 1; // Reset to the first page when sort order changes
};

const selectOrder = (order) => {
  selectedOrder.value = { ...order }; // Clone the order object
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const saveOrder = async () => {
  try {
    const orderToSave = { ...selectedOrder.value };

if (!orderToSave.customerId) {
  // Handle guest orders appropriately
  delete orderToSave.customerId; // Remove customerId if it's a guest order
}
    await axios.put(`${backendUrl}/api/order/${selectedOrder.value._id}`, selectedOrder.value, {
      withCredentials: true,
    });
    fetchOrders(); // Refresh the orders list
    closeModal();
  } catch (error) {
    console.error("Failed to save order", error);
  }
};

const statusClass = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-600 bg-yellow-200";
    case "shipped":
      return "text-blue-600 bg-blue-200";
    case "delivered":
      return "text-green-600 bg-green-200";
    case "cancelled":
      return "text-red-600 bg-red-200";
    default:
      return "";
  }
};

onMounted(fetchOrders);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  opacity: 1;
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
