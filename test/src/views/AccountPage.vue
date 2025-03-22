<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Include the AccountSidebar component -->
    <AccountSidebar />

    <!-- Main Content Area -->
    <div class="flex-1 p-8">
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Account</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Manage your account information and settings</p>
        </div>
        
        <!-- User Account Details -->
        <div class="p-6">
          <p class="mb-6 text-lg font-semibold text-gray-800 dark:text-gray-200">Edit your info</p>
          
          <div class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name:
              </label>
              <input
                v-model="user.name"
                id="name"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name:
              </label>
              <input
                v-model="user.lastName"
                id="lastName"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email:
              </label>
              <input
                v-model="user.email"
                id="email"
                disabled
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label for="current-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password:
              </label>
              <input
                v-model="user.password"
                id="password"
                type="password"
                disabled
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password:
              </label>
              <input
                v-model="user.password"
                id="new-password"
                type="password"
                disabled
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label for="re-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Re-enter Password:
              </label>
              <input
                v-model="user.password"
                id="re-password"
                type="password"
                disabled
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div class="mt-6">
            <button 
              @click="saveChanges"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
            >
              Update User Info
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from 'axios';
import Footer from '../components/Footer.vue';
import AccountSidebar from '../components/AccountSideBar.vue';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

export default {
  components: {
    AccountSidebar,
    Footer,
  },
  data() {
    return {
      user: {
        name: 'John Doe', // Replace with actual user data from your authentication logic
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    };
  },
  methods: {
    saveChanges() {
      // Logic to save changes to the server
      // For example, you can use axios to send a POST request to update user data
      axios.post('/api/users/update', this.user)
        .then(response => {
          alert('Changes saved successfully!');
        })
        .catch(error => {
          console.error('Failed to save changes:', error);
        });
    },
  },
  async created() {
    try {
      // Fetch authentication status
      const authResponse = await axios.get(`${backendUrl}/api/auth`, { withCredentials: true });
      
      if (authResponse.data.loggedIn) {
        const userId = authResponse.data.userId;

        // Fetch user details using userId
        const userResponse = await axios.get(`${backendUrl}/api/users/${userId}`, { withCredentials: true });

        // Assuming the user data contains name and email
        this.user.name = userResponse.data.name;
        this.user.email = userResponse.data.email;
        this.user.lastName = userResponse.data.lastName;
      } else {
        // If the user is not logged in, redirect to the login page or handle accordingly
        this.$router.push({ name: 'Login' });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // Handle error (e.g., show an error message, redirect to login)
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>