<template>
    <div class="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
      <div class="sticky top-4 space-y-4">
        <!-- Categories Section -->
        <div class="bg-gray-800 text-white rounded-lg p-4">
          <h2 class="text-xl text-center font-bold mb-4 rounded bg-gray-600 p-1">Categories</h2>
          <ul class="space-y-2">
            <li v-for="cat in categories" :key="cat">
              <RouterLink 
                :to="`/product-list/${cat}`"
                class="block py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                :class="{ 'bg-blue-700 font-bold': currentCategory === cat }"
              >
                {{ cat }}
              </RouterLink>
            </li>
          </ul>
        </div>
  
        <!-- Filters Section -->
        <div class="bg-gray-800 text-white rounded-lg p-4">
          <h2 class="text-xl text-center font-bold mb-4 rounded bg-gray-600 p-1">Filters</h2>
          
          <div class="space-y-4">
            <!-- Price Filter -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Price Range</h3>
              <input
                type="range"
                min="0"
                max="5000"
                :value="filters.price"
                @input="updateFilter('price', $event.target.value)"
                class="w-full"
              />
              <p>Max Price: {{ filters.price }}€</p>
            </div>
  
            <!-- Color Filter -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Color</h3>
              <select
                :value="filters.color"
                @change="updateFilter('color', $event.target.value)"
                class="w-full rounded px-2 py-1 text-black"
              >
                <option value="">All</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
  
            <!-- Size Filter -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Size</h3>
              <select
                :value="filters.size"
                @change="updateFilter('size', $event.target.value)"
                class="w-full rounded px-2 py-1 text-black"
              >
                <option value="">All</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
  
          <button
            @click="handleClearFilters"
            class="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    categories: Array,
    currentCategory: String,
    filters: Object
  })
  
  const emit = defineEmits(['update:filters', 'clear-filters'])
  
  const updateFilter = (key, value) => {
    emit('update:filters', { ...props.filters, [key]: value })
  }
  
  const handleClearFilters = () => {
    emit('clear-filters')
  }
  </script>