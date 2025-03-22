<template>
  <div class="flex dark:bg-gray-900 min-h-screen">
    <!-- Sidebar -->
    <CompanySidebar />

    <!-- Main Content -->
    <main class="flex-1 px-4 py-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section with Parallax Effect -->
        <transition name="fade">
          <section
            v-if="showContent"
            id="about"
            class="relative h-[60vh] rounded-2xl overflow-hidden mb-12 group"
            style="background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg');"
          >
            <div class="absolute inset-0 bg-cover bg-center bg-fixed transform group-hover:scale-105 transition-transform duration-700"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
            
            <div class="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Welcome to Our Company
              </h1>
              <p class="text-xl text-gray-200 mb-8 max-w-2xl">
                Discover who we are and what we offer. Leading innovation in fashion retail since 2010.
              </p>
              <div class="flex space-x-4">
                <button class="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Learn More
                </button>
                <button class="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </section>
        </transition>

        <!-- About Section with Animation -->
        <section id="company" class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              About the Company
            </h2>
            <div class="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
              <img
                src="/public/store-out.webp"
                alt="Company Overview"
                class="relative rounded-xl shadow-2xl w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            <div class="space-y-6">
              <h3 class="text-3xl font-bold text-gray-800 dark:text-white">
                Our Vision & Mission
              </h3>
              <div class="space-y-4">
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We are a company dedicated to providing the best products and services to our
                  customers. Our mission is to innovate and lead in the industry, ensuring
                  satisfaction and excellence in everything we do.
                </p>
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Established in 2010, we have grown from a small startup to a leading player in
                  the market. Our commitment to quality and customer care drives us forward, and
                  we are constantly exploring new opportunities to expand and improve.
                </p>
              </div>
              <div class="grid grid-cols-3 gap-6 mt-8">
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Stores Worldwide</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1M+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Stores Section with Enhanced Cards -->
        <section id="stores" class="py-12">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Our Stores
            </h2>
            <div class="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="store in stores"
              :key="store.id"
              class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  :src="store.image"
                  :alt="store.name"
                  class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div class="p-6 relative">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {{ store.name }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ store.description }}
                </p>
                <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import CompanySidebar from "@/components/CompanySidebar.vue";
import Footer from "@/components/Footer.vue";

const showContent = ref(false);
const stores = ref([
  { 
    id: 1,
    name: "Downtown Flagship Store",
    description: "Our premier location featuring the latest collections and exclusive items.",
    image: "/public/store1.jpg"
  },
  {
    id: 2,
    name: "Shopping Mall Outlet",
    description: "Conveniently located in the heart of the city's largest mall.",
    image: "/public/store2.webp"
  },
  {
    id: 3,
    name: "Boutique Store",
    description: "An intimate shopping experience with personalized service.",
    image: "/public/store3.jpg"
  },
]);

onMounted(() => {
  setTimeout(() => {
    showContent.value = true;
  }, 500);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom aspect ratio */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>