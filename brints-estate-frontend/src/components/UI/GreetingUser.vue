<script setup>
import { computed } from "vue";

// const emojis = ["👋", "🌞", "🌜", "🌅", "🌇", "🌄", "🌆", "🌃", "🌌", "🌠", "🌈"];

const greeting = computed(() => {
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
});
</script>

<template>
  <div>
    {{ greeting }}
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
