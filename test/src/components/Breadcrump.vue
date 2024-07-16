<template>
     <fwb-breadcrumb solid>
    <fwb-breadcrumb-item home href="/">
        <router-link :to="`/product-list/${product.p_category}`" class="ml-1 text-gray-500 hover:text-gray-700 md:ml-2">
               Home
              </router-link>
    </fwb-breadcrumb-item>
    <fwb-breadcrumb-item href="#">
        <router-link :to="`/product-list/${product.p_category}`" class="ml-1 text-gray-500 hover:text-gray-700 md:ml-2">
                {{ product.p_category }}
              </router-link>
    </fwb-breadcrumb-item>
    <fwb-breadcrumb-item>
        {{product.product_name}}
    </fwb-breadcrumb-item>
  </fwb-breadcrumb>
    <!-- <nav class="bg-gray-800 text-gray-700 body-font">
      <div class="container mx-auto flex px-5 py-4 items-center justify-between">
        <ol class="bg-gray-600 inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <router-link to="/" class="text-gray-500 hover:text-gray-700">
              Home
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L10 9.586 7.707 7.293a1 1 0 00-1.414 1.414l2.293 2.293-2.293 2.293a1 1 0 001.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clip-rule="evenodd" />
              </svg>
              <router-link :to="`/product-list/${product.p_category}`" class="ml-1 text-gray-500 hover:text-gray-700 md:ml-2">
                {{ product.p_category }}
              </router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L10 9.586 7.707 7.293a1 1 0 00-1.414 1.414l2.293 2.293-2.293 2.293a1 1 0 001.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clip-rule="evenodd" />
              </svg>
              <span class="ml-1 text-gray-500 md:ml-2">{{ product.product_name }}</span>
            </div>
          </li>
        </ol>
      </div>
    </nav> -->
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { FwbBreadcrumb, FwbBreadcrumbItem } from 'flowbite-vue'
  const route = useRoute();
  const product = ref({});
  const productId = route.params.productId;

  const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:5174/api/products`, {
      params: {
        productId: productId
      }
    });
    product.value = response.data[0]; // Assuming response is an array with a single product
  } catch (error) {
    console.error('Failed to fetch product', error);
  }
};

  
  onMounted(fetchProduct);
  </script>
  
  <style scoped>
  /* Add any additional styling you need here */
  </style>
  