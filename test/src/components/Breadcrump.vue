<template>
  <fwb-breadcrumb solid class="">
    <fwb-breadcrumb-item home href="/">
      <router-link to="/" class="ml-1 text-gray-500 hover:text-gray-700 md:ml-2">
        
      </router-link>
    </fwb-breadcrumb-item>
    <fwb-breadcrumb-item v-if="currentCategory" href="#">
      <router-link :to="`/product-list/${currentCategory}`" class="ml-1 text-gray-500 hover:text-gray-700 md:ml-2">
        {{ currentCategory }}
      </router-link>
    </fwb-breadcrumb-item>
    <fwb-breadcrumb-item v-if="currentProduct">
      {{ currentProduct }}
    </fwb-breadcrumb-item>
  </fwb-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { FwbBreadcrumb, FwbBreadcrumbItem } from 'flowbite-vue';

const route = useRoute();

// Props passed to the component
const props = defineProps({
  category: String,
  product: String
});

// Reactive variables to store the current category and product
const currentCategory = ref(props.category);
const currentProduct = ref(props.product);

// Watch for changes in the route parameters
watch(() => route.params.category, (newCategory) => {
  currentCategory.value = newCategory;
});

watch(() => route.params.product, (newProduct) => {
  currentProduct.value = newProduct;
});

// Watch for changes in the props passed to the component
watch(() => props.category, (newCategory) => {
  currentCategory.value = newCategory;
});

watch(() => props.product, (newProduct) => {
  currentProduct.value = newProduct;
});
</script>

<style scoped>
/* Add any additional styling you need here */
</style>
