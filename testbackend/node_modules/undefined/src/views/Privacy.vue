<template>
  <div class="flex dark:bg-gray-900 min-h-screen">
    <!-- Sidebar -->
    <CompanySidebar />

    <!-- Main Content -->
    <section
      class=" m-10 border border-gray-300 dark:border-gray-700 rounded-lg py-16 px-6 flex-1 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900"
    >
      <div class="container mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p class="text-lg text-gray-700 dark:text-gray-300">
            Your privacy matters to us. Learn how we handle your data with care.
          </p>
        </div>

        <!-- Policy Content -->
        <div class="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <!-- Section 1 -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <p class="text-gray-700 dark:text-gray-400">
              We may collect the following types of information about you:
            </p>
            <ul class="list-disc list-inside mt-4 text-gray-700 dark:text-gray-400">
              <li><strong>Personal Information:</strong> Your name, email, phone number, and address.</li>
              <li><strong>Payment Information:</strong> Secure payment details via our processors.</li>
              <li><strong>Usage Information:</strong> Data like IP address and browser type.</li>
            </ul>
          </div>

          <!-- Divider -->
          <hr class="border-gray-300 dark:border-gray-700 my-8" />

          <!-- Section 2 -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p class="text-gray-700 dark:text-gray-400">
              We use your information for:
            </p>
            <ul class="list-disc list-inside mt-4 text-gray-700 dark:text-gray-400">
              <li>Processing and fulfilling your orders.</li>
              <li>Communicating updates about your account or purchases.</li>
              <li>Improving our website, services, and offerings.</li>
              <li>Complying with legal obligations.</li>
            </ul>
          </div>

          <!-- Divider -->
          <hr class="border-gray-300 dark:border-gray-700 my-8" />

          <!-- Section 3 -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sharing Your Information
            </h2>
            <p class="text-gray-700 dark:text-gray-400">
              Your data may be shared with:
            </p>
            <ul class="list-disc list-inside mt-4 text-gray-700 dark:text-gray-400">
              <li><strong>Service Providers:</strong> Payment processors and analytics tools.</li>
              <li><strong>Legal Obligations:</strong> When required to comply with the law.</li>
              <li><strong>Business Transfers:</strong> In case of mergers or acquisitions.</li>
            </ul>
          </div>

          <!-- Divider -->
          <hr class="border-gray-300 dark:border-gray-700 my-8" />

          <!-- Section 4 -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <p class="text-gray-700 dark:text-gray-400">
              Depending on your location, you may have rights such as:
            </p>
            <ul class="list-disc list-inside mt-4 text-gray-700 dark:text-gray-400">
              <li>Accessing your personal information.</li>
              <li>Requesting corrections to your data.</li>
              <li>Requesting deletion of your data.</li>
              <li>Opting out of marketing communications.</li>
            </ul>
          </div>

          <!-- Divider -->
          <hr class="border-gray-300 dark:border-gray-700 my-8" />

          <!-- Section 5 -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Security
            </h2>
            <p class="text-gray-700 dark:text-gray-400">
              We employ strict security measures to protect your data. However, no system is completely secure, and we encourage you to safeguard your own data.
            </p>
          </div>

          <!-- Divider -->
          <hr class="border-gray-300 dark:border-gray-700 my-8" />

          <!-- Section 6 -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p class="text-gray-700 dark:text-gray-400">
              If you have any questions or concerns, feel free to reach out:
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
  <Footer />
</template>


<script setup>
import Footer from '@/components/Footer.vue';
import CompanySidebar from '@/components/CompanySidebar.vue';
/* Material Icons are used for section icons. Add their link in the <head> of your project:
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
*/
</script>

<style scoped>
/* Prose styling for better readability */
.prose {
  line-height: 1.8;
}
</style>
