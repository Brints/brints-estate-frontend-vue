<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import ValidationError from "@/components/messages/ValidationError.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import SuccessMessage from "@/components/messages/SuccessMessage.vue";

const userStore = useUserStore();
const router = useRouter();

const credentials = ref({
  email: "",
});

const rules = {
  email: {
    required: helpers.withMessage("Email is required.", required),
    email: helpers.withMessage("Email must be a valid email address", email),
  },
};

const v$ = useVuelidate(rules, credentials);

const submitForm = async () => {
  if (!(await v$.value.$validate())) return;

  await userStore.forgotPassword(credentials.value.email);

  if (userStore.statusCode === 200) {
    router.push({ name: "forgot-password" });
  }
};
</script>

<template>
  <div class="container">
    <main>
      <BaseCard mode="forgot-password">
        <BaseDialog :show="!!userStore.error" title="Error: An error occurred." @close="userStore.error = null">
          <ErrorMessage :message="userStore.error"></ErrorMessage>
        </BaseDialog>

        <BaseDialog :show="userStore.statusCode === 200" title="Success!" @close="userStore.statusCode = 0">
          <SuccessMessage :message="userStore.successMessage" />
        </BaseDialog>

        <BaseDialog :show="userStore.loading" title="Submitting..." fixed>
          <BaseSpinner></BaseSpinner>
        </BaseDialog>

        <BaseForm @submit="submitForm">
          <fieldset>
            <legend className="text-center text-2xl">Forgot Password</legend>
            <div class="input">
              <BaseInput
                v-model="v$.email.$model"
                type="email"
                name="email"
                id="email"
                label="Email"
                placeholder="Enter your registered email address"
                asterisk="*"
                icon="envelope"
              />
              <ValidationError :model="v$.email"></ValidationError>
            </div>
            <BaseButton type="submit" label="Reset" :disabled="v$.$invalid"></BaseButton>
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
