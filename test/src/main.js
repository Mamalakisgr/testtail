import './assets/main.css';
import { createApp } from 'vue';
import VueCarousel from 'vue-carousel';
import 'flowbite';
import vueCountryRegionSelect from 'vue3-country-region-select';

import App from './App.vue';
import router from './router';
import store from './js';
import './assets/tailmain.css';

const app = createApp(App);

app.use(VueCarousel);
app.use(vueCountryRegionSelect);
app.use(store);
app.use(router);

app.mount('#app');
