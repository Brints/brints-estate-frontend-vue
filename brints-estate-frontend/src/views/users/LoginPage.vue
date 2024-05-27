<!-- <script setup>
import HeaderBar from "@/components/layout/HeaderBar.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import CurrentTime from "@/components/UI/CurrentTime.vue";

const handleInput = (e) => {
  const { name, value } = e.target;
  console.log(name, value);
};

const handleSubmit = () => {
  console.log("Form submitted");
};
</script> -->

<!-- <template>
  <div class="header">
    <HeaderBar></HeaderBar>
  </div>

  <div class="wrapper">
    <div class="left">
      <BaseForm class="form" @submit.prevent="handleSubmit" legend="Login">
        <template v-slot:content>
          <BaseInput
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            asterisk="*"
            icon="envelope"
            @input="handleInput"
          />

          <BaseInput
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            asterisk="*"
            icon="lock"
            special="eye"
            special_icon="login_password"
            @input="handleInput"
          />
          <div class="btn">
            <BaseButton type="submit" class="bg-lime-500 hover:bg-lime-700 text-white"> Login </BaseButton>
            <p>Don't have an account? <router-link to="/signup" class="text-lime-500">Sign Up</router-link></p>
          </div>
        </template>
      </BaseForm>
    </div>

    <div class="right">
      <CurrentTime></CurrentTime>
    </div>
  </div>
</template> -->

<script setup>
import { ref } from "vue";

import HeaderBar from "@/components/layout/HeaderBar.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email as emailValidator } from "@vuelidate/validators";

const email = ref("");
const password = ref("");

const rules = {
  email: { required, email: emailValidator },
  password: { required },
};

const v$ = useVuelidate(rules, { email, password });
</script>

<template>
  <div class="header">
    <HeaderBar></HeaderBar>
  </div>

  <div class="wrapper">
    <div class="left">
      <BaseForm class="form" @submit="login">
        <fieldset>
          <legend>Login</legend>
          <BaseInput
            v-model="email"
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            asterisk="*"
            icon="envelope"
            :validationMessage="v$.email.$error ? 'Email is required.' : ''"
          />

          <BaseInput
            v-model="password"
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            asterisk="*"
            icon="lock"
            special="eye"
            special_icon="login_password"
            :validationMessage="v$.password.$error ? 'Password is required.' : ''"
          />
          <div class="btn">
            <!-- <BaseButton type="submit" class="bg-lime-500 hover:bg-lime-700 text-white"> Login </BaseButton> -->
            <BaseButton
              type="submit"
              :disabled="!v$.$anyDirty || v$.$invalid"
              class="bg-lime-500 hover:bg-lime-700 text-white"
            >
              Login
            </BaseButton>
            <p>Don't have an account? <router-link to="/signup" class="text-lime-500">Sign Up</router-link></p>
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
</style>
