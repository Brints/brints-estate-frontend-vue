<!-- <script setup>
// import { onMounted, ref } from "vue";
import { ref } from "vue";

const buttonType = ref(null);
// let hasListener = false;

// function attachRippleListener(button) {
//   if (hasListener) return;
//   button.addEventListener("click", createRipple);
//   hasListener = true;
// }

defineProps({
  type: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// function createRipple(e) {
//   const circle = document.createElement("span");
//   const x = e.clientX - e.target.offsetLeft;
//   const y = e.clientY - e.target.offsetTop;

//   circle.classList.add("circle");

//   circle.style.left = `${x}px`;
//   circle.style.top = `${y}px`;

//   e.target.appendChild(circle);

//   setTimeout(() => circle.remove(), 500);
// }

// onMounted(() => {
//   attachRippleListener(buttonType.value);
// });
</script> -->

<!-- <template>
  <button :ref="buttonType" :type="type" :class="mode" :disabled="disabled">
    <slot></slot>
  </button>
</template> -->

<!-- <style scoped>
button {
  position: relative;
  padding: 10px 20px;
  border: none;
  background-color: rgb(79 70 229);
  color: #f5f5f5;
  font-size: 1rem;
  text-transform: capitalize;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 6px;
  overflow: hidden;
}

button:hover {
  filter: brightness(1.2);
  transition: all 0.4s ease-in-out;
}

button:focus {
  outline: none;
}

/* button .circle {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: scale 0.5s ease-in-out;
} */

.reset_btn {
  background-color: rgb(88, 9, 9);
}

.signup {
  background-color: var(--vt-c-indigo);
}

/* @keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
} */
</style> -->

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  mode: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button :type="type" :class="mode" :label="label" :disabled="disabled">{{ label }}</button>
</template>

<style scoped>
button {
  position: relative;
  padding: 10px 20px;
  border: none;
  background-color: rgb(79 70 229);
  color: #f5f5f5;
  font-size: 1rem;
  text-transform: capitalize;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 6px;
  overflow: hidden;
}

button:hover {
  filter: brightness(1.2);
  transition: all 0.4s ease-in-out;
}

button:focus {
  outline: none;
}

.reset_btn {
  background-color: rgb(88, 9, 9);
}

.signup {
  background-color: var(--vt-c-indigo);
}
</style>
