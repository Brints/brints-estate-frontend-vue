<script setup>
import BaseButton from "@/buttons/BaseButton.vue";

defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <BaseButton @click="tryClose">Close</BaseButton>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>
