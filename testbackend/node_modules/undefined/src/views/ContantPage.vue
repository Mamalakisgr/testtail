<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <!-- Page Header -->
      <header class="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl font-extrabold">Contact Us</h1>
          <p class="text-lg mt-4">We’re here to help. Reach out to us anytime!</p>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="flex-1">
        <div class="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Contact Form -->
             <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition duration-300"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition duration-300"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition duration-300"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="isSending"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
            >
              {{ isSending ? "Sending..." : "Send Message" }}
            </button>
          </form>
        </div>
          <!-- Additional Contact Info -->
          <div class="space-y-8">
            <!-- Location -->
            <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Location</h3>
              <p class="text-gray-700 dark:text-gray-400">1234 Business Street, City, Country</p>
              <iframe
                class="w-full h-64 mt-4 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0223859854755!2d-122.40641778468166!3d37.78563497975754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808dc567ac97%3A0xf7a5a0c6d21c43c6!2sGoogle!5e0!3m2!1sen!2sus!4v1633568479834!5m2!1sen!2sus"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
  
            <!-- Customer Support -->
            <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Customer Support</h3>
              <ul class="text-gray-700 dark:text-gray-400 space-y-2">
                <li>
                  <strong>Email:</strong> support@yourecommerce.com
                </li>
                <li>
                  <strong>Phone:</strong> +1-234-567-890
                </li>
                <li>
                  <strong>Hours:</strong> Mon - Fri, 9 AM - 6 PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer/>
  </template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { backendUrl } from '@/js/index'; // Adjust the path if necessary
import Footer from "@/components/Footer.vue";
const form = reactive({
  name: "",
  email: "",
  message: "",
});

const isSending = ref(false);

async function handleSubmit() {
  isSending.value = true;

  try {
    const response = await axios.post(`${backendUrl}/api/contact`, {
      name: form.name,
      email: form.email,
      message: form.message,
    });

    if (response.data.success) {
      alert("Your message has been sent successfully!");
      form.name = "";
      form.email = "";
      form.message = "";
    } else {
      alert("Failed to send your message. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while sending your message. Please try again later.");
  } finally {
    isSending.value = false;
  }
}
</script>
