<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal">
      <button class="close-x" @click="close">x</button>
      <h2>Edit Plant</h2>
      <form @submit.prevent="save">
        <label for="name">Name:</label>
        <input id="name" v-model="formData.name" type="text" required />

        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
        ></textarea>

        <label for="location">Location:</label>
        <input id="location" v-model="formData.location" type="text" required />

        <label for="watering">Watering:</label>
        <input id="watering" v-model="formData.watering" type="text" required />

        <div class="buttons">
          <button type="button" @click="close">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from 'vue';
import { Plant } from '../interfaces/Plant';

export default defineComponent({
  name: 'EditPlantModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    plant: {
      type: Object as PropType<Plant | null>,
      required: false,
    },
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const formData = reactive({
      name: '',
      description: '',
      location: '',
      watering: '',
    });

    watch(
      () => props.plant,
      (newPlant) => {
        if (newPlant) {
          formData.name = newPlant.name;
          formData.description = newPlant.description;
          formData.location = newPlant.location;
          formData.watering = newPlant.watering;
        }
      },
      { immediate: true },
    );

    const close = () => {
      emit('close');
    };

    const save = () => {
      emit('save', { ...formData });
      close();
    };

    return { formData, close, save };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: rgb(173, 217, 209);
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 90%;
  max-width: 500px;
  text-align: left;
}
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  text-align: left;
}

.close-x {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.close-x:hover {
  color: red;
}

form {
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
}

label {
  margin: 10px 0 5px;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

button {
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
