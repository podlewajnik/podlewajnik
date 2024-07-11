<template>
    <div class="item-tile">
      <img :src="imageUrl" alt="Item Image" />
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
      <p><strong>Location:</strong> {{ location }}</p>
      <p><strong>Watering:</strong> {{ watering }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  interface Plant {
    id: number;
    name: string;
    location: string;
    description: string;
    watering: string;
  }
  
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
      required: true,
    },
  },
  setup(props) {
    const placeholderImage = require('@/assets/placeholder.png');
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
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .tile-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .tile-content {
    margin-top: 10px;
  }
  </style>
  