<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Add a new plant</h2>
      <form @submit.prevent="addPlant">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="plantName" required minlength="1" maxlength="100" />

        <label for="location">Location:</label>
        <input type="text" id="location" v-model="plantLocation" optional maxlength="1000" />

        <label for="description">Description:</label>
        <input
          type="text"
          id="description"
          v-model="plantDescription"
          optional maxlength="1000"
        />

        <label for="watering">Watering:</label>
        <input type="text" id="watering" v-model="plantWatering" optional maxlength="1000" />

        <button type="submit">Add</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
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
    const errorMessage = ref('');
    const successMessage = ref('');

    watch(() => props.isOpen, () => {
      if (!props.isOpen) {
        resetForm();
      }
    });



    const resetForm = () => {
      plantName.value = '';
      plantLocation.value = '';
      plantDescription.value = '';
      plantWatering.value = '';
      errorMessage.value = '';
      successMessage.value = '';
    };

    const closeModal = () => {
      emit('close');
      resetForm(); // Reset form fields and messages when closing modal
    };

    const addPlant = async () => {
      try {
        // Validation for required name
        if (!plantName.value.trim()) {
          throw new Error('Name is required');
        }

        // Validation for maxlength
        if (plantName.value.length > 100) {
          throw new Error('Name exceeds maximum length of 100 characters');
        }
        if (plantName.value.trim() === ' ') {
          throw new Error('Name cannot be a single space');
        }

        if (plantLocation.value.length > 10) {
          throw new Error('Location exceeds maximum length of 1000 characters');
        }
        if (plantDescription.value.length > 10) {
          throw new Error('Description exceeds maximum length of 1000 characters');
        }
        if (plantWatering.value.length > 10) {
          throw new Error('Watering exceeds maximum length of 1000 characters');
        }
       const newPlant = {
        name: plantName.value,
        location: plantLocation.value,
        description: plantDescription.value,
        watering: plantWatering.value,
      };
      console.log('Adding plant:', newPlant);

      const response = await axios.post('http://localhost:8000/plants', newPlant);
      if (response.status === 200) {
          successMessage.value = 'Item added successfully!';
          errorMessage.value = '';
          emit('plantAdded', response.data);
          closeModal(); // Close modal on successful addition
        } else {
          throw new Error('Failed to add item');
        }
      } catch (error) {
        errorMessage.value = error.message || 'Failed to add item. Please try again.';
        successMessage.value = '';
      }
    };

    return {
      plantName,
      plantLocation,
      plantDescription,
      plantWatering,
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

.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
