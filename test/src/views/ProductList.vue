<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="flex flex-col lg:flex-row mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <!-- Sidebar -->
      <div class="w-full lg:w-1/4 lg:pr-8 bg-gray-800 text-white rounded-lg p-4 mb-8 lg:mb-0">
        <!-- Categories Section -->
        <div>
          <h2 class="text-xl font-bold mb-4">Categories</h2>
          <ul>
            <li v-for="category in categories" :key="category._id" class="mb-2">
              <RouterLink :to="`/product-list/${category}`" class="block py-2 px-4 rounded hover:bg-blue-700" :class="{'bg-blue-700 font-bold': route.params.categoryId === category}">
                {{category }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <!-- Filters Section -->
        <div class="mt-8">
          <h2 class="text-xl font-bold mb-4">Filters</h2>
          <div>
            <h3 class="text-lg font-semibold mb-2">Price Range</h3>
            <input type="range" min="0" max="1000" v-model="filters.price" class="w-full" />
            <p>Max Price: {{ filters.price }}€</p>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Color</h3>
            <select v-model="filters.color" class="w-full border rounded px-2 py-1 text-black">
              <option value="">All</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Size</h3>
            <select v-model="filters.size" class="w-full border rounded px-2 py-1 text-black">
              <option value="">All</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Products Section -->
      <div class="w-full lg:w-3/4 flex flex-wrap gap-6 lg:ml-5">
        <a v-for="product in filteredProducts" :key="product._id" :href="product.href" class="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="fixed-dimensions">
            <img class="object-cover object-center w-full h-full rounded-t-lg" :src="`http://localhost:5174/${product.image}`" alt="product image" />
          </div>
          <div class="px-5 pb-5">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.product_name }}</h5>
            </a>
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ product.p_price }} €</span>
              <button @click="addToCart(product._id, 1)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { addToCart } from '@/js';
import Footer from '../components/Footer.vue';

const route = useRoute();
const products = ref([]);
const categories = ref([]);
const filters = ref({
  price: 1000,
  color: '',
  size: ''
});

const fetchProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:5174/api/products/${route.params.categoryId}`);
    products.value = response.data;
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return product.p_price <= filters.value.price &&
           (filters.value.color ? product.color === filters.value.color : true) &&
           (filters.value.size ? product.size === filters.value.size : true);
  });
});

watch(() => route.params.categoryId, (newCategoryId) => {
  fetchProducts(newCategoryId);
  window.scrollTo(0, 0); // Scroll to the top when the category changes
});

onMounted(() => {
  fetchProducts(route.params.categoryId);
  fetchCategories();
});
</script>

<style scoped>
.fixed-dimensions {
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
}

.fixed-dimensions img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


@media (min-width: 1024px) {
  .lg\\:ml-5 {
    margin-left: 5%;
  }
}
</style>
