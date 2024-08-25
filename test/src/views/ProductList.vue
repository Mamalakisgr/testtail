<template>
  <div class="bg-gray-100 min-h-screen bg-gray-300">
    <!-- Breadcrumb -->
    <div class="px-4 py-4 relative b-10" style="bottom: -6.25rem;">
      <Breadcrumb :category="category" />
    </div>
    <div class="flex flex-col lg:flex-row mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      
      <!-- Sidebar -->
      <div class="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
        <div class="sticky top-4">
          <div class="bg-gray-800 text-white rounded-lg p-4">
            <!-- Categories Section -->
            <div>
              <h2 class="text-xl font-bold mb-4 rounded bg-gray-600 p-1">Categories</h2>
              <ul>
                <li v-for="cat in categories" :key="cat._id" class="mb-2">
                  <RouterLink :to="`/product-list/${cat}`" class="block py-2 px-4 rounded hover:bg-blue-700" :class="{'bg-blue-700 font-bold': category === cat}">
                    {{ cat }}
                  </RouterLink>
                </li>
              </ul>
            </div>
            <!-- Filters Section -->
            <div class="mt-8">
              <h2 class="text-xl font-bold mb-4 p-1 rounded bg-gray-600">Filters</h2>
              <div>
                <h3 class="text-lg font-semibold mb-2">Price Range</h3>
                <input type="range" min="0" max="5000" v-model="filters.price" class="w-full" />
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
        </div>
      </div>

      <!-- Products Section -->
      <div class="w-full lg:w-3/4 p-4 lg:ml-2 rounded dark:bg-gray-900">
        <!-- Sort Filter Bar -->
        <div class="mb-6 flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Sort by:</h2>
          <select v-model="sortOrder" @change="sortProducts" class="border rounded px-2 py-1 text-black">
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        <div class="flex flex-wrap gap-6">
          <div v-for="product in paginatedProducts" :key="product._id" class="relative group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="fixed-dimensions">
              <img class="object-cover object-center w-full h-full rounded-t-lg" :src="`${product.image}`" alt="product image" />
            </div>
            <div class="px-5 pb-5">
              <RouterLink :to="`/product-details/${product._id}`">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.product_name }}</h5>
              </RouterLink>
              <div class="flex items-center justify-between mt-3">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ product.p_price }} €</span>
                <button @click="addToCart(product._id, 1)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
              </div>
            </div>
            <button
              @click="toggleWishlist(product._id)"
              class="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <svg
                v-if="wishlist.includes(product._id)"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8.5a5.5 5.5 0 0110.42-2.2A5.5 5.5 0 0121 8.5c0 3.58-3.28 6.44-8.28 11.05L12 20.35l-1.28-1.16C6.28 14.94 3 12.08 3 8.5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { addToCart } from '@/js';
import Footer from '../components/Footer.vue';
import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';  // Adjust the import path accordingly
import Breadcrumb from '../components/Breadcrump.vue';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

const route = useRoute();
const products = ref([]);
const categories = ref([]);
const category = ref(route.params.categoryId);

const filters = ref({
  price: 5000,
  color: '',
  size: ''
});

const sortOrder = ref("asc"); // Default sort order
const currentPage = ref(1);
const itemsPerPage = ref(10);

const fetchProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${backendUrl}/api/products`, { params: { category: categoryId } });
    products.value = response.data.map(product => {
      // Construct the image URL or provide a fallback
      product.image = product.p_images ? `${backendUrl}/api/product-image/${product.p_images}` : '/path/to/fallback-image.jpg';
      return product;
    });
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};


const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
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

const sortedProducts = computed(() => {
  return filteredProducts.value.sort((a, b) => {
    return sortOrder.value === "asc"
      ? a.p_price - b.p_price
      : b.p_price - a.p_price;
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedProducts.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage.value));

const updatePagination = () => {
  currentPage.value = 1; // Reset to the first page when items per page changes
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

const sortProducts = () => {
  currentPage.value = 1; // Reset to the first page when sort order changes
};

watch(() => route.params.categoryId, (newCategoryId) => {
  category.value = newCategoryId;
  fetchProducts(newCategoryId);
  
  window.scrollTo(0, 0); // Scroll to the top when the category changes
});

onMounted(() => {
  fetchProducts(route.params.categoryId);
  fetchCategories();
  fetchWishlist();
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
