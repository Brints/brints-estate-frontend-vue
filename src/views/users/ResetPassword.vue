<script setup>
import { ref } from "vue";

import { useUserStore } from "../../stores/userStore.ts";
import { useRoute, useRouter } from "vue-router";

import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import ErrorMessage from "../../components/messages/ErrorMessage.vue";
import SuccessMessage from "../../components/messages/SuccessMessage.vue";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const credentials = ref({
  newPassword: "",
  confirmPassword: "",
});

const resetPassword = async () => {
  const { token, email } = route.params;

  await userStore.resetPassword(token, email, credentials.value.newPassword, credentials.value.confirmPassword);

  //  navigate to login page after 2 seconds
  if (userStore.statusCode === 200) {
    setTimeout(() => {
      router.push({ name: "login" });
    }, 2000);
  }
};
</script>

<template>
  <div class="wrapper">
    <main>
      <BaseCard mode="reset-password">
        <BaseDialog :show="!!userStore.error" title="An error occurred" @close="userStore.handleError()">
          <ErrorMessage :message="userStore.error"></ErrorMessage>
        </BaseDialog>

        <BaseDialog :show="!!userStore.successMessage" title="Success!" fixed>
          <SuccessMessage :message="userStore.successMessage"></SuccessMessage>
        </BaseDialog>

        <BaseDialog :show="!!userStore.loading" title="Loading..." fixed>
          <BaseSpinner></BaseSpinner>
        </BaseDialog>

        <p>
          Don’t worry, we’ve got your back! Just enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <BaseForm @submit="resetPassword">
          <fieldset>
            <legend class="text-2xl text-orange-400 px-4 pr-4">Reset Password</legend>

            <div className="mb-4">
              <BaseInput
                v-model="credentials.newPassword"
                type="password"
                id="password"
                name="newPassword"
                label="New Password"
                placeholder="Enter your new password"
                asterisk="*"
                icon="lock"
              ></BaseInput>
            </div>

            <div className="mb-4">
              <BaseInput
                v-model="credentials.confirmPassword"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm New Password"
                placeholder="Confirm your new password"
                asterisk="*"
                icon="lock"
              ></BaseInput>
            </div>

            <BaseButton type="submit" label="Reset Password" :disabled="userStore.loading"></BaseButton>
          </fieldset>
        </BaseForm>
      </BaseCard>
    </main>

    <div class="footer">
      <BaseFooter></BaseFooter>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
}

.reset-password {
  width: 600px;
}

fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
}
</style>
