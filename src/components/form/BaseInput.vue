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
  <div class="w-full">
    <div class="flex gap-2 mb-2 text-slate-700 font-medium">
      <span v-if="icon" class="text-indigo-500"><font-awesome-icon :icon="icon" /></span>
      <label :for="id" class="cursor-pointer">
        {{ label }}
        <span v-if="asterisk" class="text-red-500">{{ asterisk }}</span>
      </label>
    </div>

    <div class="relative">
      <input
        :type="type === 'password' && isPasswordVisible ? 'text' : type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-slate-800 placeholder-slate-400"
        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-200': isInvalid }"
      />
      <span 
        v-if="special" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors"
        @click="togglePassword"
      >
        <font-awesome-icon :icon="isPasswordVisible ? 'eye' : 'eye-slash'" />
      </span>
    </div>
  </div>
</template>
