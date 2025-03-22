<template>
  <div class="w-full max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8 shadow-md">
    <h2 class="text-2xl font-bold text-white mb-6">Choose Delivery Method</h2>
    <ul class="space-y-4">
      <!-- Home Delivery Option -->
      <li
        class="flex items-start p-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:shadow-lg transition duration-200 cursor-pointer"
        :class="{ 'ring-2 ring-blue-500': deliveryMethod === 'courier' }"
      >
        <input
          type="radio"
          id="courier"
          name="delivery"
          value="courier"
          v-model="deliveryMethod"
          class="mt-1 accent-blue-600"
        />
        <label for="courier" class="ml-4 flex items-start gap-3 text-white w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-blue-500 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <div>
            <span class="block font-semibold text-white">Delivery to Your Home</span>
            <p class="text-gray-400 text-sm">
              Free delivery for orders over €100. Estimated 2-3 working days.
            </p>
          </div>
        </label>
      </li>

      <!-- Store Pickup Option -->
      <li
        class="flex items-start p-4 rounded-lg border border-gray-700 hover:border-blue-500 hover:shadow-lg transition duration-200 cursor-pointer"
        :class="{ 'ring-2 ring-blue-500': deliveryMethod === 'pickup' }"
      >
        <input
          type="radio"
          id="pickup"
          name="delivery"
          value="pickup"
          v-model="deliveryMethod"
          class="mt-1 accent-blue-600"
        />
        <label for="pickup" class="ml-4 flex items-start gap-3 text-white w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-blue-500 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72"
            />
          </svg>
          <div>
            <span class="block font-semibold text-white">Pick Up from Store</span>
            <p class="text-gray-400 text-sm">
              Collect your order after receiving a notification.
            </p>
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "Delivery",
  props: {
    modelValue: String,
  },
  computed: {
    deliveryMethod: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    deliveryCost() {
      return this.deliveryMethod === "courier" ? 10 : 0;
    },
  },
  methods: {
    emitDeliveryCost() {
      this.$emit("delivery-cost", this.deliveryCost);
    },
  },
};
</script>

<style scoped>
/* Add hover effects for delivery options */

</style>
