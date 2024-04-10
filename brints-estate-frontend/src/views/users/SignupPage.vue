<script setup>
import { ref } from "vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import LabelSelect from "@/components/form/LabelSelect.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import axios from "axios";

const formData = ref({
  fullname: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
  avatar: null,
});

const handleInput = (e) => {
  const { name, value } = e.target;
  formData.value = { ...formData.value, [name]: value };
};

const url = import.meta.env.VITE_BACKEND_URL;

const handleSubmit = async () => {
  const data = new FormData();
  data.append("fullname", formData.value.fullname);
  data.append("email", formData.value.email);
  data.append("phone", formData.value.phone);
  data.append("gender", formData.value.gender);
  data.append("password", formData.value.password);
  data.append("confirmPassword", formData.value.confirmPassword);
  data.append("avatar", formData.value.avatar);

  try {
    const response = await axios.post(`${url}/user/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const payload = response.data;
    console.log(payload);

    if (payload.statusCode === 201) {
      formData.value = {
        fullname: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        confirmPassword: "",
        avatar: null,
      };
      console.log("User created successfully");
    } else {
      alert("An error occurred. Please try again");
    }

    // Redirect to login page
    $router.push("/login");
  } catch (error) {
    console.error(error.payload.error.message);
  }
};
</script>

<template>
  <HeaderBar></HeaderBar>
  <main :class="$style.wrapper">
    <BaseForm @submit.prevent="handleSubmit">
      <template #legend>
        <h1>Sign Up</h1>
      </template>
      <template #info>
        <p className="text-center mb-1">
          Have an account already?
          <span className="hover:border-b text-lime-500 hover:text-lime-900 transition-all duration-300"
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
              placeholder="Enter your full name"
              @input="handleInput"
            />

            <BaseInput
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email e.g. johndoe@example.com"
              @input="handleInput"
            />
            <BaseInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              @input="handleInput"
            />
          </section>
          <section class="right-column">
            <BaseInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              @input="handleInput"
            />
            <LabelSelect label="Gender" id="gender" name="gender" @input="handleInput">
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
              @input="handleInput"
            />
          </section>
        </section>

        <div :class="$style.btns_wrapper">
          <BaseButton type="submit">Signup</BaseButton>
          <BaseButton type="reset" status="reset_btn">Reset</BaseButton>
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
  padding: 1rem;
  gap: 10px;
}
</style>
