<template>
  <div class="login-page">
    <div class="header">
      <div class="back-button" @click="goBack">
        <img src="@/assets/arrow_back.png" alt="Back" />
        <span class="tooltip">Back</span>
      </div>
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
    </div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="login">Login:</label>
        <input id="login" v-model="login" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="passowrd" v-model="password" type="text" required />
      </div>
      <button type="submit">Confirm</button>
    </form>
    <div class="logo-mobile">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const login = ref("");
    const password = ref("");

    const onSubmit = () => {
      // Handle form submission
      console.log("Input 1:", login.value);
      console.log("Input 2:", password.value);
      // You can add more logic here, e.g., form validation, API calls, etc.
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      login,
      password,
      onSubmit,
      goBack,
    };
  },
});
</script>

<style scoped>
.login-page {
  text-align: center;
  margin-top: 50px;
  position: relative;
}

.header {
  position: absolute;
  top: -30px;
  right: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-button img {
  width: 60px; 
  height: auto;
  margin-left: 35px;
  cursor: pointer;
}

.tooltip {
  visibility: hidden;
  width: 60px;
  background-color: rgb(75, 69, 69);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: relative;
  z-index: 1;
  top: -30px; 
  opacity: 0;
  transition: opacity 1s;
}

.back-button:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.logo img {
  width: 290px; 
  height: auto;
  margin-right: 35px;
}

.logo-mobile {
  display: none;
}

.logo-mobile img {
  width: 100%;
  max-width: 350px;
  height: auto;
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: rgb(209, 225, 235);
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .header .logo {
    display: none;
  }

  .logo-mobile {
    display: block;
    margin-top: 20px;
  }
}
</style>
