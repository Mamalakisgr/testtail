<template>
    <div>
      <country-select v-model="country" :country="country" topCountry="US" />
      <region-select v-model="region" :country="country" :region="region" />
    </div>
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
  