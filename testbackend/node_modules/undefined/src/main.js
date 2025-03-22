import './assets/main.css';
import { createApp } from 'vue';
import 'flowbite';
import vueCountryRegionSelect from 'vue3-country-region-select';

import App from './App.vue'; // Main App component
import router from './router'; // Vue Router for handling views
import store from './js'; // Vuex Store for state management
import './assets/tailmain.css'; // Additional CSS

const app = createApp(App);

// Use global plugins and components
app.use(vueCountryRegionSelect);
app.use(store); // Vuex store
app.use(router); // Vue Router

app.mount('#app'); // Mount the app to the DOM
