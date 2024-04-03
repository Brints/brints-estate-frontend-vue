<script setup>
import { ref } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import LabelSelect from "@/components/LabelSelect.vue";
import ImageInput from "@/components/ImageInput.vue";
import ResetButton from "@/components/ResetButton.vue";
import axios from "axios";

const avatar = ref(null);
const fullname = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");
const confirmPassword = ref("");
const gender = ref("");

const url = import.meta.env.VITE_BACKEND_URL;

// const handleInput = (event) => {
//   console.log(event);
//   fullname.value = event.target.value;
//   email.value = event.target.value;
// };

console.log(email.value);

const handleSubmit = async () => {
  const formData = new FormData();

  // Append file to form data
  if (avatar.value && avatar.value.files[0]) {
    formData.append("avatar", avatar.value);
  }

  // Append other user details to form data
  formData.append("fullname", fullname.value);
  formData.append("email", email.value);

  console.log(formData);

  // try {
  //   const response = await axios.post(`${url}/user/register`, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   console.log(response.data);

  //   // Reset form fields
  //   avatar.value = null;
  //   fullname.value = "";
  //   email.value = "";
  //   password.value = "";
  //   phone.value = "";
  //   confirmPassword.value = "";
  //   gender.value = "";

  //   // Redirect to login page
  //   $router.push("/login");

  //   // Show success message
  //   alert("User registered successfully");

  //   return response.data;
  //   } catch (error) {
  //     console.error(error.response.data);
  //   }
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
            <BaseInput
              label="Full Name"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name e.g. John Doe"
            />

            <BaseInput
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email e.g. johndoe@example.com"
            />
            <BaseInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </section>
          <section class="right-column">
            <BaseInput
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
            <BaseInput
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
