<script setup>
import { ref, watch } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Add the icons to the library
library.add(fas);

const props = defineProps({
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
  value: {
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
});

const inputValue = ref(props.value);
const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// const errors = computed(() => {
//   const errors = [];
//   if (props.rules.required && !inputValue.value) {
//     errors.push("This field is required");
//   }

//   if (props.rules.minLength && inputValue.value.length < props.rules.minLength) {
//     errors.push(`This field must be at least ${props.rules.minLength} characters`);
//   }

//   // email validation
//   if (props.rules.email && !/^\S+@\S+\.\S+$/.test(inputValue.value)) {
//     errors.push("This field must be a valid email address");
//   }

//   // password validation - characters must be greater than 7
//   if (props.rules.password && inputValue.value.length < 8) {
//     errors.push("Password must be at least 8 characters");
//   }

//   // password validation - must contain at least one uppercase
//   if (props.rules.password && !/[A-Z]/.test(inputValue.value)) {
//     errors.push("Password must contain at least one uppercase letter");
//   }

//   // password validation - must contain at least one lowercase
//   if (props.rules.password && !/[a-z]/.test(inputValue.value)) {
//     errors.push("Password must contain at least one lowercase letter");
//   }

//   // password validation - must contain at least one number
//   if (props.rules.password && !/[0-9]/.test(inputValue.value)) {
//     errors.push("Password must contain at least one number");
//   }

//   // password validation - must contain at least one special character
//   if (props.rules.password && !/[!@#$%^&*]/.test(inputValue.value)) {
//     errors.push("Password must contain at least one special character");
//   }

//   // check if confirm password matches password
//   if (props.rules.confirmPassword && inputValue.value !== props.rules.password) {
//     errors.push("Password does not match");
//   }

//   return errors;
// });

const watchValue = () => {
  inputValue.value = props.value;
};

watch(() => props.value, watchValue);
</script>

<template>
  <div class="form_group">
    <div class="label_group">
      <span><font-awesome-icon :icon="icon" /></span>
      <label :for="id"
        >{{ label }}<span v-if="asterisk" class="text-red-500">{{ asterisk }}</span></label
      >
    </div>

    <input
      :type="type === 'password' && isPasswordVisible ? 'text' : type"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      v-model.trim="inputValue"
    />

    <span v-if="special" :class="special_icon">
      <font-awesome-icon :icon="isPasswordVisible ? 'eye' : 'eye-slash'" @click="togglePassword" />
    </span>
  </div>
</template>

<style scoped>
.form_group {
  margin-bottom: 1rem;
}

.form_group label {
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

.password_eye {
  cursor: pointer;
  position: absolute;
  bottom: 6.85rem;
  left: 23rem;
}

.confirm_eye {
  cursor: pointer;
  position: absolute;
  bottom: 6.85rem;
  right: 2.32rem;
}
</style>
