<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  message: {
    type: String,
  },
});

const message = ref(props.message);
</script>

<template>
  <div v-if="message">{{ message }}</div>
</template>

<style scoped>
div {
  padding: 10px 20px;
  color: #f44336;
  margin-bottom: 5px;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
