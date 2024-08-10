<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <header class="text-xl font-bold mb-4 text-center">Login</header>
        <form @submit.prevent="loginUser">
          <div class="mb-4">
            <input
              type="email"
              v-model="loginData.email"
              placeholder="Email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="loginData.password"
              placeholder="Password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div class="mb-4">
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Login</button>
          </div>
        </form>
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import eventBus from '../js/eventBus';

const props = defineProps({
  isVisible: Boolean,
  onClose: Function,
});

const loginData = ref({ email: '', password: '' });

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:5174/api/login', loginData.value, { withCredentials: true });
    console.log(response.data);
    closeModal();
    eventBus.emit('has-logged');
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

const closeModal = () => {
  if (typeof props.onClose === 'function') {
    props.onClose();
  } else {
    console.error('onClose is not a function');
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
