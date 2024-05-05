<!-- <script setup>
import { ref } from "vue";

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

defineProps({
  special: {
    type: String,
  },
});
</script>

<template>
 <span v-if="special" @click="togglePassword">
    <font-awesome-icon :icon="isPasswordVisible ? 'eye' : 'eye-slash'" />
  </span> 

  <div>
    <font-awesome-icon :icon="isPasswordVisible ? 'eye' : 'eye-slash'" @click="togglePassword" />
  </div>
</template>

<style scoped></style> -->
