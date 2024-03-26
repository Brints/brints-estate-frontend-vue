<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },

  data() {
    return {
      inputValue: this.value,
    };
  },

  watch: {
    value(newValue) {
      this.inputValue = newValue;
    },
  },
};
</script>

<template>
  <div :class="$style.form_group">
    <label :for="id"
      ><slot name="label">{{ label }}</slot></label
    >
    <slot name="input">
      <input
        :class="$style.form_control"
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="$emit('input', $event.target.value)"
      />
    </slot>
  </div>
</template>

<style module>
.form_group {
  margin-bottom: 1rem;
}

.form_group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form_control {
  width: 100%;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
