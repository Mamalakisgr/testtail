<template>
    <div class="flex justify-center items-center gap-4 mt-8">
      <button
        @click="$emit('prev-page')"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      
      <span class="text-gray-700 dark:text-gray-300">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
  
      <button
        @click="$emit('next-page')"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  })
  
  defineEmits(['prev-page', 'next-page'])
  </script>