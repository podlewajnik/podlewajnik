<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Add a new plant</h2>
      <form @submit.prevent="addPlant">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="plantName" required />

        <label for="location">Location:</label>
        <input type="text" id="location" v-model="plantLocation" optional />

        <label for="description">Description:</label>
        <input
          type="text"
          id="description"
          v-model="plantDescription"
          optional
        />

        <label for="watering">Watering:</label>
        <input type="text" id="watering" v-model="plantWatering" optional />

        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  name: 'AddPlantModal',
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ['close', 'plantAdded'],
  setup(props, { emit }) {
    const plantName = ref('');
    const plantLocation = ref('');
    const plantDescription = ref('');
    const plantWatering = ref('');

    const closeModal = () => {
      emit('close');
    };

    const addPlant = () => {
      const newPlant = {
        name: plantName.value,
        location: plantLocation.value,
        description: plantDescription.value,
        watering: plantWatering.value,
      };
      emit('plantAdded', newPlant);
      closeModal();
    };

    return {
      plantName,
      plantLocation,
      plantDescription,
      plantWatering,
      closeModal,
      addPlant,
    };
  },
});
</script>

<style scoped>
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
</style>
