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
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.$emit("input", file);
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
        type="file"
        :id="id"
        :name="name"
        @input="$emit('input', $event.target.value)"
        @change="onFileChange"
        :multiple="multiple"
      />
    </slot>
  </div>
</template>

<style module>
.form_group {
  margin-bottom: 1rem;
}

.form_control {
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
