import { ref} from 'vue';
import axios from 'axios';
const cartCount = ref(0);
export default {
  cartCount
};
export const addToCart = async (productId) => {
  try {
    const response = await axios.post('http://localhost:5174/api/add-to-cart', { productId, quantity: 1 }, { withCredentials: true });
    cartCount.value = response.data.totalItems;
  } catch (error) {
    console.error('Failed to add to cart', error);
  }
};
