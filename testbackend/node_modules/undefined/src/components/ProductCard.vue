<template>
    <div class="relative group bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <!-- Product Image -->
      <div class="aspect-square w-full relative">
        <img
          :src="product.image"
          :alt="product.product_name"
          class="object-cover w-full h-full rounded-t-lg"
        />
      </div>
  
      <!-- Product Details -->
      <div class="px-5 pb-5">
        <RouterLink 
          :to="`/product-details/${product._id}`"
          class="hover:text-blue-600 transition-colors"
        >
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white "  data-cy="product_name">
            {{ product.product_name }}
          </h5>
        </RouterLink>
  
        <div class="flex items-center justify-between mt-3">
          <!-- Pricing -->
          <div class="flex items-center gap-2">
            <span
              v-if="product.offer_price"
              class="text-lg font-bold text-red-600"
            >
              {{ product.offer_price }} €
            </span>
            <span
              :class="{ 'text-gray-500 line-through ml-2': product.offer_price }"
              class="text-gray-900 dark:text-white"
            >
              {{ product.p_price }} €
            </span>
          </div>
  
          <!-- Add to Cart -->
          <button
            @click="$emit('add-to-cart')"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
  
      <!-- Wishlist Button -->
      <button
        @click="$emit('toggle-wishlist')"
        class="absolute top-2 right-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          :class="isInWishlist ? 'text-red-500 fill-current' : 'text-gray-500'"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    product: {
      type: Object,
      required: true
    },
    isInWishlist: {
      type: Boolean,
      default: false
    }
  })
  
  defineEmits(['add-to-cart', 'toggle-wishlist'])
  </script>