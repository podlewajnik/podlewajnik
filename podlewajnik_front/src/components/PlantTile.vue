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
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 10px;
    background-color: #79c2d0;
    border-color: #a0a0a0;
  }
  
  .tile-image {
    width: 30%; /* Adjust this to make the image smaller */
    height: auto;
    border-radius: 5px;
    object-fit: cover;
    
    
  }
  
  
  .tile-content {
    margin-top: 10px;
    
  }
  </style>
  