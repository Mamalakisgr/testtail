<template>
    <div class="relative lg:w-1/2 w-full">
      <LoadingSpinner v-if="loading" />
      <img
        :alt="altText"
        class="w-full object-cover object-center rounded border border-gray-200 h-full max-w-sm max-h-96"
        :src="image"
        @load="$emit('image-loaded')"
      />
    </div>
  </template>
  
  <script setup>
  import LoadingSpinner from '@/components/LoadingSpinner.vue'
  
  defineProps({
    image: String,
    altText: String,
    loading: Boolean
  })
  
  defineEmits(['image-loaded'])
  </script>