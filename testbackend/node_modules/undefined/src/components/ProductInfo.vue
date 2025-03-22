<template>
    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      <ProductHeader :brand="product.p_brand" :name="product.product_name" />
      
      <p class="leading-relaxed mt-4">{{ product.description }}</p>
      
      <SizeSelector 
        :sizes="sizes"
        :selected-size="selectedSize"
        @update:selected-size="$emit('update:selected-size', $event)"
      />
  
      <div class="flex items-center justify-between mt-8">
        <PriceDisplay :price="product.p_price" :offer-price="product.offer_price" />
        
        <div class="flex items-center gap-4">
          <AddToCartButton @click="$emit('add-to-cart')" />
          <WishlistButton 
            :product-id="product._id"
            :is-in-wishlist="isInWishlist"
            @toggle-wishlist="$emit('toggle-wishlist')"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import ProductHeader from '@/components/ProductHeader.vue'
  import SizeSelector from '@/components/SizeSelector.vue'
  import PriceDisplay from '@/components/PriceDisplay.vue'
  import AddToCartButton from '@/components/AddToCartButton.vue'
  import WishlistButton from '@/components/WishlistButton.vue'
  
  defineProps({
  product: {
    type: Object,
    default: () => ({
      p_brand: '',
      product_name: '',
      description: '',
      _id: '',
      p_price: 0,
      offer_price: null
    })
  },
  sizes: {
    type: Array,
    default: () => []
  },
  selectedSize: {
    type: String,
    default: ''
  },
  isInWishlist: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:selected-size', 'add-to-cart', 'toggle-wishlist'])
  </script>