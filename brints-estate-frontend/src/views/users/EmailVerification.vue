<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import SuccessMessage from "@/components/messages/SuccessMessage.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";

const router = useRouter();

const loading = ref(true);
const errorMessage = ref("");

// Parse the email and token from the URL query string
const queryParams = new URLSearchParams(window.location.search);
const email = queryParams.get("email");
const token = queryParams.get("token");

// Send a GET request function to the backend to verify the email using fetch
const verifyEmail = async () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/verify-email?token=${token}&email=${email}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    loading.value = false;

    // Redirect to the login page
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    const errorData = JSON.parse(error.message);
    const { message } = errorData.error;
    errorMessage.value = message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  verifyEmail();
});
</script>

<template>
  <div :class="$style.wrapper">
    <p v-if="loading">Verifying email...</p>
    <SuccessMessage v-else-if="!loading && !errorMessage"
      >Email verified successfully. Redirecting to the login page...</SuccessMessage
    >
    <ErrorMessage v-else :message="errorMessage" />
    <div v-if="!loading && errorMessage" className="block">
      <router-link :to="{ name: 'resend-token' }">
        <SmallButton type="button" label="Resend Email Verification Token" />
      </router-link>
    </div>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
}

.wrapper p {
  font-size: 1.5rem;
}

.wrapper a:focus {
  outline: none;
}
</style>
