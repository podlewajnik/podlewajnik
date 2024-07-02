<template>
  <div class="register-page">
    <div class="header">
      <div class="back-button" @click="goBack">
        <img src="@/assets/arrow_back.png" alt="Back" />
        <span class="tooltip">Back</span>
      </div>
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
    </div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="registerName">Name:</label>
        <input id="registerName" v-model="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="registerEmail">Email:</label>
        <input id="registerEmail" v-model="email" type="text" required />
      </div>
      <div class="form-group">
        <label for="registerLogin">Login:</label>
        <input id="registerLogin" v-model="login" type="text" required />
      </div>
      <div class="form-group">
        <label for="registerPassword">Password:</label>
        <input
          id="registerPassword"
          v-model="password"
          type="password"
          required
        />
      </div>
      <div class="form-group">
        <label for="ConfirmPassword">Confirm Password:</label>
        <input
          id="ConfirmPassword"
          v-model="confirmPassword"
          type="password"
          required
        />
      </div>
      <button type="submit">Confirm</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <div class="logo-mobile">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'RegisterPage',
  setup() {
  
    const name = ref('');
    const email = ref('');
    const login = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      try {

          const response = await axios.post('http://localhost:8000/register', {
          fullname: name.value,
          email_address: email.value,
          username: login.value,
          password: password.value,
        });
        successMessage.value = 'Registration successful!';
        errorMessage.value = '';
        console.log('Registration successful:', response.data);
        router.push('/main-page')
        // Handle successful registration (e.g., redirect to login page)
      } catch (error) {
        console.error('Registration error:', error);
        errorMessage.value = 'Failed to register. Please try again.';
        successMessage.value = '';
      }
    };


    const goBack = () => {
      router.go(-1);
    };




    return {
      name,
      email,
      login,
      password,
      confirmPassword,
      errorMessage,
      successMessage,
      handleSubmit,
      goBack,
    };
  },
});
</script>

<style scoped>
.register-page {
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
  top: -30px; /* Adjust the distance above the back button */
  opacity: 0;
  transition: opacity 1s;
}

.back-button:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.logo img {
  width: 290px; /* Adjust width as needed */
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
  margin-top: 20px; /* Adjust margin as needed */
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
