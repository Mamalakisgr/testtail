<template>
  <div class="min-h-screen bg-gray-800">
    <!-- Breadcrumb Section -->
    <div class="px-4 py-6">
      <Breadcrumb :category="category" />
    </div>

    <div class="flex flex-col lg:flex-row mx-auto max-w-7xl px-4">
      <!-- Sidebar -->
      <aside class="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
        <div class="sticky top-4 space-y-6">
          <!-- Categories -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-center mb-4 bg-gray-200 rounded py-1">
              Categories
            </h2>
            <ul class="space-y-2">
              <li v-for="cat in categories" :key="cat._id">
                <RouterLink
                  :to="`/product-list/${cat}`"
                  class="block py-2 px-4 rounded hover:bg-blue-100 transition-colors"
                  :class="{ 'bg-blue-100 font-semibold': category === cat }"
                >
                  {{ cat }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Filters -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-center mb-4 bg-gray-200 rounded py-1">
              Filters
            </h2>
            <div class="space-y-4">
              <!-- Price Filter -->
              <div>
                <h3 class="text-lg font-medium mb-1">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  v-model.number="filters.price"
                  class="w-full"
                />
                <p class="text-sm text-gray-600">Max Price: {{ filters.price }}€</p>
              </div>
              <!-- Color Filter -->
              <div>
                <h3 class="text-lg font-medium mb-1">Color</h3>
                <select v-model="filters.color" class="w-full border rounded px-2 py-1 text-gray-800">
                  <option value="">All</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>
              <!-- Size Filter -->
              <div>
                <h3 class="text-lg font-medium mb-1">Size</h3>
                <select v-model="filters.size" class="w-full border rounded px-2 py-1 text-gray-800">
                  <option value="">All</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
            <button
              @click="clearFilters"
              class="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </aside>

      <!-- Products Section -->
      <main class="w-full lg:w-3/4">
        <!-- Sort Filter Bar -->
        <div class="mb-6 flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow">
          <h2 class="text-2xl font-bold text-gray-800">{{ category }}</h2>
          <div class="flex items-center mt-4 sm:mt-0">
            <span class="mr-2 text-gray-700 font-medium">Sort by:</span>
            <select
              v-model="sortOrder"
              @change="sortProducts"
              class="border rounded px-3 py-1 text-gray-800"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <!-- Hot Products Section -->
        <HotProducts :hot-products="hotProducts" />

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          <div
  v-for="product in paginatedProducts"
  :key="product._id"
  class="relative group bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition-all duration-200"
>
            <!-- Image Container -->
            <div class="relative w-full overflow-hidden rounded-t-lg" style="padding-top: 100%;">
              <img
                class="absolute inset-0 object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                :src="`${product.image}`"
                alt="Product Image"
              />
            </div>
            <!-- Product Info -->
            <div class="p-4">
              <RouterLink :to="`/product-details/${product._id}`">
                <h5 class="text-lg font-semibold text-gray-900 hover:underline">
                  {{ product.product_name }}
                </h5>
              </RouterLink>
              <div class="flex items-center justify-between mt-3">
                <div>
                  <span v-if="product.offer_price" class="text-lg font-bold text-red-600">
                    {{ product.offer_price }} €
                  </span>
                  <span
                    v-if="product.offer_price"
                    class="text-sm text-gray-500 line-through ml-2"
                  >
                    {{ product.p_price }} €
                  </span>
                  <span v-else class="text-xl font-bold text-gray-900">
                    {{ product.p_price }} €
                  </span>
                </div>
                <button
                  @click="addToCart(product._id, 1)"
                  class="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition-colors focus:outline-none"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <!-- Wishlist Button -->
 <!-- Wishlist Button -->
 <button
              @click="toggleWishlist(product._id)"
              class="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-100 transition-colors"
              aria-label="Toggle Wishlist"
            >
              <svg
                v-if="wishlist.includes(product._id)"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                class="w-6 h-6 text-red-500"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6 text-gray-500"
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

        <!-- (Optional) Pagination Controls could be added here -->
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { addToCart } from '@/js';
import Footer from '../components/Footer.vue';
import Breadcrumb from '../components/Breadcrump.vue';
import HotProducts from '@/components/HotProducts.vue';
import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';
import { backendUrl } from '@/js/index';

const props = defineProps({
  categoryId: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const products = ref([]);
const hotProducts = ref([]);
const categories = ref([]);
const filters = ref({
  price: 5000,
  color: '',
  size: ''
});
const sortOrder = ref("asc");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const category = ref(route.params.categoryId);

const fetchProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${backendUrl}/api/products`, {
      params: { category: categoryId }
    });
    products.value = response.data.map(product => {
      product.image = product.p_images
        ? `${backendUrl}/api/product-image/${product.p_images}`
        : '/path/to/fallback-image.jpg';
      product.p_price = parseFloat(product.p_price);
      return product;
    });
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};

const fetchHotProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${backendUrl}/api/products`, {
      params: { tag: 'HotProducts', category: categoryId }
    });
    hotProducts.value = response.data.slice(0, 5).map(product => {
      product.image = product.p_images
        ? `${backendUrl}/api/product-image/${product.p_images}`
        : '/path/to/fallback-image.jpg';
      return product;
    });
  } catch (error) {
    console.error('Error fetching hot products:', error);
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
    const productPrice = parseFloat(product.p_price);
    const maxPrice = parseFloat(filters.value.price);
    return productPrice <= maxPrice &&
      (!filters.value.color || product.color === filters.value.color) &&
      (!filters.value.size || product.size === filters.value.size);
  });
});

const sortedProducts = computed(() => {
  return filteredProducts.value.slice().sort((a, b) => {
    return sortOrder.value === "asc" ? a.p_price - b.p_price : b.p_price - a.p_price;
  });
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedProducts.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage.value));

const sortProducts = () => {
  currentPage.value = 1;
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

const clearFilters = () => {
  filters.value.price = 5000;
  filters.value.color = '';
  filters.value.size = '';
};

watch(() => route.params.categoryId, (newCategoryId) => {
  category.value = newCategoryId;
  fetchProducts(newCategoryId);
  fetchHotProducts(newCategoryId);
  window.scrollTo(0, 0);
});

onMounted(() => {
  fetchProducts(props.categoryId);
  fetchHotProducts(props.categoryId);
  fetchCategories();
  fetchWishlist();
});
</script>

<style scoped>
/* Maintain aspect ratio for product images */
.relative {
  position: relative;
}

.overflow-hidden {
  overflow: hidden;
}
</style>
