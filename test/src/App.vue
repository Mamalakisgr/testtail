<template>
  <div id="app">
    <component :is="currentHeader" />
    <router-view />
    <Notification message="Product has been added to cart" duration="1000" />
    <WishlistNotification message="Product has been added to wishlist" duration="1000"/>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import BackofficeHeader from './components/BackofficeHeader.vue';
import Notification from './components/Notification.vue';
import { ref, reactive, onMounted, onUnmounted, computed, watch, provide   } from 'vue';
import eventBus from './js/eventBus';
import axios from 'axios';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary
import WishlistNotification from './components/WishlistNotification.vue';
const auth = reactive({ loggedIn: false, userId: null });

const route = useRoute();
provide('auth', auth);

const currentHeader = computed(() => {
  return route.meta.requiresBackofficeHeader ? BackofficeHeader : Header;
});

const fetchAuthStatus = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/auth`, { withCredentials: true });
    
    auth.loggedIn = response.data.loggedIn;
    auth.userId = response.data.userId;
  } catch (error) {
    console.error('Failed to fetch auth status', error);
  }
};

onMounted(() => {
  fetchAuthStatus();
  eventBus.on('has-logged', fetchAuthStatus);
  })

  onUnmounted(() => {
    eventBus.off('has-logged', fetchAuthStatus);
    eventBus.off('has-logged', fetchCartCount);
  });
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>