<template>
  <header class="bg-gray-800 text-white py-3 px-6 flex justify-between items-center sticky top-0 z-50 shadow-lg">
    <div class="flex items-center space-x-6">
      <!-- Menu Button with improved hover effect -->
      <button 
        @click="toggleMenu" 
        :aria-expanded="isMenuOpen" 
        aria-controls="mobile-menu"
        class="relative group focus:outline-none transition-transform duration-200 hover:scale-105"
        data-cy="mobile-menu"
      >
        <div class="relative flex items-center justify-center rounded-lg w-[45px] h-[45px] bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
          <div class="flex flex-col justify-between w-[18px] h-[12px]">
            <div class="bg-white h-[2px] w-full transition-all duration-200 group-hover:w-3/4"></div>
            <div class="bg-white h-[2px] w-full"></div>
            <div class="bg-white h-[2px] w-full transition-all duration-200 group-hover:w-3/4"></div>
          </div>
        </div>
      </button>

      <!-- Logo with hover effect -->
      <RouterLink to="/" class="flex items-center space-x-3 group ">
        <img 
          class="h-10 w-10 rounded-full border-2 border-gray-600  shadow-md" 
          src="/8218.png_860.png" 
          alt="Fashionistas A.E. Logo" 
        />
        <span class="font-bold text-lg tracking-wide ">
          Fashionistas A.E.
        </span>
      </RouterLink>
    </div>

    <!-- Search Bar with improved styling -->
    <div class="relative hidden lg:flex lg:items-center lg:w-1/3 max-w-md">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          v-model="searchQuery"
          @keyup="searchProducts"
          class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button 
          v-if="searchQuery"
          @click="closeSearchResults" 
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Search Results Dropdown -->
      <transition name="fade">
        <div
          v-if="searchResults.length"
          class="absolute bg-white text-gray-800 rounded-lg shadow-xl mt-2 w-full z-50 max-h-[400px] overflow-y-auto top-full"
        >
          <ul class="divide-y divide-gray-100">
            <li
              v-for="product in searchResults"
              :key="product._id"
              class="p-3 hover:bg-gray-50 transition-colors duration-150"
            >
              <RouterLink :to="`/product-details/${product._id}`" class="flex items-center space-x-3">
                <img
                  :src="`${backendUrl || 'localhost:5174'}/api/product-image/${product.p_images}`"
                  alt="Product Image"
                  class="w-12 h-12 object-cover rounded-md"
                />
                <div>
                  <h3 class="font-medium text-gray-900">{{ product.product_name }}</h3>
                  <p class="text-sm text-gray-500">${{ product.p_price }}</p>
                </div>
              </RouterLink>
            </li>
            <li 
              v-if="hasMoreResults" 
              @click="navigateToSearchPage" 
              class="p-3 text-blue-600 hover:bg-blue-50 cursor-pointer flex items-center justify-center space-x-2 transition-colors duration-150"
            >
              <span>View all results</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Navigation Links with improved styling -->
    <nav class="hidden lg:flex lg:items-center lg:space-x-6">
      <template v-if="auth.loggedIn">
        <RouterLink 
          to="/my-account" 
          class="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink 
          to="/register" 
          class="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Sign Up
        </RouterLink>
        <button 
          @click="openLoginModal" 
          class="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>
      </template>

      <!-- Wishlist Button -->
      <RouterLink 
        to="/wishlist" 
        class="relative p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <span 
          v-if="wishlistCount > 0"
          class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full"
        >
          {{ wishlistCount }}
        </span>
      </RouterLink>

      <!-- Cart Button -->
      <button 
        @click="toggleCart" 
        class="relative p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200" 
        data-cy="cart_button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <span 
          v-if="cartCount > 0"
          class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full"
        >
          {{ cartCount }}
        </span>
      </button>
    </nav>
  </header>

  <!-- Mobile Menu -->
  <transition name="slide">
    <div v-if="isMenuOpen" id="mobile-menu" class="fixed inset-0 flex z-[100]">
      <!-- Backdrop -->
      <div 
        class="bg-black bg-opacity-50 backdrop-blur-sm w-full transition-opacity duration-300" 
        @click="toggleMenu"
      ></div>
      
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white shadow-xl fixed left-0 h-full overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <div class="flex items-center space-x-3">
            <img 
              class="h-10 w-10 rounded-full border-2 border-gray-600" 
              src="/8218.png_860.png" 
              alt="Fashionistas A.E. Logo" 
            />
            <span class="font-bold text-lg">Fashionistas A.E.</span>
          </div>
        </div>

        <nav class="p-4 space-y-2">
          <RouterLink 
            to="/offer-products" 
            @click="toggleMenu"
            class="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <span>Hot Offers!</span>
          </RouterLink>
          
          <RouterLink 
            to="/product-list/hot-products" 
            @click="toggleMenu"
            class="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <span>Hot Products!</span>
          </RouterLink>
          
          <RouterLink 
            to="/new-products" 
            @click="toggleMenu"
            class="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <span>New Releases</span>
          </RouterLink>
          
          <template v-for="category in categories" :key="category._id">
            <RouterLink 
              :to="`/product-list/${category}`" 
              @click="toggleMenu"
              class="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <span>{{ category }}</span>
            </RouterLink>
          </template>
        </nav>
      </aside>
    </div>
  </transition>

  <CartSideMenu :isCartOpen="isCartOpen" :toggleCart="toggleCart" />
  
  <transition name="modal-fade">
    <LoginModal :isVisible="isLoginModalVisible" :onClose="closeLoginModal" />
  </transition>
