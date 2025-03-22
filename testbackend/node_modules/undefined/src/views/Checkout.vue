<template>
  <!-- Full-page dark background -->
  <div class="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto p-6 sm:p-10 bg-gray-900 text-white rounded-xl shadow-xl transition">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- Left Side -->
      <div class="lg:col-span-8 space-y-10">
        <ShippingForm
          ref="ShippingForm"
          v-model:sameAsShipping="sameAsShipping"
          v-model:saveInfo="saveInfo"
          :formData="formData"
          @submit="handleFormSubmit"
          @toggle-shipping-address="toggleShippingAddress"
        />

        <!-- Billing Address Form -->
        <!-- Billing Form -->
        <div v-if="!sameAsShipping" class="max-w-2xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg border border-gray-700 shadow-md">
          <h2 class="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
            Billing Address
          </h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                v-model="formData.billingFirstName"
                placeholder="Billing First Name"
                class="form-input"
              />
              <input
                type="text"
                v-model="formData.billingLastName"
                placeholder="Billing Last Name"
                class="form-input"
              />
            </div>
            <input
              type="email"
              v-model="formData.billingEmail"
              placeholder="Billing Email"
              class="form-input w-full"
            />
            <input
              type="text"
              v-model="formData.billingAddress"
              placeholder="Billing Address"
              class="form-input w-full"
            />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                v-model="formData.billingCity"
                placeholder="Billing City"
                class="form-input"
              />
              <input
                type="text"
                v-model="formData.billingZip"
                placeholder="Billing Zip Code"
                class="form-input"
              />
            </div>
            <input
              type="text"
              v-model="formData.billingCountry"
              placeholder="Billing Country"
              class="form-input w-full"
            />
          </div>
        </div>

        <!-- Delivery, Payment, Summary -->
        <Delivery v-model="formData.deliveryMethod" />
        <PaymentSelector v-model="formData.paymentMethod" />
        <Summary :items="items" :deliveryOption="formData.deliveryMethod" />

        <!-- CTA -->
        <button
          @click="finishPayment"
          type="button"
          class="w-full px-5 py-3 text-lg bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-white rounded-lg font-semibold shadow transition-all"
        >
          Finish payment
        </button>

        <!-- Alerts -->
        <Alert
          :visible="alertVisible"
          position="top-right"
          :color="alertColor"
          :title="alertTitle"
          :description="alertDescription"
        />
      </div>

      <!-- Right Side: Order Summary -->
      <div class="lg:col-span-4">
        <div class="sticky top-24">
          <OrderSynopsis
            :deliveryOption="formData.deliveryMethod"
            :totalPrice="formData.totalPrice"
            :originalPrice="formData.originalPrice"
            :savings="formData.savings"
            :deliveryPickup="formData.deliveryPickup"
            :tax="formData.tax"
            @update:totalPrice="updateTotalPrice"
          />
        </div>
      </div>
    </div>
  </div>
    <!-- Modal -->
    <div
      v-if="isCreditCardModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full relative mx-4"
      >
        <Payment @paymentSuccess="handlePaymentSuccess" />
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>



