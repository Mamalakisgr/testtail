<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-screen-xl">
          <div>
            <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  Sign in to Flowbite
              </h2>
              <form @submit.prevent="loginUser" class="mt-8 space-y-6">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" v-model="loginData.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                      <input type="password" v-model="loginData.password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                          <input id="remember" v-model="loginData.remember" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                      <div class="ms-3 text-sm">
                      <label for="remember" class="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
                      </div>
                      <a href="#" class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</a>
                  </div>
                  <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                      Not registered yet? <a href="/register" class="text-blue-600 hover:underline dark:text-blue-500">Create account</a>
                  </div>
              </form>
            </div>
        </div>
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-red-900 focus:outline-none">
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
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

const props = defineProps({
  isVisible: Boolean,
  onClose: Function,
});

const loginData = ref({ email: '', password: '' });

const loginUser = async () => {
  try {
    const response = await axios.post(`${backendUrl}/api/login`, loginData.value, { withCredentials: true });
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
