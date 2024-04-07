<script></script>

<template>
  <!-- @submit.prevent="$emit('submit-form')" -->
  <form :class="$style.main_form">
    <fieldset>
      <legend>
        <slot name="legend"></slot>
      </legend>
      <slot name="info"></slot>
      <slot name="content"></slot>
    </fieldset>
  </form>
</template>

<style module>
.main_form {
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
  margin: 20px 0;
}

legend {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0 10px;
}
</style>
