<template>
  <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-6 sm:p-8">
    <h2 class="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
      Cart Summary
    </h2>

    <!-- Cart Items -->
    <div class="space-y-4 mb-6">
      <Item v-for="(item, i) in items" :key="i" :item="item" />
    </div>

    <!-- Breakdown Section -->
    <div class="space-y-3 text-sm">
      <div v-if="originalPrice > 0" class="flex justify-between">
        <span class="text-gray-400">Original Price</span>
        <span class="text-gray-100 font-medium">€{{ originalPrice.toFixed(2) }}</span>
      </div>
      <div v-if="savings > 0" class="flex justify-between">
        <span class="text-gray-400">Savings</span>
        <span class="text-green-400 font-medium">-€{{ savings.toFixed(2) }}</span>
      </div>
      <div v-if="deliveryPickup > 0" class="flex justify-between">
        <span class="text-gray-400">Delivery Pickup</span>
        <span class="text-gray-100 font-medium">€{{ deliveryPickup }}</span>
      </div>
      <div v-if="tax > 0" class="flex justify-between">
        <span class="text-gray-400">Tax (8%)</span>
        <span class="text-gray-100 font-medium">€{{ tax.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Total -->
    <div class="border-t border-gray-700 mt-6 pt-4 flex justify-between text-lg font-semibold text-white">
      <span>Total</span>
      <span>€{{ totalPrice.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { backendUrl } from "@/js/index"; // Adjust the path if necessary

export default {
  name: "Summary",
  components: {
    Item,
  },
  props: {
    items: Array, // Cart items
    deliveryOption: {
      type: String,
      required: true, // Make sure the parent provides the delivery option
    },
  },
  setup(props) {
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

    const originalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => {
        return total + (item.price || 0) * (item.quantity || 0);
      }, 0);
    });

    const savings = computed(() => {
      return cartItems.value.reduce((total, item) => {
        const itemSavings =
          (item.price || 0) - (item.offer_price || item.price);
        return total + itemSavings * (item.quantity || 0);
      }, 0);
    });

    const deliveryPickup = ref(props.deliveryOption === "pickup" ? 0 : 99);

    // Watch for changes in deliveryOption prop
    watch(
      () => props.deliveryOption,
      (newVal) => {
        deliveryPickup.value = newVal === "pickup" ? 0 : 99;
      }
    );

    const taxRate = 0.08; // Example: 8% tax
    const tax = computed(() => {
      return originalPrice.value * taxRate;
    });

    const totalPrice = computed(() => {
      return originalPrice.value - savings.value + deliveryPickup.value;
    });

    return {
      items: cartItems,
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
