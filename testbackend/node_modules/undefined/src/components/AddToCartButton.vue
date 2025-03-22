<template>
    <button
      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
      @click="$emit('click')"
    >
      <span class="flex items-center gap-2">
        <ShoppingBagIcon class="w-5 h-5" />
        Add to Cart
      </span>
    </button>
  </template>
  
  <script setup>
  import ShoppingBagIcon from '@/components/icons/ShoppingBagIcon.vue'
  </script>