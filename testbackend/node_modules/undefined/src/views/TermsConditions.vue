<template>
    <div class="flex dark:bg-gray-900 min-h-screen">
      <!-- Sidebar -->
      <CompanySidebar />
  
      <!-- Main Content -->
      <section class="flex-1 py-16 px-6">
        <div class="container mx-auto px-6">
            <!-- Header -->
            <div class="text-center mb-12">
              <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white">
                Terms and Conditions
              </h1>
              <p class="text-lg text-gray-700 dark:text-gray-300 mt-4">
                Please read these Terms and Conditions ("Terms") carefully before using our website.
              </p>
            </div>
  
            <!-- Terms Content -->
            <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
              <!-- Section 1: Introduction -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Introduction
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  Welcome to [Your Company Name]! By accessing or using our website, you agree to
                  be bound by these Terms. If you disagree with any part of these Terms, please
                  discontinue use of our website.
                </p>
              </div>
  
              <!-- Divider -->
              <hr class="border-gray-300 dark:border-gray-700 my-8" />
  
              <!-- Section 2: Use of the Website -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Use of the Website
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  You agree to use the website only for lawful purposes and in a manner that does
                  not infringe on the rights of others or restrict their use and enjoyment of the
                  website. Prohibited behaviors include:
                </p>
                <ul class="list-disc list-inside mt-4 text-gray-700 dark:text-gray-400">
                  <li>Engaging in any fraudulent activity.</li>
                  <li>Distributing harmful software, such as viruses.</li>
                  <li>Violating applicable laws or regulations.</li>
                </ul>
              </div>
  
              <!-- Divider -->
              <hr class="border-gray-300 dark:border-gray-700 my-8" />
  
              <!-- Section 3: Intellectual Property -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Intellectual Property
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  All content on this website, including text, images, logos, and designs, is the
                  property of [Your Company Name] or its licensors. You may not copy, reproduce,
                  distribute, or use any content without prior written consent from us.
                </p>
              </div>
  
              <!-- Divider -->
              <hr class="border-gray-300 dark:border-gray-700 my-8" />
  
              <!-- Section 4: Products and Services -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Products and Services
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  We strive to display accurate information about our products and services, but we
                  do not guarantee that descriptions, pricing, or availability are free from errors.
                </p>
                <p class="text-gray-700 dark:text-gray-400 mt-4">
                  We reserve the right to:
                </p>
                <ul class="list-disc list-inside mt-4 text-gray-700 dark:text-gray-400">
                  <li>Modify or discontinue products or services without notice.</li>
                  <li>Cancel or limit orders if errors are found.</li>
                </ul>
              </div>
  
              <!-- Divider -->
              <hr class="border-gray-300 dark:border-gray-700 my-8" />
  
              <!-- Section 5: Limitation of Liability -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Limitation of Liability
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  To the extent permitted by law, [Your Company Name] will not be held liable for
                  any direct, indirect, incidental, or consequential damages resulting from your
                  use of the website or our products.
                </p>
              </div>
  
              <!-- Divider -->
              <hr class="border-gray-300 dark:border-gray-700 my-8" />
  
              <!-- Section 6: Changes to Terms -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Changes to Terms
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  We reserve the right to update these Terms at any time. Changes will be effective
                  immediately upon posting on this page. Your continued use of the website
                  constitutes your acceptance of the updated Terms.
                </p>
              </div>
  
              <!-- Divider -->
              <hr class="border-gray-300 dark:border-gray-700 my-8" />
  
              <!-- Section 7: Governing Law -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Governing Law
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  These Terms are governed by the laws of [Your Country/Region]. Any disputes will
                  be resolved in accordance with the applicable laws and jurisdiction.
                </p>
              </div>
  
              <!-- Divider -->
              <hr class="border-gray-300 dark:border-gray-700 my-8" />
  
              <!-- Section 8: Contact Us -->
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Contact Us
                </h2>
                <p class="text-gray-700 dark:text-gray-400">
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul class="mt-4 text-gray-700 dark:text-gray-400">
                  <li><strong>Email:</strong> support@yourcompany.com</li>
                  <li><strong>Phone:</strong> +1-234-567-890</li>
                  <li><strong>Address:</strong> 1234 Business Street, City, Country</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
  
      <!-- Footer below the main row -->
      <Footer />
  </template>
  
  <script setup>
  import CompanySidebar from "@/components/CompanySidebar.vue";
  import Footer from "@/components/Footer.vue";
  </script>
  
  <style scoped>
  /* 
    No forced heights unless desired. 
    .min-h-screen ensures the container is at least full window height, 
    so the footer appears at the bottom if there's not much content.
  */
  </style>
  