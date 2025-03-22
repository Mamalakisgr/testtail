// productStore.js
import { reactive } from 'vue'
import axios from 'axios'
import { backendUrl } from '@/js/index'

const state = reactive({
  product: null,
  loading: false,
  error: null
})

const fetchProduct = async (productId) => {
  // Use the store's loading state instead of "loadingImage"
  state.loading = true
  
  try {
    const response = await axios.get(`${backendUrl}/api/products`, {
      params: { productId: productId }
    });

    if (response.data && response.data.length > 0) {
      const fetchedProduct = response.data[0];

      // Check if p_images is defined, otherwise set a fallback image
      if (fetchedProduct.p_images) {
        fetchedProduct.image = `${backendUrl}/api/product-image/${fetchedProduct.p_images}`;
      } else {
        console.error('p_images field is undefined for the product');
        // Optionally, set a fallback image:
        fetchedProduct.image = '/fallback-image.jpg';
      }

      // Update the reactive state
      state.product = fetchedProduct;

      // Note: storeRecentProduct was previously being called here, but since it’s defined in your component,
      // it should be handled there rather than in the store.
    } else {
      console.error('Product data is empty');
    }
  } catch (error) {
    console.error('Failed to fetch product', error);
    state.error = error;
  } finally {
    state.loading = false;
  }
}

export default {
  state,
  fetchProduct
}
