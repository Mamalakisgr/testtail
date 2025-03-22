<template>
  <Header/>
  <section class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <header class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        {{ isLoginForm ? 'Login to Your Account' : 'Create a New Account' }}
      </header>
      <form @submit.prevent="isLoginForm ? loginUser() : registerUser()">
        <div v-if="isLoginForm">
          <div class="mb-4">
            <input
              type="email"
              v-model="loginData.email"
              placeholder="Email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="loginData.password"
              placeholder="Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div class="text-right mb-4">
            <a href="#" class="text-blue-500 dark:text-blue-400 hover:underline">Forgot password?</a>
          </div>
          <div class="mb-4">
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200">
              Login
            </button>
          </div>
          <div class="text-center">
            <span>Don't have an account? <a href="#" class="text-blue-500 dark:text-blue-400 hover:underline" @click="toggleForm">Signup</a></span>
          </div>
        </div>
        <div v-else>
          <div class="mb-4">
            <input
              type="email"
              v-model="formData.email"
              placeholder="Email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div class="mb-4 grid grid-cols-2 gap-4">
            <input
              type="text"
              v-model="formData.firstName"
              placeholder="First Name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <input
              type="text"
              v-model="formData.lastName"
              placeholder="Last Name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div class="mb-4 grid grid-cols-2 gap-4">
            <input
              type="tel"
              v-model="formData.mobilePhone"
              placeholder="Mobile Phone"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <input
              type="tel"
              v-model="formData.phone"
              placeholder="Phone (Optional)"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="formData.password"
              placeholder="Create Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="formData.confirmPassword"
              placeholder="Confirm Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div class="text-red-500 text-sm mb-4" v-if="passwordError">
            {{ passwordError }}
          </div>
          <div class="mb-4">
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200">
              Signup
            </button>
          </div>
          <div class="text-center">
            <span>Already have an account? <a href="#" class="text-blue-500 dark:text-blue-400 hover:underline" @click="toggleForm">Login</a></span>
          </div>
        </div>
      </form>
      <div class="flex justify-center mt-6">
        <a href="#" class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
          <i class='bx bxl-facebook text-blue-600 text-2xl'></i>
          <span>{{ isLoginForm ? 'Login' : 'Signup' }} with Facebook</span>
        </a>
      </div>
      <div class="flex justify-center mt-4">
        <a href="#" class="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
          <img src="" alt="Google Logo" class="w-6 h-6" />
          <span>{{ isLoginForm ? 'Login' : 'Signup' }} with Google</span>
        </a>
      </div>
    </div>
  </section>
  <Footer />
</template>
<script>
import axios from '../axios';
import { useRouter } from 'vue-router';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary
import Footer from '@/components/Footer.vue';
export default {
  components:{Footer},
  data() {
    return {
      isLoginForm: true, // Set to true to display the login form by default
      loginData: {
        email: '',
        password: ''
      },
      formData: {
        email: '',
        firstName: '',
        lastName: '',
        mobilePhone: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      passwordError: ''
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    toggleForm() {
      this.isLoginForm = !this.isLoginForm;
      this.passwordError = ''; // Reset password error when toggling forms
    },
    validatePasswords() {
      if (this.formData.password !== this.formData.confirmPassword) {
        this.passwordError = 'Passwords do not match';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    async registerUser() {
      if (!this.validatePasswords()) return;

      try {
        const response = await axios.post(`${backendUrl}/api/registerUser`, this.formData);
        console.log(response.data);
        // Handle success (e.g., navigate to login page, display a success message, etc.)
        this.toggleForm(); // Switch to login form after successful registration
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error (e.g., display error message)
      }
    },
    async loginUser() {
      try {
        const response = await axios.post(`${backendUrl}/api/login`, this.loginData);
        console.log(response.data);
        this.$router.push('/'); // Redirect to the homepage on successful login
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle error (e.g., display error message)
      }
    }
  }
};
</script>
  
  <style scoped>
  /* Add your custom styles here if needed */
  </style>
  