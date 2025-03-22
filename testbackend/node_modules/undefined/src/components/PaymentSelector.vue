<template>
  <div class="w-full max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 shadow-md">
    <h2 class="text-2xl font-bold text-white mb-6">Choose Payment Method</h2>
    <ul class="space-y-4">
      <!-- Payment Option Template -->
      <li
        v-for="method in paymentOptions"
        :key="method.id"
        :class="[
          'flex items-start p-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:shadow-lg transition duration-200 cursor-pointer',
          paymentMethod === method.id ? 'ring-2 ring-blue-500' : ''
        ]"
      >
        <input
          type="radio"
          :id="method.id"
          name="payment"
          :value="method.id"
          v-model="paymentMethod"
          class="mt-1 accent-blue-600"
        />
        <label
          :for="method.id"
          class="ml-4 flex items-start gap-3 text-white w-full"
        >
          <component :is="method.icon" class="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <span class="block font-semibold text-white">{{ method.label }}</span>
            <p class="text-gray-400 text-sm">{{ method.description }}</p>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>


<script>
import { h } from "vue";

export default {
  name: "PaymentSelector",
  props: {
    modelValue: String,
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
    paymentOptions() {
      return [
        {
          id: "cash",
          label: "Pay with Cash",
          description: "Extra Cost: +2.5 Euros",
          icon: {
            render() {
              return h("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-6 h-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: "1.5",
                innerHTML:
                  `<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>`,
              });
            },
          },
        },
        {
          id: "credit-card",
          label: "Credit Card",
          description: "No Extra Costs",
          icon: {
            render() {
              return h("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-6 h-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: "1.5",
                innerHTML:
                  `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/>`,
              });
            },
          },
        },
        {
          id: "paypal",
          label: "PayPal",
          description: "No Extra Costs",
          icon: {
            render() {
              return h("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-6 h-6 text-blue-500",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                strokeWidth: "1.5",
                innerHTML:
                  `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.5h16.5v15H3.75z" />`,
              });
            },
          },
        },
      ];
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

</style>
