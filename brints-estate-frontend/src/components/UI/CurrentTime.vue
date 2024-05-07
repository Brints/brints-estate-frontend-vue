<script setup>
import { ref, onMounted } from "vue";

const hour = ref("");
const minute = ref("");
const seconds = ref("");
const ampm = ref("");

onMounted(() => {
  setInterval(() => {
    const date = new Date();
    // hour should be in 12-hour format and prepend 0 if less than 10
    hour.value = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    minute.value = date.getMinutes().toString().padStart(2, "0");
    seconds.value = date.getSeconds().toString().padStart(2, "0");
    ampm.value = date.getHours() >= 12 ? "PM" : "AM";
  }, 1000);
});
</script>

<template>
  <div class="current-time">
    <span>Current Time: </span>
    <span class="hour">{{ hour }}</span
    >:<span class="minute">{{ minute }}</span
    >:<span class="second">{{ seconds }}</span> <span class="ampm">{{ ampm }}</span>
  </div>
</template>

<style scoped></style>
