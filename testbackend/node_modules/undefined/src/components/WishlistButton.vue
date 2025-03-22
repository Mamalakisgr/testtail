<template>
    <button
      class="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
      @click="$emit('toggle-wishlist')"
    >
      <HeartIcon
        class="w-6 h-6"
        :class="isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'"
      />
    </button>
  </template>
  
  <script setup>
  import HeartIcon from '@/components/icons/HeartIcon.vue'
  
  defineProps({
    isInWishlist: Boolean
  })
  
  defineEmits(['toggle-wishlist'])
  </script>