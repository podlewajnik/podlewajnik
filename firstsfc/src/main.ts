import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/global.css'; 

// Create the Vue application
createApp(App).use(router).mount('#app');

// // Mount the Vue application to the DOM
// app.mount('#app');
