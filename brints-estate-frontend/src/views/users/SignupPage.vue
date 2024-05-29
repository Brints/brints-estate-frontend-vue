<!-- <script setup>
import { ref } from "vue";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import LabelSelect from "@/components/form/LabelSelect.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import CountryCodeSelect from "@/components/form/CountryCodeSelect.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";
import ErrorMessages from "@/components/messages/ErrorMessage.vue";

import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const router = useRouter();

const errorMessage = ref("");
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
  // Set loading to true
  loading.value = true;

  // TODO: Run validations

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

  for (let [key, value] of data.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await axios.post(`${url}/user/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      // handle error
    }

    const userData = response.data;
    const payload = userData.payload;

    // store phone number
    // userStore.setPhone(payload.phone);
    userStore.phoneNumber = payload.phone;

    if (userData.statusCode === 201) {
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
      // Redirect to otp verification page
      // router.push({ name: "verify-phone", params: { phone: phone } }); // if you're using params
      router.push({ name: "verify-phone" });
    }
  } catch (error) {
    const response = error.response.data;
    errorMessage.value = response.error.message;
  } finally {
    loading.value = false;
  }
};

// set signup button to disabled and changed text to Submitting when loading is true
</script> -->

<!-- <template>
  <HeaderBar></HeaderBar>
  <main :class="$style.wrapper">
    <div v-if="errorMessage" class="error_message">
      <ErrorMessages :message="errorMessage" />
    </div>
    <BaseForm @submit.prevent="handleSubmit" legend="Sign Up" mode="signup">
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
              asterisk="*"
              icon="user"
              @input="handleInput"
            />

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
              special_icon="password_eye"
              @input="handleInput"
            />
          </section>

          <section :class="$style.right_column">
            <div :class="$style.phone">
              <CountryCodeSelect
                label="Code"
                id="code"
                name="code"
                asterisk="*"
                icon="globe"
                @input="handleInput"
              ></CountryCodeSelect>

              <BaseInput
                label="Phone"
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                asterisk="*"
                icon="phone"
                @input="handleInput"
              />
            </div>

            <LabelSelect label="Gender" id="gender" name="gender" asterisk="*" icon="venus-mars" @input="handleInput">
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
              asterisk="*"
              icon="lock"
              special="eye"
              special_icon="confirm_eye"
              @input="handleInput"
            />
          </section>
        </section>
        <SmallButton type="button" label="Generate Password" button="generate_password" />
        <div :class="$style.btns_wrapper">
          <BaseButton type="submit" mode="signup" :disabled="loading">Signup</BaseButton>
          <BaseButton type="button" mode="google">Signup with Google</BaseButton>
          <BaseButton type="reset" mode="reset_btn">Reset</BaseButton>
        </div>
      </template>
    </BaseForm>
  </main>
</template> -->

<!-- <style module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 1rem 0;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding-bottom: 1rem;
}

.phone {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}
</style> -->

<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, sameAs, helpers } from "@vuelidate/validators";

import { passwordValidator } from "../../services/validations";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import LabelSelect from "@/components/form/LabelSelect.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import CountryCodeSelect from "@/components/form/CountryCodeSelect.vue";
// import SmallButton from "@/components/buttons/SmallButton.vue";
import ErrorMessages from "@/components/messages/ErrorMessage.vue";
import ValidationError from "@/components/messages/ValidationError.vue";

import axios from "axios";

import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const router = useRouter();

const errorMessage = ref("");
const loading = ref(false);
const formData = ref({
  fullname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  avatar: null,
  code: "",
  gender: "",
});

const rules = {
  fullname: {
    required: helpers.withMessage("Fullname is required", required),
  },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Email must be valid", email),
  },
  phone: {
    required: helpers.withMessage("Phone number is required", required),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage("Password must be at least 6 characters", minLength(6)),
    maxLength: helpers.withMessage("Password must be at most 16 characters", maxLength(16)),
    passwordValidator: helpers.withMessage(
      "Password must contain at least one uppercase, one lowercase, one number and one special character",
      passwordValidator
    ),
  },
  confirmPassword: {
    required: helpers.withMessage("Confirm Password is required", required),
    sameAs: helpers.withMessage("Password does not match", sameAs(formData.value.password)),
  },
  avatar: {
    required: helpers.withMessage("Avatar is required", required),
  },
  code: {
    required: helpers.withMessage("Country code is required", required),
  },
};

const v$ = useVuelidate(rules, formData);

const url = import.meta.env.VITE_BACKEND_URL;

const signup = async () => {
  if (!(await v$.value.$validate())) return;

  const data = new FormData();
  data.append("fullname", formData.value.fullname);
  data.append("email", formData.value.email);
  data.append("phone", formData.value.phone);
  data.append("password", formData.value.password);
  data.append("confirmPassword", formData.value.confirmPassword);
  data.append("avatar", formData.value.avatar);
  data.append("code", formData.value.code);
  data.append("gender", formData.value.gender);

  // for (let [key, value] of data.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  try {
    loading.value = true;
    const response = axios.post(`${url}/user/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.ok) {
      // handle error
    }

    const userData = response.data;
    const payload = userData.payload;

    // store phone number
    userStore.phoneNumber = payload.phone;

    if (userData.statusCode === 201) {
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
      // Redirect to otp verification page
      // router.push({ name: "verify-phone", params: { phone: phone } }); // if you're using params
      router.push({ name: "verify-phone" });
    }
  } catch (error) {
    const response = error.response.data;
    errorMessage.value = response.error.message;
    //Reload the signup page
    router.push({ name: "signup" });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="header">
    <HeaderBar></HeaderBar>
  </div>

  <main :class="$style.wrapper">
    <div v-if="errorMessage" class="error_message">
      <ErrorMessages :message="errorMessage" />
    </div>

    <BaseForm :class="$style.form" @submit="signup">
      <fieldset>
        <legend>Sign Up</legend>

        <div :class="$style.img_label">
          <ImageInput label="Upload your Avatar" id="avatar" name="avatar" icon="image" v-model="formData.avatar" />
        </div>

        <section :class="$style.form_content">
          <section :class="$style.left_column">
            <div :class="$style.fullname_label">
              <BaseInput
                v-model="formData.fullname"
                label="Full Name"
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your full name"
                asterisk="*"
                icon="user"
              />
            </div>

            <div :class="$style.email_label">
              <BaseInput
                v-model="formData.email"
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                asterisk="*"
                icon="envelope"
              />
            </div>

            <div :class="$style.password_label">
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
                special_icon="password_eye"
              />
              <ValidationError :model="v$.password"></ValidationError>
            </div>
          </section>

          <section :class="$style.right_column">
            <div :class="$style.phone">
              <div :class="$style.code_label">
                <CountryCodeSelect
                  v-model="formData.code"
                  label="Code"
                  id="code"
                  name="code"
                  asterisk="*"
                  icon="globe"
                ></CountryCodeSelect>
              </div>

              <div :class="$style.phone_label">
                <BaseInput
                  v-model="formData.phone"
                  label="Phone"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  asterisk="*"
                  icon="phone"
                />
              </div>
            </div>

            <div :class="$style.gender_label">
              <LabelSelect
                label="Gender"
                id="gender"
                name="gender"
                asterisk="*"
                icon="venus-mars"
                v-model="formData.gender"
              >
                <option value="">Choose your Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </LabelSelect>
            </div>

            <div :class="$style.confirmPwd_label">
              <BaseInput
                v-model="formData.confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                asterisk="*"
                icon="lock"
                special="eye"
                special_icon="confirm_eye"
              />
            </div>
          </section>
        </section>
        <div :class="$style.btns_wrapper">
          <BaseButton type="submit" mode="signup">Signup</BaseButton>
          <BaseButton type="reset" mode="reset_btn">Reset</BaseButton>
        </div>
      </fieldset>
    </BaseForm>
  </main>
</template>

<style module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 1rem 0;
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
</style>
