<template>
    <Header>
      <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Wishlist</h2>
  
          <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div class="space-y-6">
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
                    <a :href="`/product-details/${item.productId}`" class="shrink-0 md:order-1">
                      <img :src="`http://localhost:5174/${item.image}`" alt="product image" class="h-20 w-20 dark:hidden" />
                      <img :src="`http://localhost:5174/${item.image}`" alt="product image" class="hidden h-20 w-20 dark:block" />
                    </a>
  
                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a :href="`/product-details/${item.productId}`" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{{ item.name }}</a>
                    </div>
  
                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                      <div class="text-end md:order-4 md:w-32">
                        <p class="text-base font-bold text-gray-900 dark:text-white">${{ item.price }}</p>
                      </div>
                    </div>
  
                    <div class="flex items-center gap-4 md:order-5">
                      <button
                        type="button"
                        @click="toggleWishlist(item.productId)"
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
  
                      <button
                        type="button"
                        @click="removeItem(item.productId)"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
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
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Header>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { fetchWishlist, wishlist, toggleWishlist } from '@/js/wishlist'; // Adjust the import path accordingly
  
  const wishlistItems = ref([]);
  
  const removeItem = async (productId) => {
    await toggleWishlist(productId);
    wishlistItems.value = wishlist.value; // Update local state after removal
  };
  
  onMounted(() => {
    fetchWishlist();
    wishlistItems.value = wishlist.value;
  });
  </script>
  