</template>

<script setup>
// Keep the existing script setup code unchanged
import { ref, reactive, onMounted, onUnmounted, computed, watch, provide, inject } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
import CartSideMenu from '../components/CartSideMenu.vue';
import LoginModal from '../components/LoginModal.vue';
import eventBus from '../js/eventBus';
import { FwbSidebar, FwbSidebarItemGroup, FwbSidebarItem, FwbSidebarDropdownItem } from 'flowbite-vue';
import { wishlist, fetchWishlist } from '@/js/wishlist';
import { backendUrl } from '@/js/index';

const auth = inject('auth')
const categories = ref([]);
const isMenuOpen = ref(false);
const isCartOpen = ref(false);
const isLoginModalVisible = ref(false);
const cartCount = ref(0);
const cartItems = ref(0);
const router = useRouter();
const searchQuery = ref('');
const searchResults = ref([]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const openLoginModal = () => {
  isLoginModalVisible.value = true;
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

const hasMoreResults = computed(() => {
  return searchResults.value.length >= 10;
});

const navigateToSearchPage = () => {
  router.push({ name: 'SearchPage', query: { q: searchQuery.value } });
};

const fetchCartCount = () => {
  axios
    .get(`${backendUrl}/api/cart-count`, { withCredentials: true })
    .then((response) => {
      cartCount.value = response.data.count;
    })
    .catch((error) => {
      console.error('Failed to fetch cart count', error);
    });
};

const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/cart-items`, {
      withCredentials: true,
    });
    cartItems.value = response.data.items;
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  }
};

const searchProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/products?productName=${searchQuery.value}`, {
      withCredentials: true,
    });
    searchResults.value = response.data.slice(0, 10);
    console.log(response.data);
  } catch (error) {
    console.error('Failed to search products', error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

const closeSearchResults = () => {
  searchResults.value = [];
  searchQuery.value = '';
};

eventBus.on('cart-updated', (newCount) => {
  cartCount.value = newCount;
});

eventBus.on('product-added', (newCount) => {
  cartCount.value = newCount;
});

eventBus.on('product-removed', (newCount) => {
  cartCount.value = newCount;
});

onMounted(() => {
  fetchCartCount();
  fetchCategories();
  fetchCartItems();
  fetchWishlist();

  eventBus.on('has-logged', fetchCartCount);
  
  const handleFocusTrap = (e) => {
    if (isMenuOpen.value && !e.target.closest('#mobile-menu')) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelector('#mobile-menu').focus();
    }
  };

  document.addEventListener('focusin', handleFocusTrap);

  onUnmounted(() => {
    eventBus.off('has-logged', fetchCartCount);
    document.removeEventListener('focusin', handleFocusTrap);
  });
});

watch(() => router.currentRoute.value.path, () => {
  isCartOpen.value = false;
  closeSearchResults();
});

const wishlistCount = computed(() => wishlist.value.length);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}
</style>