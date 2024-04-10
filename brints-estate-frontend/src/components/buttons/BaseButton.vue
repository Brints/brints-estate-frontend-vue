<script setup>
import { onMounted, defineProps, ref } from "vue";

const buttonType = ref(null);
let hasListener = false;

function attachRippleListener(button) {
  if (hasListener) return;
  button.addEventListener("click", createRipple);
  hasListener = true;
}

defineProps({
  type: {
    type: String,
  },
  status: {
    type: String,
  },
});

function createRipple(e) {
  const circle = document.createElement("span");
  const x = e.clientX - e.target.offsetLeft;
  const y = e.clientY - e.target.offsetTop;

  circle.classList.add("circle");

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  e.target.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
}

onMounted(() => {
  attachRippleListener(buttonType.value);
});
</script>

<template>
  <button ref="buttonType" :type="type" :class="status">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  position: relative;
  padding: 10px 20px;
  border: none;
  background-color: rgb(79 70 229);
  color: #f5f5f5;
  font-size: 0.9rem;
  text-transform: capitalize;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 6px;
  overflow: hidden;
  /* margin: 10px; */
}

button:focus {
  outline: none;
}

button .circle {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: scale 0.5s ease-in-out;
}

.reset_btn {
  background-color: rgb(88, 9, 9);
}

@keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
</style>
