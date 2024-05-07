<script setup>
import HeaderBar from "@/components/layout/HeaderBar.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
// import axios from "axios";

const handleInput = (e) => {
  const { name, value } = e.target;
  console.log(name, value);
};

const handleSubmit = () => {
  console.log("Form submitted");
};
</script>

<template>
  <HeaderBar></HeaderBar>

  <div class="wrapper">
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
</template>

<style scoped>
.wrapper {
  margin: 2rem 0;
}

.form {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 10px;
  background-color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
</style>
