<script setup>
defineProps({
  model: { required: true },
});
</script>

<template>
  <div v-if="model.$invalid">
    <small class="invalid-feedback" v-for="(error, index) in model.$errors" :key="index">{{ error.$message }}</small>
  </div>
</template>

<style scoped>
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}
</style>
