<template>
    <header>
      <h2 class="text-sm title-font tracking-widest text-gray-400 mb-2">
        {{ brand }}
      </h2>
      <h1 class="text-3xl title-font font-medium text-white">
        {{ name }}
      </h1>
    </header>
  </template>
  
  <script setup>
  defineProps({
    brand: String,
    name: String
  })
  </script>