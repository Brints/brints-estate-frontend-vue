<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(true);

// Parse the email and token from the URL query string
const email = router.currentRoute.value.query.email;
const token = router.currentRoute.value.query.token;

// Send a GET request function to the backend to verify the email using fetch
const verifyEmail = async () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/verify-email?email=${email}&token=${token}`;

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
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  verifyEmail();
});
</script>

<template>
  <div></div>
</template>

<style module></style>
