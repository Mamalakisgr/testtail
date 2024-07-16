import axios from 'axios';
import { ref } from 'vue';

export const wishlist = ref([]);

export const fetchWishlist = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/wishlist-items', {
      withCredentials: true,
    });
    wishlist.value = response.data;
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
  }
};

export const toggleWishlist = async (productId) => {
  try {
    if (wishlist.value.includes(productId)) {
      await axios.post(
        'http://localhost:5174/api/remove-from-wishlist',
        { productId },
        { withCredentials: true }
      );
      wishlist.value = wishlist.value.filter((id) => id !== productId);
    } else {
      await axios.post(
        'http://localhost:5174/api/add-to-wishlist',
        { productId },
        { withCredentials: true }
      );
      wishlist.value.push(productId);
    }
  } catch (error) {
    console.error('Error updating wishlist:', error);
  }
};

// Initialize the wishlist
fetchWishlist();
