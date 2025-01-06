<template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <AccountSideBar class="w-64"></AccountSideBar>
      <div class="flex-1 p-8">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Billing Addresses</h2>
        
        <div class="mt-6 space-y-4">
          <!-- Loop through existing billing addresses -->
          <div v-for="(address, index) in addresses" :key="address._id" class="bg-white p-4 rounded-lg shadow-md dark:bg-gray-700">
            <p class="text-lg font-medium text-gray-900 dark:text-white">{{ address.name }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ address.address }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ address.city }}, {{ address.zip }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ address.country }}</p>
            
            <div class="mt-4 flex space-x-4">
              <button @click="openEditModal(index)" class="text-white bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded">Edit</button>
              <button @click="confirmDelete(address._id)" class="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded">Delete</button>
            </div>
          </div>
  
          <!-- Add New Address Button -->
          <button @click="openAddModal" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4">
            Add New Address
          </button>
        </div>
      </div>
  
      <!-- Modal for editing/adding address -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-gray-800">
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ isEditing ? 'Edit Billing Address' : 'Add New Billing Address' }}</h3>
            <form @submit.prevent="saveAddress" class="mt-4 space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input v-model="currentAddress.name" id="name" name="name" type="text" required class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <input v-model="currentAddress.address" id="address" name="address" type="text" required class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                  <input v-model="currentAddress.city" id="city" name="city" type="text" required class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
                </div>
                <div>
                  <label for="zip" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal Code</label>
                  <input v-model="currentAddress.zip" id="zip" name="zip" type="text" required class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
                </div>
              </div>
              <div>
                <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                <input v-model="currentAddress.country" id="country" name="country" type="text" required class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
              </div>
              <div class="flex justify-end space-x-2">
                <button type="button" @click="closeModal" class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">Cancel</button>
                <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">{{ isEditing ? 'Save' : 'Add' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg overflow-hidden shadow-lg dark:bg-gray-800">
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Confirm Deletion</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Are you sure you want to delete this address?</p>
            <div class="mt-4 flex justify-end space-x-2">
              <button @click="closeDeleteModal" class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">Cancel</button>
              <button @click="deleteAddress" class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Success Toast -->
    <div v-if="showSuccessToast" class="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded shadow-lg">
      {{ successMessage }}
    </div>
  
    <!-- Error Toast -->
    <div v-if="showErrorToast" class="fixed top-0 right-0 m-4 p-4 bg-red-500 text-white rounded shadow-lg">
      {{ errorMessage }}
    </div>
    <Footer/>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import AccountSideBar from '../components/AccountSideBar.vue';
  import { backendUrl } from '@/js/index';
  import Footer from '../components/Footer.vue';

  const billingAddressesRaw = ref([]);
  const addresses = computed(() => billingAddressesRaw.value);
  const showModal = ref(false);
  const showDeleteModal = ref(false);
  const showSuccessToast = ref(false);
  const showErrorToast = ref(false);
  const successMessage = ref('');
  const errorMessage = ref('');
  const isEditing = ref(false);
  const currentAddress = ref({ name: '', address: '', city: '', zip: '', country: '' });
  const addressToDeleteId = ref(null);
  
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/billing-address`, { withCredentials: true });
      billingAddressesRaw.value = response.data;
    } catch (error) {
      showErrorToast.value = true;
      errorMessage.value = 'Failed to fetch addresses';
      setTimeout(() => showErrorToast.value = false, 3000);
      console.error('Failed to fetch addresses', error);
    }
  };
  
  const openEditModal = (index) => {
    isEditing.value = true;
    currentAddress.value = { ...addresses.value[index] };
    showModal.value = true;
  };
  
  const openAddModal = () => {
    isEditing.value = false;
    currentAddress.value = { name: '', address: '', city: '', zip: '', country: '' };
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
    currentAddress.value = { name: '', address: '', city: '', zip: '', country: '' };
  };
  
  const confirmDelete = (id) => {
    addressToDeleteId.value = id;
    showDeleteModal.value = true;
  };
  
  const closeDeleteModal = () => {
    showDeleteModal.value = false;
    addressToDeleteId.value = null;
  };
  
  const saveAddress = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/billing-address`, {
        addressId: isEditing.value ? currentAddress.value._id : null,
        addressData: currentAddress.value
      }, { withCredentials: true });
  
      // Update the addresses list with the new data from the server
      billingAddressesRaw.value = response.data.billingAddresses;
  
      // Show success message
      showSuccessToast.value = true;
      successMessage.value = 'Address saved successfully!';
      setTimeout(() => showSuccessToast.value = false, 3000);
  
      closeModal();
    } catch (error) {
      showErrorToast.value = true;
      errorMessage.value = 'Failed to save address';
      setTimeout(() => showErrorToast.value = false, 3000);
      console.error('Failed to save address', error);
    }
  };
  
  const deleteAddress = async () => {
    try {
      await axios.delete(`${backendUrl}/api/user/billing-address/${addressToDeleteId.value}`, { withCredentials: true });
      
      const index = addresses.value.findIndex(addr => addr._id === addressToDeleteId.value);
      if (index !== -1) {
        addresses.value.splice(index, 1);
      }
  
      showSuccessToast.value = true;
      setTimeout(() => showSuccessToast.value = false, 3000);  // Hide toast after 3 seconds
  
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete address', error);
    }
  };
  
  onMounted(() => {
    fetchAddresses();
  });
  </script>
  
  <style scoped>
  /* Add styles for the modal */
  </style>
  