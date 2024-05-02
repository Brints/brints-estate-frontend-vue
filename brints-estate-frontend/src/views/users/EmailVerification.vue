<script setup>
import { ref } from "vue";
import SuccessMessage from "@/components/messages/SuccessMessage.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

let loading = ref(false);
</script>

<template>
  <div :class="$style.container">
    <div v-if="loading">
      <p>Loading...</p>
      <p>Please wait...</p>
    </div>

    <div v-else>
      <SuccessMessage>
        <p>Your email has been verified successfully.</p>
      </SuccessMessage>
      <!-- Login Button -->
      <BaseButton type="button" class="btn btn-primary" @click="login"> Login </BaseButton>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
