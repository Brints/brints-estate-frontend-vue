<script setup>
import { ref } from "vue";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers, numeric } from "@vuelidate/validators";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";
import ValidationError from "@/components/messages/ValidationError.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";

import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const formData = ref({
  otp: "",
  phone: "",
});
const email = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const rules = {
  otp: {
    required: helpers.withMessage("OTP is required.", required),
    minLength: helpers.withMessage("OTP should not be less than 6 numbers", minLength(6)),
    maxLength: helpers.withMessage("OTP should not be more than 6 numbers", maxLength(6)),
    numeric: helpers.withMessage("OTP should be numbers", numeric),
  },
  phone: {
    required: helpers.withMessage("Phone number is required.", required),
  },
};

const v$ = useVuelidate(rules, formData);

const loading = ref(false);

// Fetch the phone number from the store
formData.value.phone = userStore.user.phone;
email.value = userStore.user.email;

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const verifyOTP = async () => {
  if (!(await v$.value.$validate())) return;
  loading.value = true;

  try {
    const response = await axios.post(`${backendUrl}/user/verify-phone`, formData.value);
    const { data } = response;

    if (data.statusCode === 200) {
      router.push({ name: "success" });
    }
  } catch (error) {
    console.error(error);
    const response = error.response.data;
    errorMessage.value = response.error.message;
  } finally {
    loading.value = false;
  }
};

const resend = async () => {
  await userStore.resendOTP(email.value);

  if (userStore.statusCode === 200) {
    successMessage.value = userStore.successMessage;
  }
};
</script>

<template>
  <div :class="$style.wrapper">
    <div v-if="errorMessage" :class="$style.error_message">
      <ErrorMessage :message="errorMessage" />
    </div>
    <div v-if="successMessage">
      <p>{{ successMessage }}</p>
    </div>
    <BaseForm @submit="verifyOTP">
      <fieldset>
        <legend>OTP Verification</legend>
        <div :class="$style.otp_input">
          <BaseInput v-model="v$.otp.$model" id="otp" label="OTP" type="text" name="otp" placeholder="Enter OTP" />
          <!-- :isInvalid="v$.$invalid" -->
          <ValidationError :model="v$.otp"></ValidationError>
        </div>
        <div :class="$style.btns">
          <BaseButton type="submit" label="Verify OTP" :disabled="v$.$invalid"></BaseButton>
          <p>Didn't receive OTP? <SmallButton type="button" label="Resend" @click="resend"></SmallButton></p>
        </div>
      </fieldset>
    </BaseForm>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
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

.otp_input {
  margin-bottom: 1rem;
}

.error_message {
  color: #ca0b0b;
}

.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
</style>
