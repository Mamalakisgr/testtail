<template>
  <div class=" min-h-screen bg-gray-700">

    <!-- Category Name -->
    <!-- <div class="flex justify-center items-center py-8 mx-auto max-w-full">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white tracking-wide capitalize">
        {{ category }}
      </h1>
    </div> -->
    <div>
      <Breadcrumb :category="category" />
    </div>
    <div class="flex flex-col lg:flex-row mx-auto max-w-full bg-gray-500">

      <!-- Sidebar -->
      <div class="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">

        <div class="sticky top-4 p-6">

          <div class="bg-gray-800 text-white rounded-lg p-6">
            <!-- Categories Section -->
            <div>
              <h2 class="text-xl text-center font-bold mb-4 rounded bg-gray-600 p-1">Categories</h2>
              <ul>
                <li v-for="cat in categories" :key="cat._id" class="mb-2 ">
                  <RouterLink :to="`/product-list/${cat}`" class="block py-2 px-4 rounded hover:bg-blue-700"
                    :class="{ 'bg-blue-700 font-bold': category === cat }">
                    {{ cat }}
                  </RouterLink>
                </li>
              </ul>
            </div>

          </div>
          <!-- Filters Section -->
           
          <div class="sticky top-4 p-6 bg-gray-800 m-2 rounded-lg text-white ">
          <div class="">
            <h2 class="text-xl text-center font-bold mb-4 p-1 rounded bg-gray-600">Filters</h2>
            <div>
              <h3 class="text-lg font-semibold mb-2">Price Range</h3>
              <input type="range" min="0" max="5000" v-model.number="filters.price" class="w-full" />
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
          <button @click="clearFilters" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">
  Clear Filters
</button>

        </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="w-full lg:w-3/4 p-4 lg:ml-2 rounded  dark:bg-gray-500">
        <!-- Sort Filter Bar -->
        <div class="mb-6 flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md dark:bg-gray-800">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">{{category}}</h2>
          <h3 class=" flex justify-end text-xl font-bold text-gray-800 dark:text-white"> Sort by:</h3>
          <select v-model="sortOrder" @change="sortProducts" class="border rounded px-2 py-1 text-black">
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

<!-- Hot Products Section -->
<HotProducts :hot-products="hotProducts"/>


<!-- Products Section with 4 products per row -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 dark:bg-gray-800 p-4 shadow rounded-t-lg">
  <div v-for="product in paginatedProducts" :key="product._id"
    class="relative group bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <!-- Product Image -->
    <div class="fixed-dimensions">
      <img class="object-cover object-center w-full h-full rounded-t-lg" :src="`${product.image}`" alt="product image" />
    </div>
    <!-- Product Name and Price -->
    <div class="px-5 pb-5">
      <RouterLink :to="`/product-details/${product._id}`">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.product_name }}</h5>
      </RouterLink>
      <div class="flex items-center justify-between mt-3">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ product.p_price }} €</span>
        <button @click="addToCart(product._id, 1)"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add to cart
        </button>
      </div>
    </div>
    <!-- Wishlist Button -->
    <button @click="toggleWishlist(product._id)" class="absolute top-2 right-2 text-gray-500 hover:text-red-500">
      <svg v-if="wishlist.includes(product._id)" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 8.5a5.5 5.5 0 0110.42-2.2A5.5 5.5 0 0121 8.5c0 3.58-3.28 6.44-8.28 11.05L12 20.35l-1.28-1.16C6.28 14.94 3 12.08 3 8.5z" />
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
import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';
import Breadcrumb from '../components/Breadcrump.vue';
import { backendUrl } from '@/js/index';
import HotProducts from '@/components/HotProducts.vue';
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
  price: 5000, // Default maximum price
  color: '',
  size: ''
});
const sortOrder = ref("asc"); // Default sort order
const currentPage = ref(1);
const itemsPerPage = ref(10);
const category = ref(route.params.categoryId);

// Fetch products from the backend based on the category
const fetchProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${backendUrl}/api/products`, { params: { category: categoryId } });
    products.value = response.data.map(product => {
      product.image = product.p_images ? `${backendUrl}/api/product-image/${product.p_images}` : '/path/to/fallback-image.jpg';
      product.p_price = parseFloat(product.p_price); // Ensure the price is a number
      return product;
    });
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};

// Fetch hot products based on the 'HotProducts' tag
const fetchHotProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${backendUrl}/api/products`, {
      params: { tag: 'HotProducts', category: categoryId }
    });
    
    // Limit the hot products to 5
    hotProducts.value = response.data.slice(0, 5).map(product => {
      // Construct the image URL or provide a fallback
      product.image = product.p_images ? `${backendUrl}/api/product-image/${product.p_images}` : '/path/to/fallback-image.jpg';
      return product;
    });
  } catch (error) {
    console.error('Error fetching hot products:', error);
  }
};


// Fetch categories from the backend
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

// Filter products based on user filters (price, color, size)
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const productPrice = parseFloat(product.p_price); // Ensure price is a number
    const maxPrice = parseFloat(filters.value.price); // Ensure filter price is a number
    return productPrice <= maxPrice && // Compare prices correctly
      (!filters.value.color || product.color === filters.value.color) &&
      (!filters.value.size || product.size === filters.value.size);
  });
});

// Sort filtered products based on selected sort order (asc or desc)
const sortedProducts = computed(() => {
  return filteredProducts.value.slice().sort((a, b) => {
    return sortOrder.value === "asc" ? a.p_price - b.p_price : b.p_price - a.p_price;
  });
});

// Paginate the sorted products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedProducts.value.slice(start, end);
});

// Calculate total pages for pagination
const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage.value));

// Update sort order and reset the pagination when sorting changes
const sortProducts = () => {
  currentPage.value = 1; // Reset to the first page when sort order changes
};

// Pagination controls
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

// Watch for route changes to refetch products
watch(() => route.params.categoryId, (newCategoryId) => {
  category.value = newCategoryId;
  fetchProducts(newCategoryId);
  fetchHotProducts(newCategoryId); // Ensure hot products are fetched when category changes
  window.scrollTo(0, 0); // Scroll to the top when the category changes
});

// Fetch products, hot products, categories, and wishlist on component mount
onMounted(() => {
  fetchProducts(props.categoryId);
  fetchHotProducts(props.categoryId);
  fetchCategories();
  fetchWishlist();
});
</script>


<style scoped>
.fixed-dimensions {
  width: 100%;
  padding-top: 100%;
  /* 1:1 Aspect Ratio */
  position: relative;
}

.fixed-dimensions img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
@media (min-width: 1024px) {
  .lg\\:ml-5 {
    margin-left: 5%;
  }
}
</style>
