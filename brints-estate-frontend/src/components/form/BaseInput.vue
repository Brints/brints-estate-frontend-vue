<script setup>
import { ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

const inputValue = ref(props.value);

const watchValue = () => {
  inputValue.value = props.value;
};

const watchInputValue = () => {
  inputValue.value = props.value;
};

watchValue();
watchInputValue();
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
        v-model.trim="inputValue"
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
  height: 3rem;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

<!-- <script>
  export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
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
    inputValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script> -->
