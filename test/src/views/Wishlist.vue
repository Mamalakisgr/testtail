<template>
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-screen-xl px-4 2xl:px-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Wishlist</h2>

      <div class="mt-6">
        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center items-center">
          <div class="spinner"></div>
        </div>

        <!-- Wishlist Content -->
        <div v-else>
          <!-- Show message if wishlist is empty -->
          <div v-if="wishlistItems.length === 0"
            class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 text-center text-gray-900 dark:text-white">
            <p>Your wishlist is empty.</p>
          </div>

          <!-- Table of Wishlist Items -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>

                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                <tr v-for="(item, index) in wishlistItems" :key="index">
                  <!-- Image Column -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <RouterLink :to="`/product-details/${item._id}`">
                      <img :src="item.image" alt="Product Image" class="h-16 w-16 object-cover rounded-xl" />
                    </RouterLink>
                  </td>
                  <!-- Title Column -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <RouterLink :to="`/product-details/${item._id}`"
                      class="text-sm font-medium text-gray-900 dark:text-white hover:underline">
                      {{ item.product_name }}
                    </RouterLink>
                  </td>
                  <!-- Price Column -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="item.offer_price">
                      <div class="text-sm text-gray-400 line-through">{{ item.p_price }} €</div>
                      <div class="text-sm text-red-500">{{ item.offer_price }} €</div>
                    </div>
                    <div v-else>
                      <div class="text-sm text-gray-900 dark:text-white">{{ item.p_price }} €</div>
                    </div>
                  </td>
                  <!-- Combined Actions Column -->
                  <!-- Combined Actions Column -->
                  <td class="px-6 py-4 whitespace-nowrap align-middle">
                    <div class="flex gap-4 items-center justify-center">
                      <button @click="addToCart(item._id, 1)"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                        Add to cart
                      </button>
                      <button type="button" @click="removeItem(item._id)"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                        <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                        </svg>
                        Remove from Wishlist
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchWishlist, wishlist, toggleWishlist } from '@/js/wishlist'; // Adjust the import path accordingly
import axios from 'axios';
import Footer from '../components/Footer.vue';
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
  wishlistItems.value = productDetails.map(product => ({
    ...product,
    image: product.p_images
      ? `${backendUrl}/api/product-image/${product.p_images}`
      : '/path/to/fallback-image.jpg',
  }));

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
