<template>
  <transition name="fade">
    <div v-if="visible" class="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50" data-cy="toast-message">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import eventBus from '../js/eventBus';

const props = defineProps({
  message: {
    type: String,
    default: 'Product has been added to cart',
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const visible = ref(false);

const showNotification = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};

onMounted(() => {
  eventBus.on('product-added', showNotification);
});

onBeforeUnmount(() => {
  eventBus.off('product-added', showNotification);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
