<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const aboutUs = ref(null);
const loading = ref(false);

onMounted(() => {
  fetchAboutUs();
});

const url = import.meta.env.VITE_BACKEND_URL;

async function fetchAboutUs() {
  try {
    loading.value = true;
    const response = await axios.get(`${url}/admin/about-us`);
    aboutUs.value = response.data.payload;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <main className="flex flex-col min-h-screen">
    <nav className="h-20">
      <router-link to="/">Home</router-link>
      <router-link to="/about-us">About Us</router-link>
      <router-link to="/contact-us">Contact Us</router-link>
    </nav>
    <section v-if="loading" className="place-items-center">Loading...</section>

    <section v-else-if="aboutUs">
      <div v-for="item in aboutUs" :key="item._id">
        <h1>{{ item.title }}</h1>
        <div
          class="image relative bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url('${item.image[0].url}')` }"
        >
          <h1
            className="bg-zinc-300 rounded-lg text-xl absolute top-1/2 left-5 w-80 p-6 text-emerald-700 "
          >
            Looking for apartment? Do you have a property for sale or lease?
            Brints Estate got you covered.
          </h1>
        </div>
        <p>{{ item.content }}</p>
      </div>
    </section>

    <section class="no-content" v-else>
      <p>No Content yet.</p>
    </section>
  </main>
</template>

<style scoped>
.no-content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: calc(100vh - 5rem);
}

.image {
  width: 100%;
  height: calc(100vh - 5rem);
}
</style>