<script>
import Payment from "../components/Payment.vue";
import Summary from "../components/Summary.vue";
import Alert from "../components/Alert.vue";
import Delivery from "../components/Delivery.vue";
import ShippingForm from "../components/BillingForm.vue";
import PaymentSelector from "../components/PaymentSelector.vue";
import OrderSynopsis from "../components/OrderSynopsis.vue";
import eventBus from '../js/eventBus';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: "CheckoutPage",
  components: {
    Payment,
    Summary,
    Alert,
    Delivery,
    ShippingForm,
    PaymentSelector,
    OrderSynopsis
  },
  data() {
    return {
      backendUrl,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        paymentMethod: '',
        deliveryMethod: '',
        billingFirstName: '',
        billingLastName: '',
        billingEmail: '',
        billingAddress: '',
        billingCity: '',
        billingZip: '',
        billingCountry: '',
        totalPrice: '',
        savings: 0,
        deliveryPickup: 10,
        tax: 24,
      },
      sameAsShipping: false,
      saveInfo: false,
      submitted: false,
      submittedData: {},
      items: [],
      alertVisible: false,
      alertColor: 'success',
      alertTitle: '',
      alertDescription: '',
      total: 0,
      selectedPaymentMethod: '',
      isCreditCardModalVisible: false // Add this property
    };
  },
  watch: {
    sameAsShipping(newVal) {
      this.toggleShippingAddress(newVal);
    }
  },
  async mounted() {
    await this.fetchCartItems();
    this.getTotal();
    if (this.sameAsShipping) {
      this.toggleShippingAddress();
    }
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await axios.get(`${backendUrl}/api/cart-items`, { withCredentials: true });
        this.items = response.data.items;
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    },
    handleFormSubmit() {
      this.submitted = true;
      this.submittedData = { ...this.formData };
      console.log(this.formData);
    },
    toggleShippingAddress(newVal) {
      console.log("Toggling shipping address. sameAsShipping:", newVal);
      if (newVal) {
        console.log("Before copying:", this.formData);
        this.formData.billingFirstName = this.formData.firstName;
        this.formData.billingLastName = this.formData.lastName;
        this.formData.billingEmail = this.formData.email;
        this.formData.billingAddress = this.formData.address;
        this.formData.billingCity = this.formData.city;
        this.formData.billingZip = this.formData.zip;
        this.formData.billingCountry = this.formData.country;
        console.log("After copying:", this.formData);
      } else {
        this.formData.billingFirstName = '';
        this.formData.billingLastName = '';
        this.formData.billingEmail = '';
        this.formData.billingAddress = '';
        this.formData.billingCity = '';
        this.formData.billingZip = '';
        this.formData.billingCountry = '';
      }
    },
    getTotal() {
      this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    },
    handleAlert(title, description, color = 'success') {
      this.alertTitle = title;
      this.alertDescription = description;
      this.alertColor = color;
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 4000);
    },
    updatePaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    updateTotalPrice(newTotalPrice) {
      this.formData.totalPrice = newTotalPrice;
    },
    closeModal() {
      this.isCreditCardModalVisible = false;
    },
    handlePaymentSuccess() {
      this.closeModal();
      this.handleAlert('Success', 'Your payment was successful!', 'success');
      // Additional logic for payment success can be added here
    },
    async finishPayment() {
      console.log(this.formData);
      if (!this.formData.paymentMethod) {
        this.handleAlert('Error', 'Please select a payment method.', 'error');
        return;
      }

      if (!this.formData.deliveryMethod) {
        this.handleAlert('Error', 'Please select a delivery method.', 'error');
        return;
      }

      try {
        if (this.formData.paymentMethod === 'credit-card') {
          this.isCreditCardModalVisible = true;
        }

        // Call the API to create the order and get the order ID from the response
        const response = await axios.post(`${backendUrl}/api/create-order`, {
          formData: this.formData,
          paymentMethod: this.formData.paymentMethod,
          items: this.items,
        }, { withCredentials: true });

        const orderID = response.data.order._id; // Assuming the order ID is returned as `_id`
        // Clear the cart after order completion
        await axios.delete(`${backendUrl}/api/clear-cart`, { withCredentials: true });
        // Update the cart counter to 0 after clearing the cart
        eventBus.emit('cart-updated', 0);  // Emit the event to update cart count to 0
        if (this.formData.paymentMethod === 'credit-card' && PaymentForm.isValid) {
          this.$router.push({ name: 'orderCompletion', params: { orderId: orderID } });
        } else if (this.formData.paymentMethod === 'paypal') {
          window.location.href = 'https://www.sandbox.paypal.com/';
        } else if (this.formData.paymentMethod === 'cash') {
          this.handleAlert('Success', 'Your order has been successfully processed.', 'success');
          console.log('Payment method:', this.formData.paymentMethod);
          this.$router.push({ name: 'orderCompletion', params: { orderId: orderID } });
        }

      } catch (error) {
        console.error('Failed to process order', error);
        this.handleAlert('Error', 'Failed to process your order. Please try again later.', 'error');
      }

    }

  }
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

body,
html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.container {
  max-width: 100%;
}
.form-input {
  @apply w-full p-3 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 
         focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out;
}
button[type="button"]:hover {
  transform: scale(1.02);
}
</style>