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
        <input id="login" v-model="login" type="text" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
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
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const login = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const getTokenFromCookies = (cookieName: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${cookieName}=`);

      if (parts.length === 2) {
        const tokenPart = parts.pop();

        return tokenPart?.split(';').shift() || null;
      }
      return null;
    };

    const validateFields = () => {
      if (!login.value.trim() || !password.value.trim()) {
        errorMessage.value = 'Both login and password fields are required.';
        return false;
      }
      return true;
    };

    const onSubmit = async () => {
      if (!validateFields()) {
        return;
      }

      try {
        const formData = new FormData();
        formData.append('username', login.value);
        formData.append('password', password.value);

        const response = await axios.post('login', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        console.log('Backend response:', response.data);

        if (
          response.data.message &&
          response.data.message.includes('Welcome back!')
        ) {
          console.log('Login successful, redirecting...');
          router.push('/main-page');
        } else {
          errorMessage.value =
            response.data.message || 'Login failed. Please try again.';
        }
      } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = 'Login failed. Please try again.';
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      login,
      password,
      errorMessage,
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

.error {
  color: red;
  margin-top: 15px;
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
