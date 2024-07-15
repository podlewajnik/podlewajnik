<template>
  <div class="tile">
    <img :src="imageSrc" alt="Item Image" class="tile-image" />
    <div class="tile-content">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
      <p><strong>Location:</strong> {{ location }}</p>
      <p><strong>Watering:</strong> {{ watering }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import placeholderImage from '@/assets/placeholder.png';

export default defineComponent({
  name: 'PlantTile',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    watering: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
      default: '', // Default to an empty string if not provided
    },
  },
  setup(props) {
    const imageSrc = computed(() => props.imageUrl || placeholderImage);

    return {
      imageSrc,
    };
  },
});
</script>

<style scoped>
.tile {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  padding: 15px;
  border: 2px solid #a0a0a0;
  border-radius: 15px;
  margin: 10px;
  background-color: #9fd8d3; /* Change background color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height as needed */
  background-color: #fff; /* Optional: background color for the image container */
  border-radius: 5px;
  overflow: hidden;
}

.tile-image {
  margin: auto;
  max-width: 50%;
  max-height: 100%;
  object-fit: cover; /* Ensure image covers the area without stretching */
}

.tile-content {
  margin-top: 10px;
  text-align: left; /* Center the text content */
  flex-grow: 1; /* Ensure content area grows to fill available space */
}
</style>
