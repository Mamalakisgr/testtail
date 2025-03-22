<template>
  <div class="max-w-xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700">
    <!-- Shipping Address -->
    <h2 class="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Shipping Address</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <input
          v-model="formData.firstName"
          type="text"
          id="firstName"
          name="firstName"
          class="form-input"
          data-cy="shipping_first_name"
          placeholder="First Name"
          required
        />
        <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
      </div>
      <div>
        <input
          v-model="formData.lastName"
          type="text"
          id="lastName"
          name="lastName"
          class="form-input"
          data-cy="shipping_last_name"
          placeholder="Last Name"
          required
        />
        <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
      </div>
    </div>

    <div class="mb-6">
      <input
        v-model="formData.email"
        type="email"
        id="email"
        name="email"
        class="form-input"
        data-cy="shipping_email"
        placeholder="Email Address"
        required
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>

    <div class="mb-6">
      <CountrySelector v-model="formData.country" />
      <span v-if="errors.country" class="text-red-500 text-sm">{{ errors.country }}</span>
    </div>

    <div class="mb-6">
      <input
        v-model="formData.address"
        id="address"
        name="address"
        class="form-input"
        data-cy="shipping_address"
        placeholder="Shipping Address"
        required
      />
      <span v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <input
          v-model="formData.city"
          type="text"
          id="city"
          name="city"
          class="form-input"
          data-cy="shipping_city"
          placeholder="City"
          required
        />
        <span v-if="errors.city" class="text-red-500 text-sm">{{ errors.city }}</span>
      </div>
      <div>
        <input
          v-model="formData.zip"
          type="text"
          id="zip"
          name="zip"
          class="form-input"
          data-cy="shipping_code"
          placeholder="ZIP Code"
          required
        />
        <span v-if="errors.zip" class="text-red-500 text-sm">{{ errors.zip }}</span>
      </div>
    </div>

    <!-- Checkboxes -->
    <div class="mb-4 flex items-center">
      <input
        type="checkbox"
        data-cy="same_as_shipping_checkbox"
        v-model="internalSameAsShipping"
        id="sameAsShipping"
        class="form-checkbox text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
      />
      <label for="sameAsShipping" class="ml-2 text-sm text-gray-200">Billing address is the same as my Shipping address</label>
    </div>

    <div class="mb-2 flex items-center">
      <input
        type="checkbox"
        id="saveInfo"
        v-model="internalSaveInfo"
        class="form-checkbox text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
      />
      <label for="saveInfo" class="ml-2 text-sm text-gray-200">Save this information for next time</label>
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
.form-input {
  @apply w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600
         focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150 ease-in-out;
}</style>
