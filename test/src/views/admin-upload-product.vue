<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-center text-gray-800">Add New Product</h2>
      </div>
      <form @submit.prevent="uploadProduct" enctype="multipart/form-data">
        <div class="flex flex-col items-center">
          <input 
            class="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
            type="file" 
            @change="handleFileUpload" 
            accept="image/*" 
            required 
          />
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
          <div class="col-span-1">
            <label class="block text-gray-700">Product Name</label>
            <input 
              v-model="product.name" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="text" 
              placeholder="Product Name" 
              required 
            />
          </div>
          <div class="col-span-1">
            <label class="block text-gray-700">Product Price</label>
            <input 
              v-model="product.price" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="text" 
              placeholder="Product Price" 
              required 
            />
          </div>
          <div class="col-span-1">
            <label class="block text-gray-700">Category</label>
            <select 
              v-model="product.category" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            >
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="col-span-1">
            <label class="block text-gray-700">Tags</label>
            <div class="flex items-center space-x-2">
              <select 
                v-model="selectedTag" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              >
                <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
              </select>
              <button 
                type="button" 
                @click="addTag" 
                class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Add
              </button>
            </div>
            <div class="mt-2 flex flex-wrap gap-2 selected-tags-container">
              <div 
                v-for="tag in product.tags" 
                :key="tag" 
                class="bg-gray-200 px-2 py-1 rounded-lg flex items-center space-x-2"
              >
                <span>{{ tag }}</span>
                <button 
                  @click="removeTag(tag)" 
                  class="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-1">
            <label class="block text-gray-700">Brand</label>
            <input 
              v-model="product.brand" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="text" 
              placeholder="Product Brand" 
              required 
            />
          </div>
          <div class="col-span-1">
            <label class="block text-gray-700">Quantity</label>
            <input 
              v-model="product.quantity" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="text" 
              placeholder="Product Quantity" 
              required 
            />
          </div>
          <div class="col-span-1">
            <label class="block text-gray-700">Offer Price</label>
            <input 
              v-model="product.offerPrice" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="text" 
              placeholder="Offer Price"
            />
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button type="submit" class="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none">Upload Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { backendUrl } from '@/js/index'; // Adjust the path if necessary

const product = ref({
  name: '',
  price: '',
  category: '',
  tags: [],
  brand: '',
  quantity: '',
  offerPrice: '',
  image: null,
});

const categories = ref([]);
const tags = ref([]);
const selectedTag = ref('');

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchTags = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/tags`);
    tags.value = response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};

const handleFileUpload = (event) => {
  product.value.image = event.target.files[0];
};

const addTag = () => {
  if (selectedTag.value && !product.value.tags.includes(selectedTag.value)) {
    product.value.tags.push(selectedTag.value);
  }
};

const removeTag = (tag) => {
  product.value.tags = product.value.tags.filter(t => t !== tag);
};

const uploadProduct = async () => {
  const formData = new FormData();
  formData.append('name', product.value.name);
  formData.append('price', product.value.price);
  formData.append('p_category', product.value.category);
  formData.append('p_tag', product.value.tags.join(','));
  formData.append('p_brand', product.value.brand);
  formData.append('p_quantity', product.value.quantity);
  formData.append('offer_price', product.value.offerPrice);
  formData.append('productImage', product.value.image);
  console.log(...formData); // Debugging line to check the FormData content

  try {
    const response = await axios.post(`${backendUrl}/api/upload-product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Product uploaded successfully:', response.data);
    // Reset form after successful upload
    resetForm();
  } catch (error) {
    console.error('Error uploading product:', error);
  }
};

const resetForm = () => {
  product.value = {
    name: '',
    price: '',
    category: '',
    tags: [],
    brand: '',
    quantity: '',
    offerPrice: '',
    image: null,
  };
  selectedTag.value = '';
};

onMounted(() => {
  fetchCategories();
  fetchTags();
});
</script>

<style scoped>
.selected-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.selected-tags-container div {
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
option {
  color: #000; 
}
</style>
