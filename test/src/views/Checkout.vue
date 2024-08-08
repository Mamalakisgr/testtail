<template>
  <div class="container mx-auto p-6 shadow-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 lg:pt-12">

      <!-- Shipping Form, Payment Selector, and Payment -->
      <div class="lg:col-span-8 space-y-6">
        <ShippingForm
          ref="ShippingForm"
          :formData="formData"
          :sameAsShipping.sync="sameAsShipping"
          :saveInfo.sync="saveInfo"
          @submit="handleFormSubmit"
          @toggle-shipping-address="toggleShippingAddress"
        />
        <Delivery v-model="formData.deliveryMethod" />
        <PaymentSelector v-model="formData.paymentMethod" />
        <Summary :items="items"></Summary>
        <button @click="finishPayment" type="button" class="w-full text-center px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">
          Finish payment
        </button>
        <Alert :visible="alertVisible" position="top-right" :color="alertColor" :title="alertTitle" :description="alertDescription" />
      </div>
      <!-- Summary -->
      <div class="lg:col-span-4">
        <div class="sticky top-20">
          <OrderSynopsis 
            :totalPrice="formData.totalPrice" 
            :originalPrice="formData.originalPrice" 
            :savings="formData.savings" 
            :deliveryPickup="formData.deliveryPickup" 
            :tax="formData.tax" 
          />
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
import ShippingForm from "../components/BillingForm.vue";
import PaymentSelector from "../components/PaymentSelector.vue";
import OrderSynopsis from "../components/OrderSynopsis.vue";

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
        originalPrice: '',
        totalPrice: ''
      },
      sameAsShipping: true,
      saveInfo: false,
      submitted: false,
      submittedData: {},
      items: [],
      alertVisible: false,
      alertColor: 'success',
      alertTitle: '',
      alertDescription: '',
      total: 0,
      selectedPaymentMethod: ''
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
        const response = await axios.get('http://localhost:5174/api/cart-items', { withCredentials: true });
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
        // Here you can call the API to send the order
        await axios.post('http://localhost:5174/api/create-order', {
          formData: this.formData,
          paymentMethod: this.selectedPaymentMethod,
          items: this.items,
        }, { withCredentials: true });

        if (this.selectedPaymentMethod === 'credit-card') {
          this.$router.push({ name: 'CreditCardPayment' });
        } else if (this.selectedPaymentMethod === 'paypal') {
          this.$router.push({ name: 'CreditCardPayment' });
        } else {
          this.handleAlert('Success', 'Your order has been successfully processed.', 'success');
          console.log('Payment method:', this.selectedPaymentMethod);
        }
      } catch (error) {
        console.error('Failed to process order', error);
        this.handleAlert('Error', 'Failed to process your order. Please try again later.', 'error');
      }
    }
  }
};
</script>
