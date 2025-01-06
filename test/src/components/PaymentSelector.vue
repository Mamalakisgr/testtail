<template>
  <div class="container mx-auto p-6 bg-white border border-blue-300 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Choose Payment Method</h1>
    <ul class="space-y-6">
      <!-- Cash Option -->
      <li class="flex items-start hover:bg-gray-100 p-4 rounded-lg transition duration-300">
        <input
          type="radio"
          id="cash"
          name="payment"
          value="cash"
          v-model="paymentMethod"
          class="mt-1"
        />
        <label for="cash" class="ml-4 flex items-center gap-3 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          <div>
            <span class="font-semibold text-gray-800">Pay with Cash</span>
            <p class="text-gray-600 text-sm">Extra Cost: +2.5 Euros</p>
          </div>
        </label>
      </li>

      <!-- Credit Card Option -->
      <li class="flex items-start hover:bg-gray-100 p-4 rounded-lg transition duration-300">
        <input
          type="radio"
          id="credit-card"
          name="payment"
          value="credit-card"
          v-model="paymentMethod"
          class="mt-1"
        />
        <label for="credit-card" class="ml-4 flex items-center gap-3 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 8.25h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
          <div>
            <span class="font-semibold text-gray-800">Credit Card</span>
            <p class="text-gray-600 text-sm">No Extra Costs</p>
          </div>
        </label>
      </li>

      <!-- PayPal Option -->
      <li class="flex items-start hover:bg-gray-100 p-4 rounded-lg transition duration-300">
        <input
          type="radio"
          id="paypal"
          name="payment"
          value="paypal"
          v-model="paymentMethod"
          class="mt-1"
        />

        <label for="paypal" class="ml-4 flex items-center gap-3 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-blue-500"
            fill="0d62ab"
            viewBox="0 0 48 48"
            stroke="currentColor"
            stroke-width="1.5"
          >
          
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006	C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001	c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z"></path><path fill="#199be2" d="M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115	c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001	c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015	l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102	C42.18,16.106,37.358,13.019,33.183,12.994z"></path><path fill="#006fc4" d="M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765	c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882	C33.166,12.993,33.148,13,33.132,13H19.66z"
            />
          </svg>
          <div>
            <span class="font-semibold text-gray-800">PayPal</span>
            <p class="text-gray-600 text-sm">No Extra Costs</p>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "PaymentSelector",
  props: {
    modelValue: String, // The selected payment method
  },
  computed: {
    paymentMethod: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    validatePayment() {
      if (!this.paymentMethod) {
        alert("Please select a payment method.");
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
/* Add hover effects for a polished feel */
li:hover {
  background-color: rgba(243, 244, 246, 1); /* Tailwind's gray-100 */
  transition: background-color 0.3s ease;
}
</style>
