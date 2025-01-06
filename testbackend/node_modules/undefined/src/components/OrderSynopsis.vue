<template>
  <div class="container mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full background-color-gray-700">
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 sm:p-6">
      <p class="text-xl font-semibold text-gray-400 dark:text-black">Order summary</p>
      <div class="space-y-4">
        <div class="space-y-2">
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-gray-400">Original price</dt>
            <dd class="text-base font-medium text-gray-400 dark:text-black">${{ originalPrice }}</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-black-400">Savings</dt>
            <dd class="text-base font-medium text-green-600">-{{ savings }}</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-black-400">Delivery Cost</dt>
            <dd class="text-base font-medium text-gray-400 dark:text-black">${{ deliveryPickup }}</dd>
          </dl>
          <dl class="flex items-center justify-between gap-4">
            <dt class="text-base font-normal text-gray-400 dark:text-black-400">Tax</dt>
            <dd class="text-base font-medium text-gray-400 dark:text-black">${{ tax }}</dd>
          </dl>
        </div>
        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt class="text-base font-bold text-gray-400 dark:text-black">Total</dt>
          <dd class="text-base font-bold text-gray-400 dark:text-black">${{ totalPrice }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { backendUrl } from "@/js/index"; // Adjust the path if necessary

export default {
  name: "OrderSynopsis",
  props: {
    deliveryOption: {
      type: String,
      default: "pickup", // Default value if no deliveryOption is provided
    },
  },
  setup(props, { emit }) {
    const cartItems = ref([]);

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/cart-items`, {
          withCredentials: true,
        });
        cartItems.value = response.data.items;
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    onMounted(() => {
      fetchCartItems();
    });

    // Calculate the original price of all items in the cart
    const originalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => {
        return total + (item.price || 0) * (item.quantity || 0);
      }, 0);
    });

    // Calculate the total savings based on the difference between the price and offer price
    const savings = computed(() => {
      return cartItems.value.reduce((total, item) => {
        const itemSavings = (item.price || 0) - (item.offer_price || item.price);
        return total + itemSavings * (item.quantity || 0);
      }, 0);
    });

    // Calculate delivery cost based on the deliveryOption
    const deliveryPickup = computed(() => {
      return props.deliveryOption === "pickup" ? 0 : 99;
    });

    // Calculate tax (assuming it's a percentage of the original price)
    const taxRate = 0.08; // Example: 8% tax
    const tax = computed(() => {
      return originalPrice.value * taxRate;
    });

    // Calculate the total price
    const totalPrice = computed(() => {
      return originalPrice.value - savings.value + deliveryPickup.value;
    });

    // Emit the total price when it changes
    watch(totalPrice, (newTotalPrice) => {
      emit("update:totalPrice", newTotalPrice);
    });

    return {
      originalPrice,
      savings,
      deliveryPickup,
      tax,
      totalPrice,
    };
  },
};
</script>


<style scoped>
/* Add your styles here */
</style>
