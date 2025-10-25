<script setup>
import { ref } from "vue";

const date = ref(new Date().getFullYear());
const year = ref(date.value);
const month = ref(date.value);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

month.value = months[new Date().getMonth()];
year.value = new Date().getFullYear();

setInterval(() => {
  date.value = new Date().getFullYear();
  month.value = months[new Date().getMonth()];
  year.value = date.value;
}, 1000);
</script>

<template>
  <div class="text-center text-sm text-gray-500 dark:text-gray-400">
    <span>&copy; {{ month }} {{ year }} Brints Estate</span>
  </div>
</template>

<style module></style>
