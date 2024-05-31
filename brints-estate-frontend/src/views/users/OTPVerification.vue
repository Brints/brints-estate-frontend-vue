<script setup>
import { ref } from "vue";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, helpers, numeric } from "@vuelidate/validators";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
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
const errorMessage = ref("");

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
formData.value.phone = userStore.phoneNumber;

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

// const handleSubmit = async () => {
// loading.value = true;

// try {
//   const response = await axios.post(`${backendUrl}/user/verify-phone`, formData.value);
//   const { data } = response;

//   if (data.statusCode === 200) {
//     router.push({ name: "success" });
//   }
// } catch (error) {
//   console.error(error);
// } finally {
//   loading.value = false;
// }
// };

// const handleInput = (e) => {
//   formData.value[e.target.name] = e.target.value;
// };
</script>

<template>
  <div :class="$style.wrapper">
    <div v-if="errorMessage" :class="$style.error_message">
      <ErrorMessage :message="errorMessage" />
    </div>
    <BaseForm @submit="verifyOTP">
      <fieldset>
        <legend>OTP Verficication</legend>
        <div :class="$style.otp_input">
          <BaseInput
            v-model="v$.otp.$model"
            id="otp"
            label="OTP"
            type="text"
            name="otp"
            placeholder="Enter OTP"
            :isInvalid="v$.$invalid"
          />
          <ValidationError :model="v$.otp"></ValidationError>
        </div>
        <BaseButton type="submit" :disabled="v$.$invalid">Verify OTP</BaseButton>
      </fieldset>
    </BaseForm>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
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
</style>
