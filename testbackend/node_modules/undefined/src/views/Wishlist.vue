<template>
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-screen-xl px-4 2xl:px-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Wishlist</h2>

      <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 w-full">
        <div class="w-full lg:max-w-2xl xl:max-w-4xl">
          <div class="space-y-6">
            <!-- Loading Spinner -->
            <div v-if="loading" class="flex justify-center items-center">
              <div class="spinner"></div>
            </div>

            <!-- Wishlist Content -->
            <div v-else>
              <div v-if="wishlistItems.length === 0" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 text-center text-gray-900 dark:text-white">
                <p>Your wishlist is empty.</p>
              </div>
              <div
                v-else
                v-for="(item, index) in wishlistItems"
                :key="index"
                class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
              >
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <RouterLink :to="`/product-details/${item._id}`" class="shrink-0 md:order-1">
                    <img :src="`${item.image}`" alt="product image" class="h-20 w-20 dark:hidden" />
                    <img :src="`${item.image}`" alt="product image" class="hidden h-20 w-20 dark:block" />
                  </RouterLink>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <RouterLink :to="`/product-details/${item._id}`" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{{ item.product_name }}</RouterLink>
                  </div>

                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900 dark:text-white">${{ item.p_price }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 md:order-4">
                    <button @click="addToCart(item._id, 1)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button> 
                  </div>
                  <div class="flex items-center gap-4 md:order-5">
                    <button
                      type="button"
                      @click="removeItem(item._id)"
                      class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    >
                      <svg
                        class="me-1.5 h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                      </svg>
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchWishlist, wishlist, toggleWishlist } from '@/js/wishlist'; // Adjust the import path accordingly
import axios from 'axios';
import Footer from '../components/Footer.vue'
import { addToCart } from '@/js';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

const wishlistItems = ref([]);
const loading = ref(true);

const fetchProductDetails = async (productIds) => {
  try {
    const response = await axios.post(`${backendUrl}/api/product-details`, {
      productIds,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return [];
  }
};

const removeItem = async (productId) => {
  await toggleWishlist(productId);
  await loadWishlistItems(); // Refetch the wishlist items to update the state properly
};

const loadWishlistItems = async () => {
  loading.value = true;
  await fetchWishlist();
  const productDetails = await fetchProductDetails(wishlist.value);

  // Map the product details to include the correct image URL
  wishlistItems.value = productDetails.map(product => {
    return {
      ...product,
      image: product.p_images ? `${backendUrl}/api/product-image/${product.p_images}` : '/path/to/fallback-image.jpg',
    };
  });

  loading.value = false;
};

onMounted(() => {
  loadWishlistItems();
});
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
