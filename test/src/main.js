import './assets/main.css'

import { createApp } from 'vue'
import VueCarousel from 'vue-carousel';
import 'flowbite';

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailmain.css'
createApp(App).use(VueCarousel);


createApp(App).use(store).use(router).mount('#app')
