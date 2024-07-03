<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingPage from './components/LandingPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import LoginPage from './components/LoginPage.vue';
import MainPage from './components/MainPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    LandingPage,
    RegisterPage,
    LoginPage,
    MainPage
  },
});
</script>

<style>
/* Your styles here */
</style>
