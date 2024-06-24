import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import LoginPage from '@/components/LoginPage.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/register-page', component: RegisterPage },
  { path: '/login-page', component: LoginPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;