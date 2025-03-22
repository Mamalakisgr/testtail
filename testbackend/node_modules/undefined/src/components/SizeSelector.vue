<template>
    <div class="mt-6 pb-5 border-b-2 border-gray-200">
      <div class="flex items-center">
        <span class="mr-3 text-gray-400">Size</span>
        <div class="relative">
          <select
            :value="selectedSize"
            @change="$emit('update:selectedSize', $event.target.value)"
            class="rounded border border-gray-600 bg-gray-800 text-white py-2 pl-3 pr-10 focus:ring-2 focus:ring-blue-500"
          >
            <option 
              v-for="size in sizes" 
              :key="size"
              :value="size"
              class="bg-gray-800"
            >
              {{ size }}
            </option>
          </select>
          <ChevronDownIcon class="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'
  
  defineProps({
    sizes: Array,
    selectedSize: String
  })
  
  defineEmits(['update:selectedSize'])
  </script>