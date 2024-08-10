<template>
    <transition name="fade">
      <div v-if="visible" class="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    message: String
  });
  
  const visible = ref(false);
  
  const showNotification = () => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, 3000);
  };
  
  // Listen for the product-added event
  import eventBus from '../js/eventBus';
  eventBus.on('product-added', showNotification);
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  