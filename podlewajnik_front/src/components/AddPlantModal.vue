<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Add a new plant</h2>
      <form @submit.prevent="addPlant">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="plantName" maxlength="100" />

        <label for="location">Location:</label>
        <input
          type="text"
          id="location"
          v-model="plantLocation"
          maxlength="1000"
        />

        <label for="description">Description:</label>
        <input
          type="text"
          id="description"
          v-model="plantDescription"
          maxlength="1000"
        />

        <label for="watering">Watering:</label>
        <input
          type="text"
          id="watering"
          v-model="plantWatering"
          maxlength="1000"
        />

        <button type="submit">Add</button>
      </form>
      <div v-if="nameError" class="error-message">{{ nameError }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';
import axios from 'axios';

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
    const nameError = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');

    watch(
      () => props.isOpen,
      () => {
        if (!props.isOpen) {
          resetForm();
        }
      },
    );

    const resetForm = () => {
      plantName.value = '';
      plantLocation.value = '';
      plantDescription.value = '';
      plantWatering.value = '';
      nameError.value = '';
      errorMessage.value = '';
      successMessage.value = '';
    };

    const closeModal = () => {
      emit('close');
      resetForm();
    };

    const fetchPlants = async () => {
      try {
        const response = await axios.get('/plants');
        return response.data;
      } catch (error) {
        console.error('Error fetching plants:', error);
        return [];
      }
    };

    const addPlant = async () => {
      try {
        if (!plantName.value.trim()) {
          throw new Error('Name is required');
        }

        if (plantName.value.length > 100) {
          throw new Error('Name exceeds maximum length of 100 characters');
        }

        const plants = await fetchPlants();
        const isUnique = !plants.some(
          (plant: { name: string }) =>
            plant.name.toLowerCase() === plantName.value.toLowerCase(),
        );
        if (!isUnique) {
          throw new Error('Name must be unique');
        }

        nameError.value = '';

        const newPlant = {
          name: plantName.value,
          location: plantLocation.value,
          description: plantDescription.value,
          watering: plantWatering.value,
        };

        const response = await axios.post('plants', newPlant);

        if (response.status === 200) {
          successMessage.value = 'Plant added successfully!';
          errorMessage.value = '';
          emit('plantAdded', response.data);
          closeModal();
        } else {
          throw new Error('Failed to add plant');
        }
      } catch (error) {
        errorMessage.value =
          (error as Error).message || 'Failed to add plant. Please try again.';
        successMessage.value = '';
      }
    };

    return {
      plantName,
      plantLocation,
      plantDescription,
      plantWatering,
      nameError,
      closeModal,
      addPlant,
      errorMessage,
      successMessage,
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
  background-color: rgb(173, 217, 209);
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

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.success-message {
  color: green;
  margin-top: 10px;
  text-align: center;
}
</style>
