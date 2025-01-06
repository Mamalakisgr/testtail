<template>
    <section class="bg-white py-6 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          People Also Bought
        </h2>
        <div
          v-if="loading"
          class="flex justify-center items-center h-24"
        >
          <div class="loader"></div>
        </div>
        <div
          v-else-if="alsoBoughtItems.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="item in alsoBoughtItems"
            :key="item.id"
            class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <a :href="`/product/${item.id}`" class="block">
              <img
                :src="`${backendUrl}/api/product-image/${item.image}`"
                :alt="item.name"
                class="h-32 w-full object-cover rounded-t-lg"
              />
            </a>
            <div class="mt-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ item.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {{ item.description }}
              </p>
              <div class="mt-4">
                <span
                  v-if="item.offer_price"
                  class="text-red-500 font-bold"
                >
                  {{ item.offer_price.toFixed(2) }} €
                </span>
                <span
                  v-else
                  class="text-gray-900 dark:text-white font-bold"
                >
                  {{ item.price.toFixed(2) }} €
                </span>
              </div>
            </div>
            <button
              @click="addToCart(item.id)"
              class="mt-4 w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div
          v-else
          class="text-center text-gray-700 dark:text-gray-400 mt-4"
        >
          No related products found.
        </div>
      </div>
    </section>
  </template>
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { backendUrl } from "@/js/index"; // Adjust the path if necessary
  
  export default {
  name: "AlsoBought",
  setup() {
    const alsoBoughtItems = ref([]);
    const loading = ref(true);

    // Fetch random products
    const fetchRandomProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/products`);
        const allProducts = response.data.products || [];
        
        // Shuffle the products and take the first 5
        alsoBoughtItems.value = allProducts.sort(() => 0.5 - Math.random()).slice(0, 5);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        loading.value = false;
      }
    };

    const addToCart = async (productId) => {
      try {
        await axios.post(`${backendUrl}/api/cart-items`, { productId }, { withCredentials: true });
        alert("Item added to cart!");
      } catch (error) {
        console.error("Failed to add item to cart", error);
      }
    };

    onMounted(fetchRandomProducts);

    return {
      alsoBoughtItems,
      loading,
      addToCart,
      backendUrl,
    };
  },
};
  </script>
  <style scoped>
  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #09f;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  