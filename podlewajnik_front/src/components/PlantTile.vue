<template>
  <div class="tile">
    <div class="image-container">
      <img :src="imageSrc" alt="Item Image" class="tile-image" />
    </div>
    <div class="tile-content">
      <h3>{{ truncatedName }}</h3>
       <p class="tile-section"><strong>Description:</strong> {{ description }}</p>
       <p class="tile-section"><strong>Location:</strong> {{ location }}</p>
     
      <p class="tile-section"><strong>Watering:</strong> {{ watering }}</p>
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
    const maxLength = 25; // Maximum length for the plant name

    const truncateText = (text: string, length: number): string => {
      return text.length > length ? text.slice(0, length) + '...' : text;
    };

    const truncatedName = computed(() => truncateText(props.name, maxLength));
    const imageSrc = computed(() => props.imageUrl || placeholderImage);

    return {
      imageSrc,
      truncatedName,
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
 
  border-radius: 5px;
  overflow: hidden;
}

.tile-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; /* Ensure image covers the area without stretching */
}

.tile-content {
  margin-top: 10px;
  text-align: left;
  flex-grow: 1;
}

.tile-section {
  margin-top: 8px; /* Adjust spacing between sections */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Limit to 2 lines */
  line-height: 1.5em; /* Line height for text */
  max-height: 3em; /* 2 lines * 1.5em */
}

.tile-section strong {
  font-weight: bold;
}

h3 {
  text-align: center;
}
</style>