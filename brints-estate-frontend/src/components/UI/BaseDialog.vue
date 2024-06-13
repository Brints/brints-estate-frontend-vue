<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const tryClose = () => {
  if (props.fixed) return;
  emit("close");
};
</script>

<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <BaseButton type="button" label="Close" @click="tryClose"></BaseButton>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  background-color: white;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 101;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #fff;
}

section {
  padding: 1rem;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

menu {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #ccc;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    width: 40rem;
    left: calc(50% - 20rem);
  }
}
</style>
