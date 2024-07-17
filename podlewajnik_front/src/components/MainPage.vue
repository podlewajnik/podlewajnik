<template>
  <div class="main-page" @click="changeMainMessage">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
    </div>
    <header class="main-message">
      <button @click="logout" class="logout-button">Logout</button>
      {{ mainMessage }}
    </header>
    <div class="framed-text" v-if="showFramedText">
      <p>
        Add some plants and details about them. If you want to get a
        notification about watering, add your email and date of
      </p>
      <button @click="hideFramedText">Got it!</button>
    </div>
    <button @click="openModal" class="add-button">Add plant</button>
    <AddPlantModal
      :isOpen="isModalOpen"
      @close="closeModal"
      @plantAdded="handlePlantAdded"
    />

    <div class="content">
      <div class="tiles">
        <PlantTile
          v-for="plant in plants"
          :key="plant.id"
          :name="plant.name"
          :description="plant.description"
          :location="plant.location"
          :watering="plant.watering"
          :imageUrl="plant.imageUrl"
          @click="openPlantModal(plant)"
        />
      </div>
    </div>
    <PlantModal
      :isOpen="isPlantModalOpen"
      :plant="selectedPlant"
      @close="closePlantModal"
      @edit="openEditModal"
    />
    <EditPlantModal
      :isOpen="isEditModalOpen"
      :plant="selectedPlant"
      @close="closeEditModal"
      @save="savePlant"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import AddPlantModal from './AddPlantModal.vue';
import PlantTile from '@/components/PlantTile.vue';
import PlantModal from '@/components/PlantModal.vue';
import EditPlantModal from '@/components/EditPlantModal.vue';
import { useRouter } from 'vue-router';
import { Plant } from '../interfaces/Plant';

export default defineComponent({
  name: 'MainPage',
  components: {
    AddPlantModal,
    PlantTile,
    PlantModal,
    EditPlantModal,
  },
  setup() {
    const mainMessage = ref('Welcome!');
    const showFramedText = ref(true);
    const isModalOpen = ref(false);
    const isPlantModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const selectedPlant = ref<Plant | null>(null);
    const userName = ref('');
    const plants = ref<Plant[]>([]);
    const router = useRouter();

    const hideFramedText = () => {
      showFramedText.value = false;
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const openPlantModal = (plant: Plant) => {
      selectedPlant.value = plant;
      isPlantModalOpen.value = true;
    };

    const closePlantModal = () => {
      isPlantModalOpen.value = false;
    };

    const openEditModal = () => {
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
    };

    const editPlant = (plant: Plant) => {
      selectedPlant.value = plant;
      openEditModal();
    };

    const handlePlantUpdated = (updatedPlant: Plant) => {
      const index = plants.value.findIndex((plant) => plant.id === updatedPlant.id);
      if (index !== -1) {
        plants.value[index] = updatedPlant;
      }
      closeEditModal();
    };

    const savePlant = async (updatedPlant: Plant) => {
  try {
    await axios.patch(`http://localhost:8000/plant/${updatedPlant.id}`, {
      title: updatedPlant.name,
      content: updatedPlant.description,
      // Include other fields as needed
    });
    // Update plants array or perform other actions upon successful update
  } catch (error) {
    console.error('Error saving plant:', error);
  }
  closeEditModal();
};

    const handlePlantAdded = (newPlant: {
      name: string;
      location: string;
      description: string;
      watering: string;
    }) => {
      console.log('New plant added:', newPlant);
    };

    const fetchPlants = async () => {
      try {
        const response = await axios.get('plants');
        plants.value = response.data.map((plant: any) => ({
          ...plant,
          imageUrl: plant.imageUrl || '', // Ensure imageUrl is always present
        }));
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    const fetchUserName = async () => {
      try {
        const response = await axios.get('users/whoami');
        userName.value = response.data.fullname;
        mainMessage.value = `Welcome, ${userName.value}!`;
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    const changeMainMessage = () => {
      if (mainMessage.value.startsWith('Welcome')) {
        mainMessage.value = 'Your Plants Page';
      }
    };

    const logout = async () => {
      await axios.post('logout');
      router.push('/login-page');
    };

    onMounted(() => {
      fetchUserName();
      fetchPlants();
    });

    return {
      mainMessage,
      showFramedText,
      isModalOpen,
      isPlantModalOpen,
      isEditModalOpen,
      selectedPlant,
      plants,
      changeMainMessage,
      hideFramedText,
      openModal,
      closeModal,
      openPlantModal,
      closePlantModal,
      openEditModal,
      closeEditModal,
      savePlant,
      handlePlantAdded,
      editPlant,
      handlePlantUpdated,
      logout,
    };
  },
});
</script>




<style scoped>
.main-page {
  text-align: left;
  margin-top: 50px;
  margin-left: 35px;
  position: relative;
}

.header {
  position: absolute;
  top: -30px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
    border-bottom: 1px solid #ccc;
}

.logo img {
  width: 290px;
  height: auto;
  margin-right: 35px;
}

.logo-mobile {
  display: none;
}

.logo-mobile img {
  width: 100%;
  max-width: 350px;
  height: auto;
  margin-top: 20px;
}

.logout-button {
  background-color: #0d3828;
  color: rgb(214, 213, 225);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: -15px;
  margin-right: 20px;
}

.logout-button:hover {
  background-color: #2e47ab;
}

.main-message {
  background-color:  #84d1cb;
  ;
  padding: 10px;
  font-size: 25px;
  cursor: pointer;
}

.framed-text {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  position: relative;
  text-align: center;
  background-color: rgb(197, 223, 197);
  border-radius: 8px;
}

.framed-button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.add-button {
  padding: 10px 20px;
  font-size: 18px;
  margin-top: 40px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .header .logo {
    display: none;
  }

  .logo-mobile {
    display: block;
    margin-top: 20px;
  }
}

.tiles {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns layout */
  gap: 15px;
  padding: 150px;
  justify-items: center; /* Center the items horizontally */
  cursor: pointer;
}


@media (max-width: 900px) {
  .tiles {
    grid-template-columns: 1fr; /* Single column layout for mobile */
  }
}
</style>

