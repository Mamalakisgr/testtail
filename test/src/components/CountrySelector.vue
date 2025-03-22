<template>
  <form class="max-w-sm mx-auto border-gray">
    <country-select v-model="country" :topCountry="topCountry" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2" data-cy="country-selector" />
    <region-select v-model="region" :country="country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2"  data-cy="region-selector" />
  </form>
</template>

<script>
export default {
  name: 'CountrySelector',
  props: {
    modelValue: String,
    topCountry: {
      type: String,
      
    }
  },
  data() {
    return {
      country: this.modelValue,
      region: ''
    };
  },
  watch: {
    country(newCountry) {
      this.$emit('update:modelValue', newCountry);
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
