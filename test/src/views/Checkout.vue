<template>
  <div>
    <form @submit.prevent="submitForm" class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <!-- Billing Address -->
      <div>
        <div class="text-2xl my-4">Billing Address</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="firstName" class="block text-gray-700 mb-2">First Name</label>
            <input v-model="formData.firstName" type="text" id="firstName" name="firstName" class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-gray-700 mb-2">Last Name</label>
            <input v-model="formData.lastName" type="text" id="lastName" name="lastName" class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-2">Email Address</label>
          <input v-model="formData.email" type="email" id="email" name="email" class="w-full form-input p-1 border rounded-md shadow-sm" required>
        </div>
        <div class="mb-4">
          <label for="address" class="block text-gray-700 mb-2">Address</label>
          <textarea v-model="formData.address" id="address" name="address" rows="5" class="w-full form-textarea p-1 border rounded-md shadow-sm" required></textarea>
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="city" class="block text-gray-700 mb-2">City</label>
            <input v-model="formData.city" type="text" id="city" name="city" class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
          <div>
            <label for="zip" class="block text-gray-700 mb-2">ZIP Code</label>
            <input v-model="formData.zip" type="text" id="zip" name="zip" class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
          <div>
            <CountrySelector />
          </div>
        </div>
        <div class="mb-4">
          <input v-model="sameAsBilling" type="checkbox" @change="toggleShippingAddress" />
          <label class="ml-2">Shipping address is the same as my billing address</label>
        </div>
        <div class="mb-8">
          <input v-model="saveInfo" type="checkbox" />
          <label class="ml-2">Save this information for next time</label>
        </div>
      </div>
    </form>
  </div>
  <div :class="isCard ? '' : 'lg:h-screen'" class="container mx-auto p-6 grid grid-cols-1 row-gap-12 lg:grid-cols-10 lg:col-gap-10 lg:pt-12">
    <Payment @handle-card="handleCard" @change-parent="handleAlert" :total="total"></Payment>
    <Summary :items="items"></Summary>
    <Alert :visible="alertVisible" position="top-right" color="success" title="Success" description="Your payment has been successfully processed." />
  </div>
</template>

<script>
import Payment from "../components/Payment.vue";
import Summary from "../components/Summary.vue";
import Alert from "../components/Alert.vue";
import CountrySelector from "../components/CountrySelector.vue";
import axios from 'axios';

export default {
  name: "CheckoutPage",
  components: {
    Payment,
    Summary,
    Alert,
    CountrySelector
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
      isCard: false
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
