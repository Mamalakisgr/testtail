<template>
    <div class="tag-cat-container min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div class="tag-upload-container mb-8">
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Upload Tags</h2>
          <form @submit.prevent="uploadTag">
            <div class="upload-product-tag mb-4">
              <input 
                v-model="tagName"
                type="text"
                name="name"
                placeholder="Enter new tag"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">Upload Tag</button>
            <div v-if="tagMessage" :class="tagMessageClass" class="mt-2">{{ tagMessage }}</div>
          </form>
        </div>
        <div class="category-upload-container">
          <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Upload Category</h2>
          <form @submit.prevent="uploadCategory">
            <div class="upload-product-category mb-4">
              <input
                v-model="categoryName"
                type="text"
                name="name"
                placeholder="Enter new category"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none">Upload Category</button>
            <div v-if="categoryMessage" :class="categoryMessageClass" class="mt-2">{{ categoryMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { backendUrl } from '@/js/index'; 
  const tagName = ref('');
  const categoryName = ref('');
  const tagMessage = ref('');
  const categoryMessage = ref('');
  const tagMessageClass = ref('');
  const categoryMessageClass = ref('');
  
  const uploadTag = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/upload-tag`, { name: tagName.value });
      tagMessage.value = response.data.message || 'Tag uploaded successfully';
      tagMessageClass.value = 'text-green-500';
      tagName.value = '';
    } catch (error) {
      tagMessage.value = error.response.data.message || 'Failed to upload tag';
      tagMessageClass.value = 'text-red-500';
    }
  };
  
  const uploadCategory = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/upload-category`, { name: categoryName.value });
      categoryMessage.value = response.data.message || 'Category uploaded successfully';
      categoryMessageClass.value = 'text-green-500';
      categoryName.value = '';
    } catch (error) {
      categoryMessage.value = error.response.data.message || 'Failed to upload category';
      categoryMessageClass.value = 'text-red-500';
    }
  };
  </script>
  
  <style scoped>
  .tag-cat-container {
    display: flex;
    justify-content: space-around;
    margin: 20px;
  }
  .upload-product-tag, .upload-product-category {
    margin-bottom: 20px;
  }
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  .text-green-500 {
    color: #10b981;
  }
  .text-red-500 {
    color: #ef4444;
  }
  </style>
  