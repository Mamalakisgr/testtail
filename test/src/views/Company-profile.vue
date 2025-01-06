<template>
    <div class="flex dark:bg-gray-900 min-h-screen">
      <!-- Sidebar -->
      <CompanySidebar />
  
      <!-- Main Content -->
      <section class="flex-1 px-4 py-8">
        <div class="border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg p-6">
          <!-- Hero Section -->
          <transition name="fade">
            <section
              v-if="showContent"
              id="about"
              class="about bg-cover bg-center min-h-[50vh] flex items-center justify-center px-4 relative"
              style="background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg');"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-70"></div>
              <div class="relative max-w-3xl text-center z-10">
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Welcome to Our Company
                </h1>
                <p class="text-lg text-gray-300 mb-6">
                  Discover who we are and what we offer.
                </p>

              </div>
            </section>
          </transition>
  
          <!-- About the Company Section -->
          <section id="company" class="py-8 ">
            <div class="dark:bg-gray-900">
            <h2 class="text-3xl font-bold text-center   text-gray-900 dark:text-white mb-12">
              About the Company
            </h2>
        </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <!-- Image -->
              <img
                src="/public/store-out.webp"
                alt="Company Overview"
                class="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <!-- Text Content -->
              <div>
                <h3 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Our Vision & Mission
                </h3>
                <p class="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
                  We are a company dedicated to providing the best products and services to our
                  customers. Our mission is to innovate and lead in the industry, ensuring
                  satisfaction and excellence in everything we do.
                </p>
                <p class="text-gray-700 dark:text-gray-400 leading-relaxed">
                  Established in 2010, we have grown from a small startup to a leading player in
                  the market. Our commitment to quality and customer care drives us forward, and
                  we are constantly exploring new opportunities to expand and improve.
                </p>
              </div>
            </div>
          </section>
  
          <!-- Stores Section -->
          <section id="stores" class="py-8">
            <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Our Stores
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div
                v-for="store in stores"
                :key="store.id"
                class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  :src="store.image"
                  alt="Store Image"
                  class="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                />
                <div class="p-6">
                  <h5 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {{ store.name }}
                  </h5>
                  <p class="text-gray-700 dark:text-gray-400 leading-relaxed">
                    {{ store.description }}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
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
    name: "Store 1",
    description: "Located downtown.",
    image: "/public/store1.jpg" // note the leading slash
  },
  {
    id: 2,
    name: "Store 2",
    description: "Convenient location.",
    image: "/public/store2.webp"
  },
  {
    id: 3,
    name: "Store 3",
    description: "Exclusive deals.",
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
/* Custom fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>