<script setup>
import { ref } from "vue";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  icon: {
    type: String,
    default: "",
  },
  special: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});

const inputValue = ref(props.value);
const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

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
    <div :class="$style.label_group">
      <span><font-awesome-icon :icon="icon" /></span>
      <label :for="id">{{ label }}<span class="text-red-500">*</span></label>
    </div>

    <input
      :type="type === 'password' && isPasswordVisible ? 'text' : type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      v-model.trim="inputValue"
    />

    <span v-if="special" :class="$style.special" @click="togglePassword">
      <font-awesome-icon :icon="isPasswordVisible ? 'eye' : 'eye-slash'" />
    </span>
    <slot name="error" :error="error"></slot>
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

.label_group {
  display: flex;
  gap: 0.5rem;
}

input {
  width: 100%;
  height: 3rem;
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus {
  outline: none;
  border-color: #2563eb;
}

.special {
  position: relative;
  cursor: pointer;
  top: -2.27rem;
  right: -21.17rem;
}
</style>
