<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
    <div class="flex items-center space-x-4">
      <!-- Menu Button -->
      <button @click="toggleMenu" :aria-expanded="isMenuOpen" aria-controls="mobile-menu"
        class="relative group focus:outline-none">
        <div class="relative flex items-center justify-center rounded-full w-[50px] h-[50px] bg-slate-700">
          <div class="flex flex-col justify-between w-[20px] h-[14px]">
            <div class="bg-white h-[2px] w-full"></div>
            <div class="bg-white h-[2px] w-full"></div>
            <div class="bg-white h-[2px] w-full"></div>
          </div>
        </div>
      </button>

      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
        <RouterLink to="/" class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
          <img class="h-12 w-12 rounded-full border-2 border-white shadow-lg" src="/8218.png_860.png"
            alt="Eshop Logo" />
          <span class="font-semibold text-xl tracking-tight">Arxidopoulos A.E.</span>
        </RouterLink>
      </div>
    </div>

   <!-- Search Bar for Large Screens -->
   <div class="relative hidden lg:flex lg:items-center lg:space-x-4 ml-4 ">
    <input
      type="text"
      placeholder="Search..."
      v-model="searchQuery"
      @keyup="searchProducts"
      class="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-b focus:border-weather-secondary focus:outline-none focus:shadow"
    />
    <button @click="closeSearchResults" class="text-white bg-red-500 px-2 py-1 rounded">X</button>
    <transition name="fade">
      <div
      v-if="searchResults.length"
      class="absolute bg-white text-black rounded-lg shadow-md mt-2 w-full z-50 max-h-60 overflow-y-auto top-9 right-0"
    >
      <ul class="divide-y divide-gray-200">
        <li
          v-for="product in searchResults"
          :key="product._id"
          class="p-4 hover:bg-gray-100 cursor-pointer"
        >
          <RouterLink :to="`/product-details/${product._id}`">
            <img
              :src="`${backendUrl || 'localhost:5174'}/api/product-image/${product.p_images}`"
              alt="Product Image"
              class="w-10 h-10 object-cover mr-2"
            />
            <h3 class="text-lg font-semibold">{{ product.product_name }}</h3>
            <p class="text-sm text-gray-600">{{ product.p_price }} USD</p>
          </RouterLink>
        </li>
        <li v-if="hasMoreResults" @click="navigateToSearchPage" class="p-4 text-blue-500 hover:underline cursor-pointer">
          Click to see all results
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
</li>
          
      </ul>
    </div>
  </transition>
  </div>

    <!-- Navigation Links -->
    <nav class="hidden lg:flex lg:items-center lg:space-x-4">
      <template v-if="auth.loggedIn">
        <RouterLink to="/my-account" class="block px-4 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/register" class="block px-4 py-2">Sign Up</RouterLink>
        <button @click="openLoginModal" class="block px-4 py-2">Login</button>
      </template>
      <RouterLink class="block px-4 py-2" to="/wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <span v-if="wishlistCount > 0"
          class="absolute inline-flex top-6 right-14 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {{ wishlistCount }}
        </span>
        </RouterLink>

      <button @click="toggleCart" class="relative block px-4 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <span v-if="cartCount > 0"
          class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{{
            cartCount }}</span>
      </button>
    </nav>
  </header>

  <!-- Mobile Menu -->
  <transition name="slide">
    <div v-if="isMenuOpen" id="mobile-menu" class="fixed inset-0 flex z-10" style="z-index: 99">
      <div class="bg-gray-900 bg-opacity-50 w-full" @click="toggleMenu"></div>
      <aside class="w-64 bg-gray-800 text-white z-20 fixed left-0 h-full overflow-y-auto">
        <!-- Mobile Menu Content -->
        <fwb-sidebar>
          <div class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
            <img class="h-12 w-12 rounded-full border-2 border-white shadow-lg" src="/8218.png_860.png"
              alt="Eshop Logo" />
            <span class="font-semibold text-xl tracking-tight">Arxidopoulos A.E.</span>
          </div>
          <fwb-sidebar-item  class="block px-4 py-2 hover:bg-gray-700">
            <RouterLink to="/offer-products" @click="toggleMenu">Hot Offers!</RouterLink>
          </fwb-sidebar-item>
          <fwb-sidebar-item  class="block px-4 py-2 hover:bg-gray-700">
            <RouterLink to="/product-list/hot-products" @click="toggleMenu">Hot Products!</RouterLink>
          </fwb-sidebar-item>
          <fwb-sidebar-item class="block px-4 py-2 hover:bg-gray-700">

          <RouterLink to="/new-products" @click="toggleMenu">New Releases</RouterLink>
        </fwb-sidebar-item>       
                <fwb-sidebar-item v-for="category in categories" :key="category._id" class="block px-4 py-2 hover:bg-gray-700">
                  <RouterLink :to="`/product-list/${category}`" @click="toggleMenu">{{ category }}</RouterLink>
                </fwb-sidebar-item>


        </fwb-sidebar>
      </aside>
    </div>
  </transition>
  <CartSideMenu :isCartOpen="isCartOpen" :toggleCart="toggleCart" />
   <transition name="modal-fade">
    <LoginModal :isVisible="isLoginModalVisible" :onClose="closeLoginModal" />
    </transition>
  <!-- Search Results -->
  <!-- <div v-if="searchResults.length" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start  z-50">
    <div class="bg-white rounded-lg shadow-md w-full max-w-3xl p-8">
      <h2 class="text-2xl font-semibold mb-4">Search Results</h2>
      <button @click="closeSearchResults" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
      <ul class="space-y-4">
        <li v-for="product in searchResults" :key="product._id" class="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 class="text-xl font-bold">{{ product.product_name }}</h3>
          <p class="text-gray-700">{{ product.description }}</p>
          <p class="text-gray-900 font-semibold">{{ product.p_price }} USD</p>
        </li>
      </ul>
     
    </div>
  </div> -->
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch, provide, inject   } from 'vue';
import { RouterLink, useRouter  } from 'vue-router';
import axios from 'axios';
import CartSideMenu from '../components/CartSideMenu.vue';
import LoginModal from '../components/LoginModal.vue';
import eventBus from '../js/eventBus';
import { FwbSidebar, FwbSidebarItemGroup, FwbSidebarItem, FwbSidebarDropdownItem } from 'flowbite-vue';
import { wishlist, fetchWishlist } from '@/js/wishlist';  // Adjust the import path accordingly
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

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
// Fetching cart count from API
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
    searchResults.value = response.data.slice(0, 10); // Limit to first 10 results
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
};
// Listening for cart updates
eventBus.on('cart-updated', (newCount) => {
  cartCount.value = newCount; // Update the cart count
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
  fetchWishlist();  // Fetch the wishlist items on mount

 
  eventBus.on('has-logged', fetchCartCount);
  const handleFocusTrap = (e) => {
    if (isMenuOpen.value && !e.target.closest('#mobile-menu')) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelector('#mobile-menu').focus();
    }
  };
  // Make sure to clean up the event listener when the component is unmounted
  onUnmounted(() => {
    eventBus.off('has-logged', fetchCartCount);
  });
  document.addEventListener('focusin', handleFocusTrap);

  return () => {
    document.removeEventListener('focusin', handleFocusTrap);
  };
});

watch(() => router.currentRoute.value.path, () => {
  isCartOpen.value = false;  // Close the cart when the route changes
  closeSearchResults();
});

const wishlistCount = computed(() => wishlist.value.length);

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  font-size: 14px;
  text-align: center;
}

nav a {
  padding: 0.5rem 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
  }
}

/* Transition for the slide effect */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Transition for the fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Transition for the modal fade effect */
.modal-fade-enter-active, .modal-fade-leave-active {
  z-index: 1000; /* Adjust this value */
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
/* Focus visible styles for accessibility */
button:focus-visible {
  outline: 2px solid white;
}
</style>
