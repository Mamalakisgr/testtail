<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <slot name="product" v-for="product in products" :product="product" />
    </div>
  </template>
  
  <script setup>
  defineProps({
    products: {
      type: Array,
      default: () => []
    }
  })
  </script>