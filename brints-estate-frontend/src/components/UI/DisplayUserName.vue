<script setup>
import { onMounted, computed } from "vue";

import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const displayName = computed(() => {
  return authStore.user.fullname.split(" ")[0];
});

onMounted(() => {
  authStore.loadTokenFromLocalStorage();
});
</script>

<template>
  <section>
    {{ displayName }}
  </section>
</template>

<style scoped>
section {
  font-size: 1.5rem;
  font-weight: bold;
  color: #c9ab00;
}
</style>
