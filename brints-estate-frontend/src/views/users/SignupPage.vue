<script setup>
import { ref } from "vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import LabelSelect from "@/components/form/LabelSelect.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import CountryCodeSelect from "@/components/form/CountryCodeSelect.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";

import axios from "axios";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

const router = useRouter();

const formData = ref({
  fullname: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
  avatar: null,
  code: "",
});

let loading = ref(false);

const validations = {
  formData: {
    fullname: { required },
    email: { required, email: email },
    phone: { required },
    gender: { required },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs("password") },
    code: { required },
  },
};

const v$ = useVuelidate(validations, formData);

const handleInput = (e) => {
  const { name, value } = e.target;
  formData.value = { ...formData.value, [name]: value };
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  formData.value.avatar = file;
};

const url = import.meta.env.VITE_BACKEND_URL;

const handleSubmit = async () => {
  //
  loading.value = true;

  // Create a new FormData instance
  const data = new FormData();
  data.append("fullname", formData.value.fullname);
  data.append("email", formData.value.email);
  data.append("phone", formData.value.phone);
  data.append("gender", formData.value.gender);
  data.append("password", formData.value.password);
  data.append("confirmPassword", formData.value.confirmPassword);
  data.append("avatar", formData.value.avatar);
  data.append("code", formData.value.code);

  console.log(...data);

  try {
    const response = await axios.post(`${url}/user/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const payload = response.data;

    if (payload.statusCode === 201) {
      formData.value = {
        fullname: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        confirmPassword: "",
        avatar: null,
        code: "",
      };
      // Redirect to login page
      router.push({ name: "login" });
      console.log("User created successfully");
    }
  } catch (error) {
    const response = error.response.data;
    console.error(response);
  } finally {
    loading.value = false;
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
        <ImageInput label="Upload your Avatar" id="avatar" name="avatar" icon="image" @change="onFileChange" />
        <section :class="$style.form_content">
          <section :class="$style.left_column">
            <BaseInput
              label="Full Name"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              @input="handleInput"
              icon="user"
              :rules="v$.formData.fullname"
            />

            <BaseInput
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              @input="handleInput"
              icon="envelope"
              :rules="v$.formData.email"
            />

            <BaseInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              @input="handleInput"
              icon="lock"
              special="eye-slash"
              :rules="v$.formData.password"
            />
          </section>

          <section :class="$style.right_column">
            <div :class="$style.phone">
              <CountryCodeSelect
                label="Code"
                id="code"
                name="code"
                icon="globe"
                @input="handleInput"
              ></CountryCodeSelect>

              <BaseInput
                label="Phone"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                @input="handleInput"
                icon="phone"
                :rules="v$.formData.phone"
              />
            </div>

            <LabelSelect
              label="Gender"
              id="gender"
              name="gender"
              icon="venus-mars"
              @input="handleInput"
              :rules="v$.formData.gender"
            >
              <option value="">Choose your Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </LabelSelect>

            <BaseInput
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              @input="handleInput"
              icon="lock"
              special="eye-slash"
              :rules="v$.formData.confirmPassword"
            />
          </section>
        </section>
        <SmallButton type="button" label="Generate Password" :class="$style.generate_password" />
        <div :class="$style.btns_wrapper">
          <BaseButton type="submit" status="signup">Signup</BaseButton>
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
  margin: 5rem 0;
}

.form_content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.left_column,
.right_column {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
}

.btns_wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding-bottom: 1rem;
}

.phone {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}

.generate_password {
  position: relative;
  bottom: 8.35rem;
  left: 10rem;
  background-color: #050555;
  border: 2px solid #0c0b0b;
}
</style>
