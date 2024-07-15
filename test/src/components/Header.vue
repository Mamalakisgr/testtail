<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <button
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        class="relative group focus:outline-none"
      >
        <div
          class="relative flex items-center justify-center rounded-full w-[50px] h-[50px] bg-slate-700"
        >
          <div class="flex flex-col justify-between w-[20px] h-[14px]">
            <div class="bg-white h-[2px] w-full"></div>
            <div class="bg-white h-[2px] w-full"></div>
            <div class="bg-white h-[2px] w-full"></div>
          </div>
        </div>
      </button>
      <div class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
        <RouterLink to="/" class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
          <img
            class="h-12 w-12 rounded-full border-2 border-white shadow-lg"
            src="/8218.png_860.png"
            alt="Eshop Logo"
          />
          <span class="font-semibold text-xl tracking-tight">Arxidopoulos A.E.</span>
        </RouterLink>
      </div>
    </div>
    <div class="hidden lg:flex lg:items-center lg:space-x-4 ml-4">
      <input
        type="text"
        placeholder="Search..."
        class="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <nav class="hidden lg:flex lg:items-center lg:space-x-4">
      <template v-if="auth.loggedIn">
        <RouterLink to="/myaccount" class="block px-4 py-2"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/register" class="block px-4 py-2">Sign Up</RouterLink>
        <button @click="openLoginModal" class="block px-4 py-2">Login</button>
      </template>
      <RouterLink to="/wishlist" class="block px-4 py-2"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </RouterLink>
      <button @click="toggleCart" class="relative block px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        <span
          v-if="cartCount > 0"
          class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
          >{{ cartCount }}</span
        >
      </button>


    </nav>
  </header>

  <transition name="slide">
    <div v-if="isMenuOpen" id="mobile-menu" class="fixed inset-0 flex z-10" style="z-index: 99">
      <div class="bg-gray-900 bg-opacity-50 w-full" @click="toggleMenu"></div>
      <aside class="w-64 bg-gray-800 text-white z-20 fixed left-0 h-full">
        <nav class="flex flex-col space-y-2 p-4 items-center">
          <div class="flex-shrink-0 flex items-center justify-center p-[2px] space-x-4">
            <img
              class="h-12 w-12 rounded-full border-2 border-white shadow-lg"
              src="/8218.png_860.png"
              alt="Eshop Logo"
            />
            <span class="font-semibold text-xl tracking-tight">Arxidopoulos A.E.</span>
          </div>
          <RouterLink to="/hot-products" class="block px-4 py-2" @click="toggleMenu"
            >Hot Offers!</RouterLink
          >
          <RouterLink to="/new-products" class="block px-4 py-2" @click="toggleMenu"
            >New Releases</RouterLink
          >
          <RouterLink to="/product-list-shirts" class="block px-4 py-2" @click="toggleMenu"
            >Shirts</RouterLink
          >
          <RouterLink to="/product-list-shoes" class="block px-4 py-2" @click="toggleMenu"
            >Shoes</RouterLink
          >
          <div class="relative group">
            <div class="block px-4 py-2 cursor-pointer">Categories</div>
            <ul
              class="w-64 bg-gray-800 text-white z-20 fixed left-0 h-full shadow-lg hidden group-hover:block"
            >
              <li
                v-for="category in categories"
                :key="category._id"
                class="px-4 py-2 hover:bg-gray-700"
              >
                <RouterLink :to="`/product-list/${category}`" @click="toggleMenu">{{
                  category
                }}</RouterLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  </transition>
  <CartSideMenu :isCartOpen="isCartOpen" :toggleCart="toggleCart" />
  <LoginModal :isVisible="isLoginModalVisible" :onClose="closeLoginModal" />
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import CartSideMenu from '../components/CartSideMenu.vue'
import LoginModal from '../components/LoginModal.vue'
import eventBus from '../js/eventBus'
const categories = ref([])
const isMenuOpen = ref(false)
const isCartOpen = ref(false)
const isLoginModalVisible = ref(false)
const cartCount = ref(0)
const cartItems = ref(0)
const auth = reactive({ loggedIn: false, userId: null })

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const openLoginModal = () => {
  isLoginModalVisible.value = true
}

const closeLoginModal = () => {
  isLoginModalVisible.value = false
}

const fetchAuthStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/auth', { withCredentials: true })
    auth.loggedIn = response.data.loggedIn
    auth.userId = response.data.userId
  } catch (error) {
    console.error('Failed to fetch auth status', error)
  }
}

const fetchCartCount = () => {
  axios
    .get('http://localhost:5174/api/cart-count', { withCredentials: true })
    .then((response) => {
      cartCount.value = response.data.count
    })
    .catch((error) => {
      console.error('Failed to fetch cart count', error)
    })
}
const fetchCartItems = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/cart-items', {
      withCredentials: true
    })
    cartItems.value = response.data.items
  } catch (error) {
    console.error('Failed to fetch cart items', error)
  }
}
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5174/api/categories')
    categories.value = response.data
  } catch (error) {
    console.error('Failed to fetch categories', error)
  }
}
eventBus.on('product-added', (newCount) => {
  cartCount.value = newCount
})
eventBus.on('product-removed', (newCount) => {
  cartCount.value = newCount
})

onMounted(() => {
  fetchAuthStatus()
  fetchCartCount()
  fetchCategories()
  fetchCartItems()
  eventBus.on('has-logged', fetchAuthStatus)
  eventBus.on('has-logged', fetchCartCount)
  const handleFocusTrap = (e) => {
    if (isMenuOpen.value && !e.target.closest('#mobile-menu')) {
      e.preventDefault()
      e.stopPropagation()
      document.querySelector('#mobile-menu').focus()
    }
  }
  // Make sure to clean up the event listener when the component is unmounted
  onUnmounted(() => {
    eventBus.off('has-logged', fetchAuthStatus)
    eventBus.off('has-logged', fetchCartCount)
  })
  document.addEventListener('focusin', handleFocusTrap)

  return () => {
    document.removeEventListener('focusin', handleFocusTrap)
  }
})
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
