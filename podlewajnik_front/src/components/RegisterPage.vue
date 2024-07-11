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
        <span v-for="error in nameErrors" :key="error" class="error">{{
          error
        }}</span>
      </div>
      <div class="form-group">
        <label for="registerEmail">Email:</label>
        <input id="registerEmail" v-model="email" type="text" required />
        <span v-for="error in emailErrors" :key="error" class="error">{{
          error
        }}</span>
      </div>
      <div class="form-group">
        <label for="registerLogin">Login:</label>
        <input id="registerLogin" v-model="login" type="text" required />
        <span v-for="error in loginErrors" :key="error" class="error">{{
          error
        }}</span>
      </div>
      <div class="form-group">
        <label for="registerPassword">Password:</label>
        <input
          id="registerPassword"
          v-model="password"
          type="password"
          required
        />
        <span v-for="error in passwordErrors" :key="error" class="error">{{
          error
        }}</span>
      </div>
      <div class="form-group">
        <label for="ConfirmPassword">Confirm Password:</label>
        <input
          id="ConfirmPassword"
          v-model="confirmPassword"
          type="password"
          required
        />
        <div v-if="confirmPasswordErrors.length" class="errors"></div>
        <span
          v-for="error in confirmPasswordErrors"
          :key="error"
          class="error"
          >{{ error }}</span
        >
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
    const nameErrors = ref<string[]>([]);
    const emailErrors = ref<string[]>([]);
    const loginErrors = ref<string[]>([]);
    const passwordErrors = ref<string[]>([]);
    const confirmPasswordErrors = ref<string[]>([]);
    const errorMessage = ref('');
    const successMessage = ref('');
    const apiError = ref('');
    const router = useRouter();

    //Validation:

    const validateName = (name: string) => {
      const errors: string[] = [];
      if (name.length < 1 || name.length > 30) {
        errors.push('Login must be between 1 and 30 characters.');
      }

      return errors;
    };

    const validateEmail = (email: string) => {
      const errors: string[] = [];
      if (email.length < 6 || email.length > 100) {
        errors.push('Email must be between 6 and 100 characters.');
      }
      if (!email.includes('@')) {
        errors.push('Email must contain an "@" symbol.');
      }
      if (/\s/.test(email)) {
        errors.push('Email cannot contain spaces.');
      }
      // Simple regex for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Invalid email address.');
      }
      return errors;
    };

    const validateLogin = (login: string) => {
      const errors: string[] = [];
      if (login.length < 6 || login.length > 20) {
        errors.push('Login must be between 6 and 20 characters.');
      }
      if (/\s/.test(login)) {
        errors.push('Login cannot contain spaces.');
      }
      return errors;
    };

    const validatePassword = (password: string) => {
      const errors: string[] = [];
      if (password.length < 6 || password.length > 20) {
        errors.push('Password must be between 6 and 20 characters.');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter.');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter.');
      }
      if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one digit.');
      }
      if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push('Password must contain at least one special character.');
      }
      if (/\s/.test(password)) {
        errors.push('Password cannot contain spaces.');
      }
      return errors;
    };

    const validateConfirmPassword = (
      password: string,
      confirmPassword: string,
    ) => {
      const errors: string[] = [];
      if (password !== confirmPassword) {
        errors.push('Passwords do not match.');
      }
      return errors;
    };

    //Submit function:

    const handleSubmit = async () => {
      // Perform validation
      nameErrors.value = validateName(name.value);
      loginErrors.value = validateLogin(login.value);
      emailErrors.value = validateEmail(email.value);
      passwordErrors.value = validatePassword(password.value);
      confirmPasswordErrors.value = validateConfirmPassword(
        password.value,
        confirmPassword.value,
      );

      if (
        !nameErrors.value.length &&
        !loginErrors.value.length &&
        !emailErrors.value.length &&
        !passwordErrors.value.length &&
        !confirmPasswordErrors.value.length
      ) {
        try {
          const response = await axios.post('register', {
            fullname: name.value,
            email_address: email.value,
            username: login.value,
            password: password.value,
          });

          successMessage.value = 'Registration successful!';
          errorMessage.value = '';
          console.log('Registration successful:', response.data);
          router.push('/main-page');
        } catch (error) {
          console.error('Registration error:', error);
          errorMessage.value = 'Failed to register. Please try again.';
          successMessage.value = '';
        }
      } else {
        console.log('Validation errors:', {
          nameErrors: nameErrors.value,
          loginErrors: loginErrors.value,
          emailErrors: emailErrors.value,
          passwordErrors: passwordErrors.value,
          confirmPasswordErrors: confirmPasswordErrors.value,
        });
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
      nameErrors,
      loginErrors,
      emailErrors,
      passwordErrors,
      confirmPasswordErrors,
      apiError,
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

.error {
  color: red;
  margin-top: 5px;
  display: block;
}
div {
  margin-bottom: 20px;
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
