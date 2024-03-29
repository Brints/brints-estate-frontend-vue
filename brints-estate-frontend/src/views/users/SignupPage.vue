<script setup>
import { ref } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import LabelInput from "@/components/LabelInput.vue";
import LabelSelect from "@/components/LabelSelect.vue";
import ImageInput from "@/components/ImageInput.vue";
import ResetButton from "@/components/ResetButton.vue";
// import axios from "axios";

const payload = ref(new FormData());

// const url = import.meta.env.VITE_BACKEND_URL;

const handleSubmit = async () => {
  console.log("Fullname", fullname.value);
  console.log("Avatar", avatar.files[0]);

  payload.value.append("avatar", avatar.files[0]);
  payload.value.append("fullname", fullname.value);
  payload.value.append("email", email.value);
  payload.value.append("phone", phone.value);
  payload.value.append("gender", gender.value);
  payload.value.append("password", password.value);
  payload.value.append("confirmPassword", confirmPassword.value);

  console.log(payload.value);

  // try {
  //   const response = await axios.post(`${url}/user/register`, payload.value, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });

  //   console.log("Signup successful", response.data);
  // } catch (error) {
  //   console.error(error.message);
  // }
};
</script>

<template>
  <main :class="$style.wrapper">
    <BaseForm @submit="handleSubmit">
      <template #legend>
        <h1>Sign Up</h1>
      </template>
      <template #info>
        <p className="text-center mb-1">
          Have an account already?
          <span
            className="hover:border-b text-lime-500 hover:text-lime-900 transition-all duration-300"
            ><RouterLink to="/login">Login</RouterLink></span
          >
        </p>
      </template>
      <template #content>
        <ImageInput label="Upload your Avatar" id="avatar" name="avatar" />
        <section :class="$style.form_content">
          <section class="left-column">
            <LabelInput
              label="Full Name"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name e.g. John Doe"
            />
            <LabelInput
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email e.g. johndoe@example.com"
            />
            <LabelInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </section>
          <section class="right-column">
            <LabelInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
            <LabelSelect label="Gender" id="gender" name="gender">
              <option value="">Choose your Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </LabelSelect>
            <LabelInput
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your Password"
            />
          </section>
        </section>

        <div :class="$style.btns_wrapper">
          <BaseButton type="submit">Signup</BaseButton>
          <ResetButton>Reset</ResetButton>
        </div>
      </template>
    </BaseForm>
  </main>
</template>

<style module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form_content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.btns_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
</style>
