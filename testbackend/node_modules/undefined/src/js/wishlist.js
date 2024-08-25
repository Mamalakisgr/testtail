import axios from 'axios';
import { ref } from 'vue';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary
import eventBus from '../js/eventBus';

export const wishlist = ref([]);

export const fetchWishlist = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/wishlist-items`, {
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
        `${backendUrl}/api/remove-from-wishlist`,
        { productId },
        { withCredentials: true }
      );
      wishlist.value = wishlist.value.filter((id) => id !== productId);
    } else {
      await axios.post(
        `${backendUrl}/api/add-to-wishlist`,
        { productId },
        { withCredentials: true }
      );
      wishlist.value.push(productId);
      eventBus.emit('wishlist-added');

    }
  } catch (error) {
    console.error('Error updating wishlist:', error);
  }
};

// Initialize the wishlist
fetchWishlist();
