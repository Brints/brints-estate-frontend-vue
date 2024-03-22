<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", createRipple);
  });
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
</script>

<template>
  <button class="btn">
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
  border-radius: 5px;
  overflow: hidden;
  margin: 20px;
}

.btn:focus {
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

@keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
</style>
