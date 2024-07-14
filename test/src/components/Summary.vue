<template>
  <div class="col-span-1 lg:col-span-4 order-first lg:order-last">
    <h4 class="text-3xl text-gray-700 mb-5">Order Summary</h4>
    <div class="p-10 rounded-md shadow-md bg-white">
      <item v-for="(item, i) in items" :key="i" :item="item" />
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "Summary",
  props: {
    items: Array
  },
  components: {
    Item
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
