<template>
  <section class="bg-gray-50 py-12 dark:bg-gray-900 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-green-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4">
          Thank you for your order!
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Your order with ID <strong>{{ order._id }}</strong> has been received.
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          We will send you an email with the details shortly.
        </p>
      </div>

      <div class="mt-8 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
        <h3 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Order Summary
        </h3>

        <div class="text-gray-700 dark:text-gray-300">
          <p class="mb-2">
            <strong>Billing Name:</strong> {{ order.billingFirstName }} {{ order.billingLastName }}
          </p>
          <p class="mb-2">
            <strong>Billing Address:</strong> {{ order.billingAddress }}, {{ order.billingCity }}, {{ order.billingZip }}, {{ order.billingCountry }}
          </p>
          <p class="mb-2">
            <strong>Shipping Name:</strong> {{ order.firstName }} {{ order.lastName }}
          </p>
          <p class="mb-2">
            <strong>Shipping Address:</strong> {{ order.address }}, {{ order.city }}, {{ order.zip }}, {{ order.country }}
          </p>
          <p class="mb-2">
            <strong>Delivery Method:</strong> {{ order.deliveryMethod }}
          </p>
          <p class="mb-2">
            <strong>Payment Method:</strong> {{ order.paymentMethod }}
          </p>

          <div class="mt-4">
            <strong>Items:</strong>
            <ul class="mt-2 space-y-2">
              <li
                v-for="item in order.items"
                :key="item.productId"
                class="flex justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-lg"
              >
                <span>{{ item.name }} (x{{ item.quantity }})</span>
                <span>${{ item.price.toFixed(2) }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-4 border-t pt-4 text-lg font-semibold">
            <strong>Total:</strong> ${{ total.toFixed(2) }}
          </div>
        </div>
      </div>

      <div class="mt-6 text-center">
        <router-link to="/" class="text-blue-600 dark:text-blue-400 hover:underline">
          Continue Shopping
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

export default {
  name: 'OrderCompletionPage',
  data() {
    return {
      order: {},
      total: 0
    };
  },
  async created() {
    const orderId = this.$route.params.orderId; // Accessing orderId from route params
    if (!orderId) {
      console.error('Order ID is missing from route params');
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/${orderId}`);
      this.order = response.data;
      this.calculateTotal();
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  },
  methods: {
    calculateTotal() {
      this.total = this.order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  }
};;
</script>
