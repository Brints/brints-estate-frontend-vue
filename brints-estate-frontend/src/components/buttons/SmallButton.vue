<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  button: {
    type: String,
  },
});
</script>

<template>
  <button :type="type" :label="label" :class="[button, 'small_button']">
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.small_button {
  background-color: #363333;
  padding: 3px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}

.small_button:hover {
  filter: brightness(160%);
  transition: all 1s ease-in-out;
}

.generate_password {
  position: absolute;
  bottom: 9.02rem;
  left: 12rem;
  background-color: #050555;
  border: 2px solid #0c0b0b;
}
</style>
