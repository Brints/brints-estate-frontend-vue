<script setup>
import { ref } from "vue";

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
});

const message = ref("");

watch(() => {
  message.value = "";
  for (const key in props.model.$params) {
    if (!props.model[key].$dirty) {
      continue;
    }
    if (!props.model[key].$error) {
      continue;
    }
    message.value = props.model[key].$message;
  }
});
</script>

<template>
  <small v-if="message" :class="$style.text_danger">{{ message }}</small>
</template>

<style module>
.text_danger {
  color: red;
}

.form-group {
  margin-bottom: 1rem;
}
</style>
