<template>
  <div class="main-page" @click="changeMainMessage">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
    </div>
    <header class="main-message">
      {{ mainMessage }}
    </header>
    <div class="framed-text" v-if="showFramedText">
      <p>
        Add some plants and details about them. If you want to get a
        notification about watering, add your email and date of
      </p>
      <button @click="hideFramedText">Got it!</button>
    </div>
    <button @click="openModal" class="add-button">Add</button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Add a new plant</h2>
        <form @submit.prevent="addItem">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="itemName" required />

          <label for="location">Location:</label>
          <input type="text" id="location" v-model="itemLocation" optional />

          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            v-model="itemDescription"
            optional
          />

          <label for="watering">Watering:</label>
          <input type="text" id="watering" v-model="itemWatering" optional />

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
    <div class="logo-mobile">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainPage",
  setup() {
    const mainMessage = ref("Welcome XYZ!");
    const showFramedText = ref(true);
    const isModalOpen = ref(false);
    const itemName = ref("");
    const itemLocation = ref("");
    const itemDescription = ref("");
    const itemWatering = ref("");

    const changeMainMessage = () => {
      if (mainMessage.value === "Welcome XYZ!") {
        mainMessage.value = "Your Plants Page";
      }
    };

    const hideFramedText = () => {
      showFramedText.value = false;
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const addItem = () => {
      // Here you can handle adding the item to your data or perform any necessary actions
      console.log(
        "Adding item:",
        itemName.value,
        itemDescription.value,
        itemLocation.value,
        itemWatering.value
      );
      // Optionally, you can reset the form fields and close the modal
      itemName.value = "";
      itemDescription.value = "";
      itemLocation.value = "";
      itemWatering.value = "";
      closeModal();
    };

    return {
      mainMessage,
      showFramedText,
      isModalOpen,
      itemName,
      itemDescription,
      itemLocation,
      itemWatering,
      changeMainMessage,
      hideFramedText,
      openModal,
      closeModal,
      addItem,
    };
  },
});
</script>

<style scoped>
.main-page {
  text-align: left;
  margin-top: 50px;
  margin-left: 35px;
  position: relative;
}

.header {
  position: absolute;
  top: -30px;
  right: 20px;
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

.main-message {
  background-color: lightblue;
  padding: 10px;
  font-size: 25px;
  cursor: pointer;
}

.framed-text {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  position: relative;
  text-align: center;
  background-color: rgb(197, 223, 197);
  border-radius: 8px;
}

.framed-button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.add-button {
  padding: 10px 20px;
  font-size: 18px;
  margin-top: 40px;
  cursor: pointer;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: rgb(198, 219, 226);
  margin: 15% auto;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  position: relative;
  border-radius: 8px;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: red;
}

.modal-content h2 {
  text-align: center;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content label {
  margin-bottom: 5px;
}

.modal-content input,
.modal-content textarea,
.modal-content button {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.modal-content button {
  background-color: #48a444;
  color: white;
  border: none;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
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
