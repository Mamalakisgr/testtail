<template>
  <fwb-breadcrumb solid class="bg-gray-200 text-gray-300 rounded-lg p-3 shadow-md">
    <fwb-breadcrumb-item home href="/">
      <router-link to="/" class="flex items-center hover:text-gray-100 transition-colors">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2L2 9h3v7h4V12h2v4h4V9h3L10 2z" />
        </svg>
        <span>Home</span>
      </router-link>
    </fwb-breadcrumb-item>
    <fwb-breadcrumb-item v-if="currentCategory" href="#">
      <router-link :to="`/product-list/${currentCategory}`" class="ml-1 hover:text-gray-100 transition-colors">
        {{ currentCategory }}
      </router-link>
    </fwb-breadcrumb-item>
    <fwb-breadcrumb-item v-if="currentProduct">
      <span class="ml-1 font-semibold text-gray-100">{{ currentProduct }}</span>
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
/* Additional custom styles can be added here if needed */
</style>
