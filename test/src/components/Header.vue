<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <button @click="toggleMenu" :aria-expanded="isMenuOpen" aria-controls="mobile-menu" class="relative group focus:outline-none">
        <div class="relative flex items-center justify-center rounded-full w-[50px] h-[50px] bg-slate-700">
          <div class="flex flex-col justify-between w-[20px] h-[14px]">
            <div class="bg-white h-[2px] w-full"></div>
            <div class="bg-white h-[2px] w-full"></div>
            <div class="bg-white h-[2px] w-full"></div>
          </div>
        </div>
      </button>
      <div class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
        <RouterLink to="/" class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
        <img class="h-12 w-12 rounded-full border-2 border-white shadow-lg" src="/8218.png_860.png" alt="Eshop Logo">
        <span class="font-semibold text-xl tracking-tight">Arxidopoulos A.E.</span>
      </RouterLink>
      </div>
    </div>
    <div class="hidden lg:flex lg:items-center lg:space-x-4 ml-4">
      <input type="text" placeholder="Search..." class="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    <nav class="hidden lg:flex lg:items-center lg:space-x-4">
      <template v-if="auth.loggedIn">
        <RouterLink to="/myaccount" class="block px-4 py-2">My Account</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/register" class="block px-4 py-2">Sign Up</RouterLink>
        <button @click="openLoginModal" class="block px-4 py-2">Login</button>
      </template>
      <button @click="toggleCart" class="relative block px-4 py-2">
        Cart
        <span v-if="cartCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{{ cartCount }}</span>
      </button>
    </nav>
  </header>

  <transition name="slide">
    <div v-if="isMenuOpen" id="mobile-menu" class="fixed inset-0 flex z-10" style='z-index: 99;'>
      <div class="bg-gray-900 bg-opacity-50 w-full" @click="toggleMenu"></div>
      <aside class="w-64 bg-gray-800 text-white z-20 fixed left-0 h-full">
        <nav class="flex flex-col space-y-2 p-4 items-center">
          <div class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
            <img class="h-12 w-12 rounded-full border-2 border-white shadow-lg" src="/8218.png_860.png" alt="Eshop Logo">
            <span class="font-semibold text-xl tracking-tight">Arxidopoulos A.E.</span>
          </div>
          <RouterLink to="/hot-products" class="block px-4 py-2" @click="toggleMenu">Hot Offers!</RouterLink>
          <RouterLink to="/new-products" class="block px-4 py-2" @click="toggleMenu">New Releases</RouterLink>
          <RouterLink to="/product-list-shirts" class="block px-4 py-2" @click="toggleMenu">Shirts</RouterLink>
          <RouterLink to="/product-list-shoes" class="block px-4 py-2" @click="toggleMenu">Shoes</RouterLink>
        </nav>
      </aside>
    </div>
  </transition>
  <CartSideMenu :isCartOpen="isCartOpen" :toggleCart="toggleCart" />
  <LoginModal :isVisible="isLoginModalVisible" :onClose="closeLoginModal" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import CartSideMenu from '../components/CartSideMenu.vue';
import LoginModal from '../components/LoginModal.vue';

const isMenuOpen = ref(false);
const isCartOpen = ref(false);
const isLoginModalVisible = ref(false);
const cartCount = ref(0);
const cartItems = ref(0);
const auth = reactive({ loggedIn: false, userId: null });

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

const fetchAuthStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/auth', { withCredentials: true });
    auth.loggedIn = response.data.loggedIn;
    auth.userId = response.data.userId;
  } catch (error) {
    console.error('Failed to fetch auth status', error);
  }
};

const fetchCartCount = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/cart-count', { withCredentials: true });
    cartCount.value = response.data.count;
  } catch (error) {
    console.error('Failed to fetch cart count', error);
  }
};
const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/cart-items', { withCredentials: true });
    cartItems.value = response.data.items;
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  }
};

onMounted(() => {
  fetchAuthStatus();
  fetchCartCount();
  fetchCartItems();
  const handleFocusTrap = (e) => {
    if (isMenuOpen.value && !e.target.closest('#mobile-menu')) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelector('#mobile-menu').focus();
    }
  };

  document.addEventListener('focusin', handleFocusTrap);

  return () => {
    document.removeEventListener('focusin', handleFocusTrap);
  };
});
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
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

/* Transition for the fade effect */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Focus visible styles for accessibility */
button:focus-visible {
  outline: 2px solid white;
}
</style>
