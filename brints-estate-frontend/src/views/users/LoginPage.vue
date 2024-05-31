<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

import HeaderBar from "@/components/layout/HeaderBar.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import ValidationError from "@/components/messages/ValidationError.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";

const authStore = useAuthStore();
const router = useRouter();

const credentials = ref({
  email: "",
  password: "",
});
const error = ref("");

error.value = authStore.errorMessage;

const rules = {
  email: {
    required: helpers.withMessage("Email is required.", required),
    email: helpers.withMessage("Email must be valid.", email),
  },
  password: {
    required: helpers.withMessage("Password is required.", required),
    minLength: helpers.withMessage("Password must be at least 6 characters.", minLength(6)),
    maxLength: helpers.withMessage("Password must be at most 16 characters.", maxLength(16)),
  },
};

const v$ = useVuelidate(rules, credentials);

const handleLogin = async () => {
  if (!(await v$.value.$validate())) return;

  await authStore.login(credentials.value.email, credentials.value.password);

  if (authStore.isLoggedIn) {
    router.push({ name: "listings" });
  } else {
    router.push({ name: "login" });
  }
};
</script>

<template>
  <div class="header">
    <HeaderBar></HeaderBar>
  </div>

  <div class="wrapper">
    <div class="left">
      <div v-if="error">
        <ErrorMessage :message="error"></ErrorMessage>
      </div>
      <BaseForm class="form" @submit="handleLogin">
        <fieldset>
          <legend>Login</legend>

          <div class="email-input">
            <BaseInput
              v-model="v$.email.$model"
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              asterisk="*"
              icon="envelope"
            />
            <ValidationError :model="v$.email"></ValidationError>
          </div>

          <div class="password-input">
            <BaseInput
              v-model="v$.password.$model"
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              asterisk="*"
              icon="lock"
              special="eye"
              special_icon="login_eye_icon"
            />
            <ValidationError :model="v$.password"></ValidationError>
          </div>

          <div class="btn">
            <BaseButton
              type="submit"
              label="Login"
              class="bg-lime-500 hover:bg-lime-700 text-white"
              :disabled="v$.$invalid"
            >
              Login
            </BaseButton>

            <div>
              <p>Don't have an account? <router-link to="/signup" class="text-lime-500">Sign Up</router-link></p>
              <p>
                Forgot Password?
                <router-link :to="{ name: 'forgot-password' }" class="text-lime-500">Reset</router-link>
              </p>
            </div>
          </div>
        </fieldset>
      </BaseForm>
    </div>

    <div class="right"></div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: calc(100vh - 7.2rem);
}

.form {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 10px;
  background-color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

.btn {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn p {
  padding-left: 2rem;
  border-left: 1px solid #333;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right {
  background-image: url("@/assets/images/house-3.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.email-input,
.password-input {
  display: grid;
  grid-template-rows: 1fr minmax(1rem);
  margin-bottom: 1rem;
}
</style>
