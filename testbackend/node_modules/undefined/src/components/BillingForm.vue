<template>
  <div class="max-w-lg mx-auto bg-white p-8 rounded-lg">
    <!-- Shipping Address -->
    <div>
      <div class="text-2xl my-4">Shipping Address</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="mb-4">
          <label for="firstName" class="block text-gray-700 mb-2">First Name</label>
          <input v-model="formData.firstName" type="text" id="firstName" name="firstName"
            class="w-full form-input p-1 border rounded-md shadow-sm" required>
          <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-gray-700 mb-2">Last Name</label>
          <input v-model="formData.lastName" type="text" id="lastName" name="lastName"
            class="w-full form-input p-1 border rounded-md shadow-sm" required>
          <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
        </div>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 mb-2">Email Address</label>
        <input v-model="formData.email" type="email" id="email" name="email"
          class="w-full form-input p-1 border rounded-md shadow-sm" required>
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>
      <div class="mb-4">
        <div class="md:col-span-3">
          <CountrySelector v-model="formData.country" />
          <span v-if="errors.country" class="text-red-500 text-sm">{{ errors.country }}</span>
        </div>
      </div>
      <div class="mb-4">
        <label for="address" class="block text-gray-700 mb-2">Address</label>
        <input v-model="formData.address" id="address" name="address" 
          class="w-full form-input p-1 border rounded-md shadow-sm" required>
        <span v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</span>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="city" class="block text-gray-700 mb-2">City</label>
          <input v-model="formData.city" type="text" id="city" name="city"
            class="w-full form-input p-1 border rounded-md shadow-sm" required>
          <span v-if="errors.city" class="text-red-500 text-sm">{{ errors.city }}</span>
        </div>
        <div>
          <label for="zip" class="block text-gray-700 mb-2">ZIP Code</label>
          <input v-model="formData.zip" type="text" id="zip" name="zip"
            class="w-full form-input p-1 border rounded-md shadow-sm" required>
          <span v-if="errors.zip" class="text-red-500 text-sm">{{ errors.zip }}</span>
        </div>
      </div>
      <div class="mb-4">
        <input type="checkbox" v-model="internalSameAsShipping" />
        <label class="ml-2">Billing address is the same as my Shipping address</label>
      </div>
      <div class="mb-8">
        <input type="checkbox" v-model="internalSaveInfo" />
        <label class="ml-2">Save this information for next time</label>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelector from "../components/CountrySelector.vue";

export default {
  name: "ShippingForm",
  components: {
    CountrySelector
  },
  props: {
    formData: Object,
    sameAsShipping: Boolean,
    saveInfo: Boolean
  },
  data() {
    return {
      errors: {},
      internalSameAsShipping: this.sameAsShipping, // Local state
      internalSaveInfo: this.saveInfo, // Local state
    };
  },
  watch: {
    internalSameAsShipping(newVal) {
      this.$emit('update:sameAsShipping', newVal);
      this.handleToggleShippingAddress(newVal);
    },
    sameAsShipping(newVal) {
      this.internalSameAsShipping = newVal; // Keep in sync
    },
    internalSaveInfo(newVal) {
      this.$emit('update:saveInfo', newVal);
    },
    saveInfo(newVal) {
      this.internalSaveInfo = newVal; // Keep in sync
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.formData.firstName) {
        this.errors.firstName = 'First name is required';
      }
      if (!this.formData.lastName) {
        this.errors.lastName = 'Last name is required';
      }
      if (!this.formData.email) {
        this.errors.email = 'Email is required';
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'Email is invalid';
      }
      if (!this.formData.address) {
        this.errors.address = 'Address is required';
      }
      if (!this.formData.city) {
        this.errors.city = 'City is required';
      }
      if (!this.formData.zip) {
        this.errors.zip = 'ZIP code is required';
      }
      if (!this.formData.country) {
        this.errors.country = 'Country is required';
      }

      return Object.keys(this.errors).length === 0;
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    handleToggleShippingAddress(value) {
      if (value) {
        this.copyShippingToBilling();
      } else {
        this.clearBillingAddress();
      }
    },
    copyShippingToBilling() {
      this.formData.billingFirstName = this.formData.firstName;
      this.formData.billingLastName = this.formData.lastName;
      this.formData.billingEmail = this.formData.email;
      this.formData.billingAddress = this.formData.address;
      this.formData.billingCity = this.formData.city;
      this.formData.billingZip = this.formData.zip;
      this.formData.billingCountry = this.formData.country;
    },
    clearBillingAddress() {
      this.formData.billingFirstName = '';
      this.formData.billingLastName = '';
      this.formData.billingEmail = '';
      this.formData.billingAddress = '';
      this.formData.billingCity = '';
      this.formData.billingZip = '';
      this.formData.billingCountry = '';
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
