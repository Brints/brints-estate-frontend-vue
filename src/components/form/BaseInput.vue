<script setup>
import { ref } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash, faLock, faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

// import the fontawesome icon
library.add(faEye, faEyeSlash, faLock, faUser, faEnvelope, faPhone);

defineProps({
  id: {
    type: String,
    required: true,
    validator: (value) => {
      return value.length > 0;
    },
  },
  label: {
    type: String,
    required: true,
    validator: (value) => {
      return value.length > 0;
    },
  },
  type: {
    type: String,
    required: true,
    default: "text",
    validator: (value) => {
      return ["text", "email", "password", "tel"].includes(value);
    },
  },
  name: {
    type: String,
    required: true,
    validator: (value) => {
      return value.length > 0;
    },
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
  asterisk: {
    type: String,
    validator: (value) => {
      return value.length > 0;
    },
  },
  special: {
    type: String,
    validator: (value) => {
      return value.length > 0;
    },
  },
  special_icon: {
    type: String,
    validator: (value) => {
      return value.length > 0;
    },
  },
  isError: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  isInvalid: {
    type: Boolean,
    default: false,
  },
});

// emit the input event
defineEmits(["update:modelValue"]);

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <div class="base-input">
    <div class="label_group">
      <span><font-awesome-icon :icon="icon" /></span>
      <label :for="id">
        {{ label }}
        <span v-if="asterisk" class="text-red-500">{{ asterisk }}</span>
      </label>
    </div>

    <div class="input-group">
      <input
        :type="type === 'password' && isPasswordVisible ? 'text' : type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ 'is-invalid': isInvalid }"
      />
      <span v-if="special" :class="special_icon">
        <font-awesome-icon :icon="isPasswordVisible ? 'eye' : 'eye-slash'" @click="togglePassword" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.label_group label {
  margin-bottom: 0.5rem;
}

.label_group {
  display: flex;
  gap: 0.5rem;
}

.input-group {
  position: relative;
  display: grid;
  grid-template-rows: 1fr minmax(1rem);
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

.password_eye,
.confirm_eye {
  cursor: pointer;
  position: absolute;
  bottom: 0.7rem;
  left: 21rem;
}

.login_eye_icon {
  cursor: pointer;
  position: absolute;
  bottom: 0.7rem;
  left: 29rem;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}

.is-invalid {
  border-color: #dc3545;
}
</style>
