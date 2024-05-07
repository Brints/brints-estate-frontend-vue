<script setup>
defineProps({
  legend: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
  },
});
</script>

<template>
  <form novalidate class="main_form">
    <fieldset>
      <legend v-if="legend" :legend="legend" :class="mode">
        <h1>{{ legend }}</h1>
      </legend>
      <slot name="content"></slot>
    </fieldset>
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

fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
}

legend {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0 10px;
}

.signup {
  font-size: 1.5rem;
  line-height: 2rem;
  color: #dd0707;
}
</style>
