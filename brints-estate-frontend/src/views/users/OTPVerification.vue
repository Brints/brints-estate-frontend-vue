<script setup>
import { ref } from "vue";
import axios from "axios";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const formData = ref({
  otp: "",
  phone: "",
});

const loading = ref(false);

// Fetch the phone number from the store
formData.value.phone = userStore.phoneNumber;

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const handleSubmit = async () => {
  loading.value = true;

  try {
    const response = await axios.post(`${backendUrl}/user/verify-phone`, formData.value);
    const { data } = response;

    if (data.statusCode === 200) {
      router.push({ name: "login" });
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleInput = (e) => {
  formData.value[e.target.name] = e.target.value;
};
</script>

<template>
  <div :class="$style.wrapper">
    <BaseForm @submit.prevent="handleSubmit" legend="OTP Verification">
      <template #content>
        <BaseInput id="otp" label="OTP" type="text" name="otp" placeholder="Enter OTP" @input="handleInput" />
        <BaseButton type="submit">Verify OTP</BaseButton>
      </template>
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
</style>
