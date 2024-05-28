<!-- <script setup>
defineProps({
  legend: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
  },
});
</script> -->

<!-- <template>
  <form novalidate class="main_form">
    <fieldset>
      <legend v-if="legend" :legend="legend" :class="mode">
        <h1>{{ legend }}</h1>
      </legend>
      <slot name="content"></slot>
    </fieldset>
  </form>
</template> -->

<script setup>
const emit = defineEmits(["submit"]);

const handleSubmit = () => {
  emit("submit");
};
</script>

<template>
  <form novalidate class="main_form" @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<style scoped>
.main_form {
  position: relative;
  width: 100%;
  max-width: 798px;
  margin: 0 auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
</style>
