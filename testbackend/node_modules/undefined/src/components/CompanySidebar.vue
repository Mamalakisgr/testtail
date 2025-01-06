<template>
    <aside
      class="sticky top-[10rem] max-h-[30vh] bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 overflow-y-auto flex flex-col mx-4 mt-12"
    >
      <!-- Menu Section -->
      <div class="flex-1 p-6">
        <x-menu>
          <x-tree>
            <x-control>
              <!-- Company Profile -->
              <x-control name="Company Profile">
                <router-link
                  to="/company-profile"
                  class="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Company Profile
                </router-link>
              </x-control>
              <!-- History -->
              <x-control name="History">
                <router-link
                  to="/company-history"
                  class="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  History
                </router-link>
              </x-control>
              <!-- Privacy Policy -->
              <x-control name="Privacy Policy">
                <router-link
                  to="/privacy"
                  class="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </router-link>
              </x-control>
              <!-- Licensing -->
              <x-control name="Licensing">
                <router-link
                  to="/licensing"
                  class="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Licensing
                </router-link>
              </x-control>
              <!-- Terms & Conditions -->
              <x-control name="Terms & Conditions">
                <router-link
                  to="/terms-conditions"
                  class="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Terms & Conditions
                </router-link>
              </x-control>
            </x-control>
          </x-tree>
        </x-menu>
      </div>
    </aside>
  </template>
  
  <script setup>
  // No additional script logic needed
  </script>
  
  <style scoped>
  /* Optional: Add custom spacing adjustments if necessary */
  </style>
  