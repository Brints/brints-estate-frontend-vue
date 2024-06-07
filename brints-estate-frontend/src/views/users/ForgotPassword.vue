<script setup>
import { ref } from "vue";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseCard from "@/components/UI/BaseCard.vue";

const email = ref("");

const submitForm = () => {
  console.log("Form submitted");
};
</script>

<template>
  <div class="container">
    <main>
      <BaseCard mode="forgot-password">
        <BaseDialog>
          <BaseSpinner></BaseSpinner>
        </BaseDialog>

        <BaseForm @submit="submitForm">
          <fieldset>
            <legend className="text-center text-2xl">Forgot Password</legend>
            <div class="input">
              <BaseInput
                v-model="email"
                type="email"
                name="email"
                id="email"
                label="Reset Password"
                placeholder="Enter your registered email address"
                asterisk="*"
                icon="envelope"
              />
            </div>
            <BaseButton type="submit" label="Reset"></BaseButton>
          </fieldset>
        </BaseForm>
      </BaseCard>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
main {
  width: 600px;
}
.forgot-password {
  background-color: rgb(23, 80, 80);
}
.input {
  margin-bottom: 1rem;
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
</style>
