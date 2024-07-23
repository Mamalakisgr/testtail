<template>
  <div class="container mx-auto p-6 shadow-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 lg:pt-12">

      <!-- Billing Form, Payment Selector, and Payment -->
      <div class="lg:col-span-8 space-y-6">
        <BillingForm
          :formData="formData"
          :sameAsBilling.sync="sameAsBilling"
          :saveInfo.sync="saveInfo"
          @submit="submitForm"
          @toggle-shipping-address="toggleShippingAddress"
        />
        <Delivery />
        <PaymentSelector />
        <Payment @handle-card="handleCard" @change-parent="handleAlert" :total="total"></Payment>
        <Summary :items="items"></Summary>
        <button @click="finishPayment" class="w-full text-ceenter px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">
        Finish payment
       </button>
        <Alert :visible="alertVisible" position="top-right" color="success" title="Success"
          description="Your payment has been successfully processed." />
      </div>
            <!-- Summary -->
            <div class="lg:col-span-4">
        <div class="sticky top-20">
          <OrderSynopsis></OrderSynopsis>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
import Payment from "../components/Payment.vue";
import Summary from "../components/Summary.vue";
import Alert from "../components/Alert.vue";
import Delivery from "../components/Delivery.vue";
import BillingForm from "../components/BillingForm.vue";
import PaymentSelector from "../components/PaymentSelector.vue";
import OrderSynopsis from "../components/OrderSynopsys.vue";

import axios from 'axios';

export default {
  name: "CheckoutPage",
  components: {
    Payment,
    Summary,
    Alert,
    Delivery,
    BillingForm,
    PaymentSelector,
    OrderSynopsis
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        region: '',
        nameOnCard: '',
        cardNumber: '',
        expiration: '',
        cvv: ''
      },
      sameAsBilling: false,
      saveInfo: false,
      submitted: false,
      submittedData: {},
      items: [],
      alertVisible: false,
      total: 0,
      isCard: false,
      deliveryMethod: 'courier',
      paymentMethod: 'courier'
    };
  },
  async mounted() {
    await this.fetchCartItems();
    this.getTotal();
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await axios.get('http://localhost:5174/api/cart-items', { withCredentials: true });
        this.items = response.data.items;
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    },
    submitForm() {
      console.log('Form submitted:', this.formData);
      // Add your form submission logic here
      this.submitted = true;
      this.submittedData = { ...this.formData };
    },
    toggleShippingAddress() {
      if (this.sameAsBilling) {
        // If checked, copy billing address to shipping address
        console.log('Copying billing address to shipping address');
      } else {
        // If unchecked, clear shipping address
        console.log('Clearing shipping address');
      }
    },
    getTotal() {
      this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    },
    handleAlert() {
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 4000);
    },
    handleCard() {
      this.isCard = true;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
