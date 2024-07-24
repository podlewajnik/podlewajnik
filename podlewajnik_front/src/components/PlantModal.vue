<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal">
      <button class="close-x" @click="close">x</button>
      <h2>{{ plant?.name }}</h2>
      <img :src="imageSrc" alt="Plant Image" class="plant-image" />
      <p>{{ plant?.description }}</p>
      <p><strong>Location:</strong> {{ plant?.location }}</p>
      <p><strong>Watering:</strong> {{ plant?.watering }}</p>
      <button @click="edit">Edit</button>
      <button @click="confirmDelete">Delete</button>
      <button @click="close">Close</button>
    </div>

    <div v-if="showConfirmDialog" class="confirm-dialog">
      <p>Are you sure you want to delete this plant?</p>
      <button @click="deletePlant">Yes</button>
      <button @click="cancelDelete">No</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { Plant } from '../interfaces/Plant';
import placeholderImage from '@/assets/placeholder.png';

export default defineComponent({
  name: 'PlantModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    plant: {
      type: Object as PropType<Plant | null>,
      required: true,
    },
  },
  emits: ['close', 'edit', 'delete'],
  setup(props, { emit }) {
    const showConfirmDialog = ref(false);

    const close = () => {
      emit('close');
    };

    const edit = () => {
      if (props.plant) {
        emit('edit', props.plant);
      }
    };

    const confirmDelete = () => {
      showConfirmDialog.value = true;
    };

    const deletePlant = () => {
      if (props.plant) {
        emit('delete', props.plant);
      }
      showConfirmDialog.value = false;
      close();
    };

    const cancelDelete = () => {
      showConfirmDialog.value = false;
    };

    const imageSrc = computed(() => {
      return props.plant?.imageUrl || placeholderImage;
    });

    return {
      close,
      edit,
      confirmDelete,
      deletePlant,
      cancelDelete,
      showConfirmDialog,
      imageSrc,
    };
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
  z-index: 10;
}

.modal {
  background: rgb(173, 217, 209);
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 90%;
  max-width: 500px;
  text-align: center;
  z-index: 11;
}

.close-x {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.close-x:hover {
  color: red;
}
.plant-image {
  width: 50%;
  height: auto;
  margin: 10px 0;
}

button {
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.confirm-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(52, 133, 140);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 12; /* Ensure it appears above the modal */
}

.confirm-dialog button {
  margin: 10px;
}
</style>

