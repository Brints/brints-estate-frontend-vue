<script setup>
defineProps({
  mode: {
    type: String,
  },
});
</script>
<template>
  <div :class="['card', mode]">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}

.card + .card {
  margin-top: 16px;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
