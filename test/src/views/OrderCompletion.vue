<template>
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen">
    <div class="grid grid-cols-1">
      <div class="lg:col-span-8 space-y-6">
        <div class="max-w-lg mx-auto bg-white p-8 rounded-lg">
          <div>
            <div class="text-2xl my-4">Your Order has been received</div>
            <div class="text-1xl my-4">
              Your Order with ID {{ order._id }} has been received and we will update
              you with a new email about the status.
            </div>
            <div class="text-1xl my-4">You will receive the receipt in your e-mail shortly.</div>
          </div>
        </div>
        <div class="max-w-lg mx-auto bg-white p-8 rounded-lg">
          <div class="max-w-lg bg-white p-8 rounded-lg">
            <div>
              <div class="text-2xl my-4">You can see the order summary below:</div>
              <div class="text-1xl my-4">
                <strong>Billing Address:</strong> {{ order.billingAddress }}, {{ order.billingCity }},
                {{ order.billingZip }}, {{ order.billingCountry }}
              </div>
              <div class="text-1xl my-4">
                <strong>Shipping Address:</strong> {{ order.address }}, {{ order.city }},
                {{ order.zip }}, {{ order.country }}
              </div>
              <div class="text-1xl my-4">
                <strong>Delivery Method:</strong> {{ order.deliveryMethod }}
              </div>
              <div class="text-1xl my-4">
                <strong>Payment Method:</strong> {{ order.paymentMethod }}
              </div>
              <div class="text-1xl my-4">
                <strong>Items:</strong>
                <ul>
                  <li v-for="item in order.items" :key="item.productId">
                    {{ item.name }} - {{ item.quantity }} x ${{ item.price }}
                  </li>
                </ul>
              </div>
              <div class="text-1xl my-4">
                <strong>Total:</strong> ${{ total }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderCompletionPage',
  data() {
    return {
      order: {},
      total: 0
    };
  },
  async created() {
    const orderId = this.$route.params.orderId; // Assuming you're passing the order ID in the route params
    try {
      const response = await axios.get(`http://localhost:5174/api/order/66b3ff2fce888f1acb1e29d1`);
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
};
</script>
