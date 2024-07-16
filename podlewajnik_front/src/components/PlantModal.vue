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
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
      required: false,
    },
  },
  emits: ['close', 'edit'],
  computed: {
    imageSrc(): string {
      return this.plant?.imageUrl || placeholderImage;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    edit() {
      if (this.plant) {
        this.$emit('edit', this.plant);
      }
    },
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
  text-align: center;
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
</style>
