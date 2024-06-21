<script setup>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

// const emojis = ["👋", "🌞", "🌜", "🌅", "🌇", "🌄", "🌆", "🌃", "🌌", "🌠", "🌈"];

function greeting() {
  const date = new Date();
  const hours = date.getHours();
  let greeting = "";

  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return greeting;
}

const displayGreeting = computed(() => {
  const lastLogin = new Date(authStore.user.last_login);
  const now = new Date();
  const diff = now - lastLogin;
  const TenDays = 1000 * 60 * 60 * 24 * 10;
  const loginDays = Math.floor(diff / TenDays);

  return loginDays > 10 ? `Welcome back!` : `${greeting()}`;
});

onMounted(() => {
  authStore.loadTokenFromLocalStorage();
});
</script>

<template>
  <div>
    {{ displayGreeting }}
  </div>
</template>

<style scoped>
div {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

div::before {
  content: "👋 ";
}

div::after {
  content: "!";
}

div::before,
div::after {
  font-size: 2rem;
}

@media (max-width: 768px) {
  div {
    font-size: 1.2rem;
  }

  div::before,
  div::after {
    font-size: 1.5rem;
  }
}
</style>
