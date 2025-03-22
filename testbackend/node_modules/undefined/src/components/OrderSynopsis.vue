<template>
  <div class="max-w-md mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 sm:p-8">
    <h2 class="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Order Summary</h2>

    <!-- Breakdown -->
    <div class="space-y-4 text-sm">
      <div class="flex justify-between">
        <span class="text-gray-400">Original Price</span>
        <span class="text-gray-100 font-medium">€{{ originalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-400">Savings</span>
        <span class="text-green-400 font-medium">-€{{ savings.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-400">Delivery Cost</span>
        <span class="text-gray-100 font-medium">€{{ deliveryPickup.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-400">Tax (8%)</span>
        <span class="text-gray-100 font-medium">€{{ tax.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Divider -->
    <div class="my-6 border-t border-gray-700"></div>

    <!-- Total -->
    <div class="flex justify-between text-lg font-semibold text-white">
      <span>Total</span>
      <span>€{{ totalPrice.toFixed(2) }}</span>
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
// Calculate the total price
const totalPrice = computed(() => {
  return originalPrice.value - savings.value + deliveryPickup.value ;
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
/* Smooth hover and transition enhancements */
div {
  transition: all 0.2s ease-in-out;
}

@media (max-width: 640px) {
  .text-sm {
    font-size: 0.875rem;
  }
  @media (max-width: 640px) {
  .text-sm {
    font-size: 0.9rem;
  }
}

div {
  transition: all 0.2s ease-in-out;
}

h2::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #3b82f6; /* blue-500 */
  border-radius: 50%;
  margin-right: 8px;
}
}</style>
