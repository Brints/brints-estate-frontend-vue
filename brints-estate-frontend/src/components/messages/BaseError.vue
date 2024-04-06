<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div v-if="message">{{ message }}</div>
</template>
