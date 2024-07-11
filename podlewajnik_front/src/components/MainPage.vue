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
  </div>

  <div class="logo-mobile">
    <img src="@/assets/logo.png" alt="Logo" />

    <div class="content">
      <div class="plant-list">
        <PlantTile
          v-for="plant in plants"
          :key="plant.id"
          :name="plant.name"
          :description="plant.description"
          :location="plant.location"
          :watering="plant.watering"
          :imageUrl="plant.imageUrl"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import AddPlantModal from './AddPlantModal.vue';
import PlantTile from '@/components/PlantTile.vue';
import { useRouter } from 'vue-router';

interface Plant {
  id: number;
  name: string;
  description: string;
  location: string;
  watering: string;
  imageUrl: string;
}

export default defineComponent({
  name: 'MainPage',
  components: {
    AddPlantModal,
    PlantTile,
  },
  setup() {
    const mainMessage = ref('Welcome!'); // TODO: Add usage of API response
    const showFramedText = ref(true);
    const isModalOpen = ref(false);
    const userName = ref('');
    const plants = ref<Plant[]>([]);
    const authToken = localStorage.getItem('authToken');
    const router = useRouter()

    // const changeMainMessage = () => {
    //   if (mainMessage.value === 'Welcome XYZ!') {
    //     mainMessage.value = 'Your Plants Page';
    //   }
    // };

    const hideFramedText = () => {
      showFramedText.value = false;
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const handlePlantAdded = (newPlant: {
      name: string;
      location: string;
      description: string;
      watering: string;
    }) => {
      console.log('New plant added:', newPlant);
    };

    // const fetchPlants = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8000/plants', {
    //       headers: {
    //       //   Authorization: `Bearer ${token}`,
    //       // },
    //     });
    //     plants.value = response.data;
    //   } catch (error) {
    //     console.error('Error fetching plants:', error);
    //   }
    // };
    const fetchUserName = async () => {
      if (authToken) {
        try {
          const response = await axios.get('users/whoami', {
            headers: {
              Authorization: authToken,
            },
          });
          userName.value = response.data.fullname;
          mainMessage.value = `Welcome, ${userName.value}!`;
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      } else {
        console.error('No auth token found');
      }
    };

    const changeMainMessage = () => {
      if (mainMessage.value.startsWith('Welcome')) {
        mainMessage.value = 'Your Plants Page';
      }
    };
    const logout = () => {
      localStorage.removeItem('authToken');
      document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;"; // Expire the cookie
      router.push('/login-page'); // Redirect to login page
    };


    onMounted(() => {
      fetchUserName();
      // fetchPlants();
    });

    return {
      mainMessage,
      showFramedText,
      isModalOpen,
      plants,
      changeMainMessage,
      hideFramedText,
      openModal,
      closeModal,
      handlePlantAdded,
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
  background-color: #281879;
  color: rgb(214, 213, 225);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: -15px;
  margin-right: 20px;
}

.logout-button:hover {
  background-color: #d32f2f;
}

.main-message {
  background-color: lightblue;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

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
