<script setup>
import { ref, computed } from 'vue'
</script>

<template>
  <div :class="$style.wrapper">
    <h1>Brints Estate Frontend - Landing Page</h1>
    <p>Where you can find your dream home</p>
  </div>
</template>

<style module>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  place-items: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
