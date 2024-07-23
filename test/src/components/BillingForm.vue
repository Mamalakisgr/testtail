<template>
    <form @submit.prevent="submitForm" class="max-w-lg mx-auto bg-white p-8 rounded-lg">
      <!-- Billing Address -->
      <div>
        <div class="text-2xl my-4">Billing Address</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="firstName" class="block text-white-500 mb-2">First Name</label>
            <input v-model="formData.firstName" type="text" id="firstName" name="firstName"
              class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-white-500 mb-2">Last Name</label>
            <input v-model="formData.lastName" type="text" id="lastName" name="lastName"
              class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-white-500 mb-2">Email Address</label>
          <input v-model="formData.email" type="email" id="email" name="email"
            class="w-full form-input p-1 border rounded-md shadow-sm" required>
        </div>
        <div class="mb-4">
          <label for="address" class="block text-white-500 mb-2">Address</label>
          <textarea v-model="formData.address" id="address" name="address" rows="5"
            class="w-full form-textarea p-1 border rounded-md shadow-sm" required></textarea>
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="city" class="block text-white-500 mb-2">City</label>
            <input v-model="formData.city" type="text" id="city" name="city"
              class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
          <div>
            <label for="zip" class="block text-white-500 mb-2">ZIP Code</label>
            <input v-model="formData.zip" type="text" id="zip" name="zip"
              class="w-full form-input p-1 border rounded-md shadow-sm" required>
          </div>
          <div class="md:col-span-3">
            <CountrySelector />
          </div>
        </div>
        <div class="mb-4">
          <input type="checkbox" :checked="sameAsBilling" @change="updateSameAsBilling($event.target.checked)" />
          <label class="ml-2">Shipping address is the same as my billing address</label>
        </div>
        <div class="mb-8">
          <input type="checkbox" :checked="saveInfo" @change="updateSaveInfo($event.target.checked)" />
          <label class="ml-2">Save this information for next time</label>
        </div>
      </div>
    </form>
  </template>
  
  <script>
  import CountrySelector from "../components/CountrySelector.vue";
  
  export default {
    name: "BillingForm",
    components: {
      CountrySelector
    },
    props: {
      formData: Object,
      sameAsBilling: Boolean,
      saveInfo: Boolean
    },
    methods: {
      submitForm() {
        this.$emit('submit');
      },
      updateSameAsBilling(value) {
        this.$emit('update:sameAsBilling', value);
      },
      updateSaveInfo(value) {
        this.$emit('update:saveInfo', value);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  