<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const aboutUs = ref(null);
const loading = ref(false);

onMounted(() => {
  fetchAboutUs();
});

const url = import.meta.env.VITE_BACKEND_URL;
console.log(url);

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
  <main className="flex flex-col min-h-screen justify-center items-center">
    <section v-if="loading">Loading...</section>
    <section v-else-if="aboutUs">
      <div v-for="item in aboutUs" :key="item._id">
        <h1>{{ item.title }}</h1>
        <img :src="item.image[0].url" :alt="item.image[0].filename" />
        <p>{{ item.content }}</p>
      </div>
    </section>
    <section className="text-center text-lg" v-else>No Content yet.</section>
  </main>
</template>

<style scoped></style>
