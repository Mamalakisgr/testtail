<template>
    <div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar with categories and tags -->
      <aside class="w-64 bg-white p-4 shadow-md">
        <h2 class="text-xl font-bold mb-4">Categories</h2>
        <ul>
          <li v-for="category in categories" :key="category.name" class="mb-2">
            <button @click="toggleCategory(category)" class="w-full text-left font-medium text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-lg py-2 px-4">
              {{ category.name }}
            </button>
            <ul v-if="openCategoryName === category.name" class="ml-4 mt-2 space-y-2">
              <li v-for="product in category.products || []" :key="product._id" class="flex items-center justify-between">
                <span class="text-gray-600">{{ product.product_name }}</span>
                <div class="flex space-x-2">
                  <button @click="editProduct(product)" class="text-blue-500 hover:text-blue-700">Edit</button>
                  <button @click="confirmDeleteProduct(product._id)" class="text-red-500 hover:text-red-700">Delete</button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
  
      <!-- Main content for editing products -->
      <main class="flex-1 p-6">
        <div v-if="selectedProduct" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Edit Product</h2>
          <form @submit.prevent="updateProduct">
            <div class="mb-4">
              <label class="block text-gray-700">Product Name</label>
              <input v-model="selectedProduct.product_name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Product Price</label>
              <input v-model="selectedProduct.p_price" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Category</label>
              <select v-model="selectedProduct.p_category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Tags</label>
              <div class="flex items-center space-x-2 mb-2">
                <select v-model="newTag" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
                </select>
                <button type="button" @click="addTag" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Tag</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <div v-for="tag in selectedProduct.p_tag" :key="tag" class="bg-gray-200 px-2 py-1 rounded-lg flex items-center space-x-2">
                  <span>{{ tag }}</span>
                  <button @click="removeTag(tag)" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Quantity</label>
              <input v-model="selectedProduct.p_quantity" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Offer Price</label>
              <input v-model="selectedProduct.offer_price" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Product Image</label>
              <input @change="handleFileUpload" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="file" accept="image/*" />
            </div>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Update Product</button>
          </form>
        </div>
      </main>
  
      <!-- Delete confirmation modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this product?</p>
          <div class="flex justify-end mt-4 space-x-2">
            <button @click="cancelDelete" class="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400">Cancel</button>
            <button @click="deleteProduct" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { backendUrl } from '@/js/index'; // Adjust the path if necessary

  const categories = ref([]);
  const availableTags = ref([]);
  const selectedProduct = ref(null);
  const openCategoryName = ref(null);
  const showDeleteModal = ref(false);
  const productIdToDelete = ref(null);
  const newTag = ref('');
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/categories`);
      categories.value = response.data.map(category => ({
        name: category,
        products: []
      }));
  
      for (const category of categories.value) {
        try {
          const productsResponse = await axios.get(`${backendUrl}/api/products`, {
            params: { category: category.name }
          });
          category.products = productsResponse.data;
        } catch (productsError) {
          console.error(`Error fetching products for category ${category.name}:`, productsError);
        }
      }
    } catch (error) {
      console.error('Error fetching categories and products:', error);
    }
  };
  
  const fetchTags = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/tags`);
      availableTags.value = response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };
  
  const toggleCategory = (category) => {
    openCategoryName.value = openCategoryName.value === category.name ? null : category.name;
  };
  
  const editProduct = (product) => {
    selectedProduct.value = { ...product };
  };
  
  const handleFileUpload = (event) => {
    selectedProduct.value.image = event.target.files[0];
  };
  
  const addTag = () => {
    if (newTag.value && !selectedProduct.value.p_tag.includes(newTag.value)) {
      selectedProduct.value.p_tag.push(newTag.value);
      newTag.value = '';
    }
  };
  
  const removeTag = (tag) => {
    selectedProduct.value.p_tag = selectedProduct.value.p_tag.filter(t => t !== tag);
  };
  
  const updateProduct = async () => {
    const formData = new FormData();
    formData.append('name', selectedProduct.value.product_name);
    formData.append('price', selectedProduct.value.p_price);
    formData.append('p_category', selectedProduct.value.p_category);
    formData.append('p_tag', selectedProduct.value.p_tag.join(',')); // Join tags into a comma-separated string
    formData.append('p_brand', selectedProduct.value.p_brand);
    formData.append('p_quantity', selectedProduct.value.p_quantity);
    formData.append('offer_price', selectedProduct.value.offer_price);
  
    if (selectedProduct.value.image) {
      formData.append('productImage', selectedProduct.value.image);
    }
  
    try {
      const response = await axios.put(`${backendUrl}/api/products/${selectedProduct.value._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product updated successfully:', response.data);
      fetchCategories(); // Refresh the categories and products data after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const confirmDeleteProduct = (productId) => {
    productIdToDelete.value = productId;
    showDeleteModal.value = true;
  };
  
  const cancelDelete = () => {
    showDeleteModal.value = false;
    productIdToDelete.value = null;
  };
  
  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/api/products/${productIdToDelete.value}`);
      console.log('Product deleted successfully:', response.data);
      fetchCategories(); // Refresh the categories and products data after deletion
      cancelDelete(); // Hide the modal after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  onMounted(() => {
    fetchCategories();
    fetchTags();
  });
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  button {
    cursor: pointer;
  }
  </style>
  