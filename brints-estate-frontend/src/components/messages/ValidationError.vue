<script setup>
defineProps({
  model: { required: true },
});
</script>

<template>
  <small class="text-red-500" v-if="model.$invalid">
    <ul>
      <li v-for="error in model.$errors" :key="error">{{ error.$message }}</li>
    </ul>
  </small>
</template>

<style scoped></style>
