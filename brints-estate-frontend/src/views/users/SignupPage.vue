<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
// import { passwordValidator } from "@/services/validations";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import LabelSelect from "@/components/form/LabelSelect.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import CountryCodeSelect from "@/components/form/CountryCodeSelect.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";
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
    minLength: helpers.withMessage("Fullname should be more than 3 characters", minLength(3)),
    maxLength: helpers.withMessage("Fullname should not be more than 80 characters", maxLength(80)),
    // alpha: helpers.withMessage("Fullname should contain only letters.", alpha),
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
    minLength: helpers.withMessage("Password must be at least 8 characters", minLength(8)),
    maxLength: helpers.withMessage("Password must be at most 16 characters", maxLength(16)),
    // passwordValidator: helpers.withMessage(
    //   "Password must contain at least one uppercase, one lowercase, one number and one special character",
    //   passwordValidator
    // ),
  },
  confirmPassword: {
    required: helpers.withMessage("Confirm Password is required", required),
    // sameAs: helpers.withMessage("Confirm Password must be same as Password.", sameAs(formData.value.password)),
  },
  avatar: {
    // required: helpers.withMessage("Avatar is required", required),
  },
  code: {
    required: helpers.withMessage("Code required", required),
  },
  gender: {
    required: helpers.withMessage("Gender is required", required),
  },
};

const v$ = useVuelidate(rules, formData);

const url = import.meta.env.VITE_BACKEND_URL;

const handleSignup = async () => {
  if (!(await v$.value.$validate())) return;
  loading.value = true;

  const data = new FormData();
  data.append("fullname", formData.value.fullname);
  data.append("email", formData.value.email);
  data.append("phone", formData.value.phone);
  data.append("password", formData.value.password);
  data.append("confirmPassword", formData.value.confirmPassword);
  data.append("avatar", formData.value.avatar);
  data.append("code", formData.value.code);
  data.append("gender", formData.value.gender);

  try {
    loading.value = true;
    const response = await axios.post(`${url}/user/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
    //Reload the signup page
    // router.push({ name: "signup" });
    const response = error.response.data;
    errorMessage.value = response.error.message;
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

    <BaseForm @submit="handleSignup">
      <fieldset>
        <legend>Sign Up</legend>

        <div :class="$style.img_label">
          <ImageInput label="Upload your Avatar" id="avatar" name="avatar" icon="image" v-model="formData.avatar" />
          <ValidationError :model="v$.avatar"></ValidationError>
        </div>

        <section :class="$style.form_content">
          <section :class="$style.left_column">
            <div :class="$style.input_group">
              <BaseInput
                v-model="v$.fullname.$model"
                label="Full Name"
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your full name"
                asterisk="*"
                icon="user"
              />
              <ValidationError :model="v$.fullname"></ValidationError>
            </div>

            <div :class="$style.input_group">
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

            <div :class="$style.input_group">
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
              <div :class="$style.input_group">
                <CountryCodeSelect
                  v-model="v$.code.$model"
                  label="Code"
                  id="code"
                  name="code"
                  asterisk="*"
                  icon="globe"
                ></CountryCodeSelect>
                <ValidationError :model="v$.code"></ValidationError>
              </div>

              <div :class="$style.input_group">
                <BaseInput
                  v-model="v$.phone.$model"
                  label="Phone"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  asterisk="*"
                  icon="phone"
                />
                <ValidationError :model="v$.phone"></ValidationError>
              </div>
            </div>

            <div :class="$style.input_group">
              <LabelSelect
                label="Gender"
                id="gender"
                name="gender"
                asterisk="*"
                icon="venus-mars"
                v-model="v$.gender.$model"
              >
                <option value="">Choose your Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </LabelSelect>
              <ValidationError :model="v$.gender"></ValidationError>
            </div>

            <div :class="$style.input_group">
              <BaseInput
                v-model="v$.confirmPassword.$model"
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
              <ValidationError :model="v$.confirmPassword"></ValidationError>
            </div>
          </section>
        </section>
        <div :class="$style.btns_wrapper">
          <BaseButton
            type="submit"
            mode="signup"
            :label="loading ? 'Submitting...' : 'Signup'"
            :disabled="loading"
          ></BaseButton>
          <BaseButton type="reset" mode="reset_btn" label="Reset"></BaseButton>
        </div>
      </fieldset>
    </BaseForm>
  </main>

  <div class="footer">
    <BaseFooter></BaseFooter>
  </div>
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

.input_group {
  margin-bottom: 1rem;
}
</style>
