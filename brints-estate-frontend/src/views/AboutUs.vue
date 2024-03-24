<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const aboutUs = ref(null);
const loading = ref(false);

onMounted(() => {
  fetchAboutUs();
});

async function fetchAboutUs() {
  try {
    loading.value = true;
    const response = await axios.get("http://localhost:3001/admin/about-us");
    aboutUs.value = response.data.payload;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main>
    <section v-if="loading">Loading...</section>

    <section v-else-if="!loading && aboutUs && aboutUs > 0">
      <div v-for="item in aboutUs" :key="item.aboutId">
        <h1>{{ item.title }}</h1>
        <img :src="item.image[0].url" :alt="item.image[0].filename" />
        <p>{{ item.content }}</p>
      </div>
    </section>
    <section v-else>No Content yet.</section>
  </main>
</template>

<style scoped></style>
