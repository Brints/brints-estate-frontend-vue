<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import SuccessMessage from "@/components/messages/SuccessMessage.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";

const router = useRouter();

const loading = ref(true);
const errorMessage = ref("");

// Parse the email and token from the URL query string
// const email = router.currentRoute.value.query.email;
// const token = router.currentRoute.value.query.token;
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
      throw new Error(`Failed to verify email: ${response.statusText}`);
    }

    loading.value = false;

    // Redirect to the login page
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  } catch (error) {
    console.error(error.message);
    errorMessage.value = error.message;
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
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
}
</style>
