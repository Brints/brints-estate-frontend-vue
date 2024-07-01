<script setup>
import { computed, onMounted, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers, numeric } from "@vuelidate/validators";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";
import ValidationError from "@/components/messages/ValidationError.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import {handleError} from "@vue/runtime-dom";

const userStore = useUserStore();
const router = useRouter();

const formData = ref({
  otp: "",
  phone: localStorage.getItem("phone"),
});

const isResendCountDownActive = ref(false);
const resendCountDown = ref(30);

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

const verifyOTP = async () => {
  if (!(await v$.value.$validate())) return;

  await userStore.verifyPhone(formData.value.otp, formData.value.phone);

  if (userStore.statusCode === 200) {
    userStore.clearPhoneNumberFromLocalStorage();
    await router.push({name: "success"});
  }

};

const resend = async () => {
  await userStore.resendOTP(userStore.userEmail);

  startResendCountDownTimer();
};

const startResendCountDownTimer = () => {
  isResendCountDownActive.value = true;
  const interval = setInterval(() => {
    resendCountDown.value -= 1;
    if (resendCountDown.value === 0) {
      clearInterval(interval);
      isResendCountDownActive.value = false;
      resendCountDown.value = 30;
    }
  }, 1000);
};

const error = computed(() => {
  return userStore.errorObject;
})

const timerText = computed(() => {
  return resendCountDown.value < 2
    ? `Resend OTP in ${resendCountDown.value} second`
    : `Resend OTP in ${resendCountDown.value} seconds`;
});

// Initialize the resend count down timer on component mount
startResendCountDownTimer();

onMounted(() => {
  userStore.loadPhoneNumberFromLocalStorage();
});
</script>

<template>
  <div :class="$style.wrapper">
    <BaseDialog :show="!!error" title="An error occurred"
                @close="userStore.handleError()">
      <ErrorMessage :message="error.message" />
    </BaseDialog>

<BaseDialog :show="userStore.loading"
            title="Processing"
fixed>
 <BaseSpinner></BaseSpinner>
</BaseDialog>

    <BaseDialog :show="userStore.statusCode === 200"
                title="Success" @close="userStore.statusCode = 0">
      {{ userStore.successMessage }}
    </BaseDialog>


    <BaseForm @submit="verifyOTP">
      <fieldset>
        <legend>OTP Verification</legend>
        <div :class="$style.otp_input">
          <BaseInput v-model="v$.otp.$model" id="otp" label="OTP" type="text" name="otp" placeholder="Enter OTP" />
          <ValidationError :model="v$.otp"></ValidationError>
        </div>
        <div :class="$style.btns">
          <div><BaseButton type="submit" label="Verify OTP" :disabled="v$.otp.$invalid"></BaseButton></div>
          <div>
            <p>
              Didn't receive OTP?
              <span v-if="isResendCountDownActive"
                ><p>{{ timerText }}</p></span
              >
              <SmallButton
                type="button"
                label="Resend OTP"
                @click="resend"
                :disabled="isResendCountDownActive"
              ></SmallButton>
            </p>
          </div>
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: center;
}
</style>
