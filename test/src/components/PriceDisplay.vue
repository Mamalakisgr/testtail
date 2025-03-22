<template>
    <div class="flex items-center gap-2">
      <span
        v-if="offerPrice"
        class="text-lg font-bold text-red-500"
      >
        {{ offerPrice }} €
      </span>
      <span
        :class="{ 'text-gray-400 line-through': offerPrice }"
        class="text-xl font-bold"
      >
        {{ price }} €
      </span>
    </div>
  </template>
  
  <script setup>
  defineProps({
    price: {
      type: Number,
      required: true
    },
    offerPrice: Number
  })
  </script>