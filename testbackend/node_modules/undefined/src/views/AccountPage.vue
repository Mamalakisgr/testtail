<template>
<div class="flex min-h-screen bg-gray-100 dark:bg-gray-800">
    <!-- Include the AccountSidebar component -->
    <AccountSidebar />

    <!-- Main Content Area -->
    <div class="flex-1 p-6 bg-white dark:bg-gray-600 rounded-l shadow-lg border p-4  bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">My Account</h1>
      <!-- User Account Details -->
      <div class="bg-white p-4 rounded-lg shadow-md dark:bg-gray-500">
        <p class="mb-10 text-lg font-semibold text-gray-800 dark:text-gray-200">Edit your info</p>
        <div class="mb-4">
          <label for="name" class="block text-gray-700 ">Name:</label>
          <input
            v-model="user.name"
            id="name"
            class=" p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
        <div class="mb-4 ">
          <label for="lastName" class="block text-gray-700">Last Name:</label>
          <input
            v-model="user.lastName"
            id="lastName"
            class="p-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
        <div>
          <label for="email" class="block text-gray-700">Email:</label>
          <input
            v-model="user.email"
            id="email"
            disabled
            class="p-1 mt-1 block w-full bg-gray-100 cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
        <div>
          <label for="current-password" class="block text-gray-700">Current-Password</label>
          <input
            v-model="user.password"
            id="password"
            disabled
            class="p-1 mt-1 block w-full bg-gray-100 cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
        <div>
          <label for="new-password" class="block text-gray-700">New-Password</label>
          <input
            v-model="user.password"
            id="password"
            disabled
            class="p-1 mt-1 block w-full bg-gray-100 cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
        <div>
          <label for="re-password" class="block text-gray-700">Re-enter Password</label>
          <input
            v-model="user.password"
            id="re-password"
            disabled
            class="p-1 mt-1 block w-full bg-gray-100 cursor-not-allowed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
      </div>
      <button class="w-50 text-left py-2 px-4 mt-4 bg-blue-500 hover:bg-red-700 rounded">Update User Info</button>
    </div>
  </div>
</template>
  <script>
  import axios from 'axios';
  import AccountSidebar from '../components/AccountSideBar.vue';

  export default {
  components: {
    AccountSidebar,
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
        const authResponse = await axios.get('http://localhost:5174/api/auth', { withCredentials: true });
        
        if (authResponse.data.loggedIn) {
          const userId = authResponse.data.userId;
  
          // Fetch user details using userId
          const userResponse = await axios.get(`http://localhost:5174/api/users/${userId}`, { withCredentials: true });
  
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
  