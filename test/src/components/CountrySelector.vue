<template>
    <form class="max-w-sm mx-auto border-gray">
      <country-select v-model="country" :country="country" topCountry="US" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2 " />
      <region-select v-model="region" :country="country" :region="region" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2" />
    </form>
  </template>
  
  <script>
  export default {
    name: 'CountrySelector',
    data() {
      return {
        country: '',
        region: ''
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  