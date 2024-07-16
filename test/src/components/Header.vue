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
    <div class="hidden lg:flex lg:items-center lg:space-x-4 ml-4">
      <input type="text" placeholder="Search..."
        class="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <!-- Navigation Links -->
    <nav class="hidden lg:flex lg:items-center lg:space-x-4">
      <template v-if="auth.loggedIn">
        <RouterLink to="/myaccount" class="block px-4 py-2">
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
      <aside class="w-64 bg-gray-800 text-white z-20 fixed left-0 h-full">
        <fwb-sidebar>
          <div class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
            <img class="h-12 w-12 rounded-full border-2 border-white shadow-lg" src="/8218.png_860.png"
              alt="Eshop Logo" />
            <span class="font-semibold text-xl tracking-tight">Arxidopoulos A.E.</span>
          </div>
          <fwb-sidebar-item  class="block px-4 py-2 hover:bg-gray-700">
            <RouterLink to="/offer-products" @click="toggleMenu">Hot Offers!</RouterLink>
          </fwb-sidebar-item>
          <fwb-sidebar-item class="block px-4 py-2 hover:bg-gray-700">

          <RouterLink to="/new-products" @click="toggleMenu">New Releases</RouterLink>
        </fwb-sidebar-item>
        <fwb-sidebar-item class="block px-4 py-2 hover:bg-gray-700">
          <RouterLink to="/product-list-shirts" @click="toggleMenu">Shirts</RouterLink>
        </fwb-sidebar-item>
          <fwb-sidebar-item class="block px-4 py-2 hover:bg-gray-700">
             <RouterLink to="/product-list-shoes" @click="toggleMenu"><template #default>Shoes</template></RouterLink>
             </fwb-sidebar-item>
            
                <fwb-sidebar-item v-for="category in categories" :key="category._id" class="block px-4 py-2 hover:bg-gray-700">
                  <RouterLink :to="`/product-list/${category}`" @click="toggleMenu">{{ category }}</RouterLink>
                </fwb-sidebar-item>

          <fwb-sidebar-item-group border>
            <fwb-sidebar-item  class="block px-4 py-2 hover:bg-gray-700">
              <template #icon>
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20">
                  <path
                    d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                </svg>
              </template>
              <template #default>Our Stores</template>
            </fwb-sidebar-item>
            <fwb-sidebar-item  class="block px-4 py-2 hover:bg-gray-700">
              <template #icon>
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path
                    d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
              </template>
              <template #default>About us</template>
            </fwb-sidebar-item>
            <fwb-sidebar-item  class="block px-4 py-2 hover:bg-gray-700">
              <template #icon">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
                  <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z" />
                </svg>
              </template>
              <template #default>Account Page</template>
            </fwb-sidebar-item>
            <fwb-sidebar-item  class="block px-4 py-2 hover:bg-gray-700">
              <template #icon>
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 21">
                  <path
                    d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z" />
                </svg>
              </template>
              <template #default>Help</template>
            </fwb-sidebar-item>
          </fwb-sidebar-item-group>
        </fwb-sidebar>
      </aside>
    </div>
  </transition>
  <CartSideMenu :isCartOpen="isCartOpen" :toggleCart="toggleCart" />
  <LoginModal :isVisible="isLoginModalVisible" :onClose="closeLoginModal" />
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import CartSideMenu from '../components/CartSideMenu.vue';
import LoginModal from '../components/LoginModal.vue';
import eventBus from '../js/eventBus';
import { FwbSidebar, FwbSidebarItemGroup, FwbSidebarItem, FwbSidebarDropdownItem } from 'flowbite-vue';
import { wishlist, fetchWishlist } from '@/js/wishlist';  // Adjust the import path accordingly

const categories = ref([]);
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

const fetchCartCount = () => {
  axios
    .get('http://localhost:5174/api/cart-count', { withCredentials: true })
    .then((response) => {
      cartCount.value = response.data.count;
    })
    .catch((error) => {
      console.error('Failed to fetch cart count', error);
    });
};

const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/cart-items', {
      withCredentials: true,
    });
    cartItems.value = response.data.items;
  } catch (error) {
    console.error('Failed to fetch cart items', error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

eventBus.on('product-added', (newCount) => {
  cartCount.value = newCount;
});
eventBus.on('product-removed', (newCount) => {
  cartCount.value = newCount;
});

onMounted(() => {
  fetchAuthStatus();
  fetchCartCount();
  fetchCategories();
  fetchCartItems();
  fetchWishlist();  // Fetch the wishlist items on mount

  eventBus.on('has-logged', fetchAuthStatus);
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
    eventBus.off('has-logged', fetchAuthStatus);
    eventBus.off('has-logged', fetchCartCount);
  });
  document.addEventListener('focusin', handleFocusTrap);

  return () => {
    document.removeEventListener('focusin', handleFocusTrap);
  };
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

/* Focus visible styles for accessibility */
button:focus-visible {
  outline: 2px solid white;
}
</style>
