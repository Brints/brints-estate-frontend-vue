<script setup>
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();

authStore.loadTokenFromLocalStorage();
</script>

<template>
  <div>
    <section v-if="authStore.isLoggedIn">
      {{ authStore.user.fullname }}
    </section>
  </div>
</template>

<style scoped>
div {
  width: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

section {
  width: 80%;
}
</style>
