<template>
    <div class="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md dark:bg-gray-800">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">{{ category }}</h2>
      
      <div class="flex items-center gap-4">
        <span class="text-gray-800 dark:text-white">Sort by:</span>
        <select
          :value="sortOrder"
          @change="$emit('update:sortOrder', $event.target.value)"
          class="border rounded px-3 py-2 text-black bg-white"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    category: String,
    sortOrder: {
      type: String,
      default: 'asc'
    }
  })
  
  defineEmits(['update:sortOrder'])
  </script>