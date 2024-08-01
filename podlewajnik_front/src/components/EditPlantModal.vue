<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <button class="close-x" @click="closeEditModal">x</button>
        <h2>Edit Plant</h2>
        <form @submit.prevent="saveEdit">
          <label for="name">Name</label>
          <input v-model="editedPlant.name" type="text" id="name" />
  
          <label for="location">Location</label>
          <input v-model="editedPlant.location" type="text" id="location" />
  
          <label for="description">Description</label>
          <textarea v-model="editedPlant.description" id="description"></textarea>
  
          <label for="watering">Watering</label>
          <input v-model="editedPlant.watering" type="text" id="watering" />
  
        
  
          <div class="buttons">
            <button type="submit">Save</button>
            <button type="button" @click="closeEditModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';
  import { Plant } from '../interfaces/Plant';
  
  export default defineComponent({
    name: 'EditPlantModal',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      plant: {
      type: Object as PropType<Plant | null>,
      required: true,
      }
    },
    emits: ['close', 'save'],
  setup(props, { emit }) {
    const defaultPlant: Plant = {
      id: 0,
      name: '',
      description: '',
      location: '',
      watering: '',
      imageUrl: ''
    };

    const editedPlant = ref<Plant>({ ...defaultPlant, ...props.plant });
  
      watch(() => props.plant, (newPlant) => {
        editedPlant.value = { ...defaultPlant, ...newPlant };
      });
  
      const closeEditModal = () => {
        emit('close');
      };
  
      const saveEdit = () => {
        emit('save', editedPlant.value);
      };
  
      return {
        editedPlant,
        closeEditModal,
        saveEdit
      };
    }
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
    z-index: 20; 
  }
  
  .modal-content {
    background-color: rgb(173, 217, 209);
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    text-align: left;
    position: relative;
    border-radius: 10px;
    z-index: 21;
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
  