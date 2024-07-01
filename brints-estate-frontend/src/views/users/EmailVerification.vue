<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import SuccessMessage from "@/components/messages/SuccessMessage.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";

import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

// Parse the email and token from the URL query string
const queryParams = new URLSearchParams(window.location.search);
const email = queryParams.get("email");
const token = queryParams.get("token");

// Send a GET request function to the backend to verify the email using fetch
const verifyEmail = async () => {
  await userStore.VerifyEmail(token, email);

  // Redirect to the login page
  if (userStore.statusCode === 200) {
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  }
};

onMounted(() => {
  verifyEmail();
});
</script>

<template>
  <div :class="$style.wrapper">
    <p v-if="userStore.loading">Verifying email...</p>
    <SuccessMessage v-else-if="!userStore.loading && !userStore.errorObject"
      >Email verified successfully. Redirecting to the login page...</SuccessMessage
    >
    <ErrorMessage v-else :message="userStore.errorObject.message" />
    <div className="block" v-if="!userStore.loading && userStore.errorObject">
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
