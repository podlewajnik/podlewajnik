import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/global.css';
import axios from 'axios';

// Create the Vue application
createApp(App).use(router).mount('#app');

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/';  // the FastAPI backend

// // Mount the Vue application to the DOM
// app.mount('#app');
