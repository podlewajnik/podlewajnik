<template>
  <div class="landing-page">
    <h1>Welcome to Podlewajnik</h1>
    <div class="image-container">
      <img class="rounded-image" src="@/assets/7.png" alt="Logo Picture" />
    </div>
    <div class="buttons">
      <button @click="onRegClick">Register</button>
      <button @click="onLogClick">Login</button>
      <button @click="goToMainPage">Go to Main Page</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LandingPage",
  setup() {
    const router = useRouter();

    const onRegClick = () => {
      router.push("/register-page");
    };

    const onLogClick = () => {
      router.push("/login-page");
    };

    const goToMainPage = () => {
      router.push("/main-page");
    };

    return {
      onRegClick,
      onLogClick,
      goToMainPage,
    };
  },
});
</script>

<style scoped>
.landing-page {
  text-align: center;
  margin-top: 50px;
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.image-container {
  margin-top: 20px;
}

/* Style the image to be a circle */
.rounded-image {
  border-radius: 50%;
  width: 450px; /* Adjust the width and height of the image as needed */
  height: 450px;
}
</style>
