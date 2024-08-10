<template>
  <Header/>
    <section class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <header class="text-xl font-bold mb-4 text-center">{{ isLoginForm ? 'Login' : 'Signup' }}</header>
        <form @submit.prevent="isLoginForm ? loginUser() : registerUser()">
          <div v-if="isLoginForm">
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
            <div class="form-link mb-4">
              <a href="#" class="forgot-pass">Forgot password?</a>
            </div>
            <div class="mb-4">
              <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Login</button>
            </div>
            <div class="text-center">
              <span>Don't have an account? <a href="#" class="link text-blue-500" @click="toggleForm">Signup</a></span>
            </div>
          </div>
          <div v-else>
            <div class="mb-4">
              <input
                type="email"
                name="email"
                v-model="formData.email"
                placeholder="Email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div class="mb-4">
              <input
                type="text"
                name="firstName"
                v-model="formData.firstName"
                placeholder="First Name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div class="mb-4">
              <input
                type="text"
                name="lastName"
                v-model="formData.lastName"
                placeholder="Last Name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div class="mb-4">
              <input
                type="tel"
                name="mobilePhone"
                v-model="formData.mobilePhone"
                placeholder="Mobile Phone"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div class="mb-4">
              <input
                type="tel"
                name="phone"
                v-model="formData.phone"
                placeholder="Phone"
                class="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div class="mb-4">
              <input
                type="password"
                id="password1"
                v-model="formData.password"
                placeholder="Create password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div class="mb-4">
              <input
                type="password"
                id="password2"
                v-model="formData.confirmPassword"
                placeholder="Confirm password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div id="passwordError" class="text-red-500 mb-4" v-if="passwordError">
              {{ passwordError }}
            </div>
            <div class="mb-4">
              <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded">Signup</button>
            </div>
            <div class="text-center">
              <span>Already have an account? <a href="#" class="link text-blue-500" @click="toggleForm">Login</a></span>
            </div>
          </div>
        </form>
        <div class="flex justify-center mt-4">
          <a href="#" class="flex items-center space-x-2">
            <i class='bx bxl-facebook text-blue-600 text-2xl'></i>
            <span>{{ isLoginForm ? 'Login' : 'Signup' }} with Facebook</span>
          </a>
        </div>
        <div class="flex justify-center mt-4">
          <a href="#" class="flex items-center space-x-2">
            <img src="#" alt="Google Logo" class="w-6 h-6" />
            <span>{{ isLoginForm ? 'Login' : 'Signup' }} with Google</span>
          </a>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from '../axios';
  
  import { useRouter } from 'vue-router';
  
  export default {
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
          const response = await axios.post('/api/registerUser', this.formData);
          console.log(response.data);
          // Handle success (e.g., navigate to login page, display a success message, etc.)
        } catch (error) {
          console.error('Error registering user:', error);
          // Handle error (e.g., display error message)
        }
      },
      async loginUser() {
      try {
        const response = await axios.post('/api/login', this.loginData);
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
  