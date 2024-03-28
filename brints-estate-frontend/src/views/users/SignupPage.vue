<script setup>
import { ref } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import LabelInput from "@/components/LabelInput.vue";
import LabelSelect from "@/components/LabelSelect.vue";
import ImageInput from "../../components/ImageInput.vue";
import ResetButton from "../../components/ResetButton.vue";

const url = import.meta.env.VITE_BACKEND_URL;

const form = ref({
  fullname: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
  avatar: "",
});

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("fullname", form.value.fullname);
  formData.append("email", form.value.email);
  formData.append("phone", form.value.phone);
  formData.append("gender", form.value.gender);
  formData.append("password", form.value.password);
  formData.append("confirmPassword", form.value.confirmPassword);
  formData.append("avatar", form.value.avatar);

  console.log(formData);

  try {
    const response = await fetch(`${url}/user/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("An error occurred while registering user");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};

// const handleReset = () => {
//   form.value.fullname = "";
//   form.value.email = "";
//   form.value.phone = "";
//   form.value.gender = "";
//   form.value.password = "";
//   form.value.confirmPassword = "";
//   form.value.avatar = "";
// };
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
              id="confirm-password"
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
