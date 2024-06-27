<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import LabelSelect from "@/components/form/LabelSelect.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import CountryCodeSelect from "@/components/form/CountryCodeSelect.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";

import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseCard from "@/components/UI/BaseCard.vue";

import ErrorMessages from "@/components/messages/ErrorMessage.vue";
import ValidationError from "@/components/messages/ValidationError.vue";

import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { maxSize } from "@/services/validations";

const userStore = useUserStore();

const router = useRouter();

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
    maxSize: helpers.withMessage("Avatar size should not be more than 4MB", maxSize(4 * 1024 * 1024)),
  },
  code: {
    required: helpers.withMessage("Code required", required),
  },
  gender: {
    required: helpers.withMessage("Gender is required", required),
  },
};

const v$ = useVuelidate(rules, formData);

const handleSignup = async () => {
  if (!(await v$.value.$validate())) return;

  await userStore.signup(formData.value);

  // Redirect to otp verification page
  // router.push({ name: "verify-phone", params: { phone: phone } }); // if you're using params
  if (userStore.statusCode === 201) {
    setTimeout(() => {
      router.push({ name: "verify-phone" });
    }, 2000);
  }
};

const label = computed(() => {
  return userStore.loading ? "Submitting..." : "Signup";
});
</script>

<template>
  <div class="header">
    <HeaderBar></HeaderBar>
  </div>

  <main :class="$style.wrapper">
    <BaseDialog :show="!!userStore.loading" title="Processing..." fixed>
      <BaseSpinner />
    </BaseDialog>

    <BaseDialog :show="userStore.statusCode === 201" title="Signup Success" fixed>
      <p>Redirecting to OTP verification page...</p>
    </BaseDialog>

    <BaseDialog :show="!!userStore.error" title="An error occurred. Please try again." @close="userStore.handleError()">
      <ErrorMessages :message="userStore.error" class="error_message" />
    </BaseDialog>

    <BaseCard>
      <BaseForm @submit="handleSignup">
        <fieldset>
          <legend>Sign Up</legend>

          <div :class="$style.img_label">
            <ImageInput
              v-model="v$.avatar.$model"
              label="Upload your Avatar"
              id="avatar"
              name="avatar"
              icon="image"
              :multiple="false"
            />
            <!-- :imageSize="2"
              @update:modelValue="handleAvatarUpload" -->
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
              :label="label"
              :disabled="v$.$invalid || userStore.loading"
            ></BaseButton>
            <BaseButton type="reset" mode="reset_btn" label="Reset"></BaseButton>
          </div>
        </fieldset>
      </BaseForm>
    </BaseCard>
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

.signup {
  background-color: #000;
}
</style>
