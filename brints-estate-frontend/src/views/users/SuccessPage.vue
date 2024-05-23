<script setup>
import SmallButton from "@/components/buttons/SmallButton.vue";
</script>

<template>
  <div>
    <p>Your phone number has been verified successfully.</p>
    <p>Check your email to verify your email address.</p>
    <router-link :to="{ name: 'login' }">
      <SmallButton type="submit"><span className="text-green-400">Get Started</span></SmallButton>
    </router-link>
  </div>
</template>

<style scoped>
div {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
