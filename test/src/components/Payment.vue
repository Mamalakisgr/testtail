<template>
  <div class="modal">
    <div class="col-span-1 lg:col-span-6 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500 bg-white ">
     <h4 class="text-3xl text-black mb-5 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500  p-2  m-2 shadow-md">Payment information</h4>
     <div class="p-10 text-black">
      <div class="mb-6">
       <label class="block mb-3 text-white-600" for="">Name on card</label>
       <input type="text" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-white tracking-wider  shadow-md"/>
      </div>
      <div class="mb-6">
       <label class="block mb-3 text-black" for="">Card number</label>
       <input
        type="tel" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-white tracking-widest "/>
      </div>
      <div class="mb-6 flex flex-wrap -mx-3w-full">
       <div class="w-2/3 px-3">
        <label class="block mb-3 text-black" for="">Expiraion date</label>
        <div class="flex">
         <select class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-black tracking-widest mr-6 ">
          <option>Month</option>
         </select>
         <select class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-black tracking-widest ">
          <option>Year</option>
         </select>
        </div>
       </div>
       <div class="w-1/3 px-3">
        <label class="block mb-3 text-black" for="">CVC</label>
        <input type="tel" class="border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-white tracking-widest "/>
       </div>
      </div>
      <div class="mb-6 text-right">
       <span class="text-right font-bold">{{ total }}USD</span>
      </div>
      <div>
       <button @click="finishPayment" class="w-full text-ceenter px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold">
        Confirm payment
       </button>
      </div>
     </div>
    </div>
  </div>
   </template>
   <script>
   export default {
    name: "Payment",
    props:{
     total:Number
    },
    methods:{
    finishPayment(){
     this.$emit('change-parent');
     }
    }
   };
   </script>