<template>
    <header class="backoffice-header">

      <div class="products-section p-2">
        Products
        <div class="products-dropdown">
          <router-link to="/admin/upload-product">Upload Products</router-link>
          <router-link to="/admin/edit-product">Edit Products</router-link>
          <router-link to="/admin/upload-tag">Edit Tag/Category</router-link>
        </div>
      </div>
        <router-link to="/admin/edit-orders" class="p-2">Orders</router-link>
      <button @click="logout" class="p-2 rounded-full">Logout</button>
    </header>
  </template>
  
  <script setup>
  const logout = () => {
    // Handle logout functionality
    console.log('Logging out...');
    // You can add actual logout logic here
  }
  </script>
  
  <style scoped>
  .backoffice-header {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  .products-section {
    position: relative;
  }
  .products-dropdown {
    display: none;
    position: absolute;
    background-color: #444;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  .products-section:hover .products-dropdown {
    display: block;
  }
  .products-dropdown a {
    color: white;
    display: block;
    padding: 0.5rem 0;
  }
  .products-dropdown a:hover {
    background-color: #555;
  }
  button {
    background-color: #f00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  button:hover {
    background-color: #d00;
  }
  </style>
  