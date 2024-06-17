<script setup>
// non-relative imports
import { ref } from "vue";
// import { useRouter } from "vue-router";

// relative imports
import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";

import { useUserStore } from "@/stores/userStore";

// const router = useRouter();
const userStore = useUserStore();

const email = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const resendToken = async () => {
  await userStore.resendEmailToken(email.value);

  console.log(userStore.error);

  if (userStore.error) {
    errorMessage.value = userStore.error;
  } else {
    successMessage.value = "Token sent successfully.";
  }
};
</script>

<template>
  <div :class="$style.container">
    <main>
      <BaseCard :mode="$style.resend_card">
        <BaseDialog :show="!!errorMessage" title="An error occurred. Try again." @close="errorMessage = ''">
          <ErrorMessage :message="errorMessage"></ErrorMessage>
        </BaseDialog>

        <BaseDialog :show="userStore.loading" title="Generating New Verification Token." fixed>
          <BaseSpinner></BaseSpinner>
        </BaseDialog>

        <BaseForm @submit="resendToken">
          <fieldset>
            <legend>Resend Email Token</legend>
            <div :class="$style.input">
              <BaseInput
                v-model="email"
                id="email"
                type="text"
                name="email"
                label="Email"
                placeholder="Enter your registered email."
                asterisk="*"
                icon="envelope"
              ></BaseInput>
            </div>
            <BaseButton type="submit" label="Resend Token" :disabled="!email"></BaseButton>
          </fieldset>
        </BaseForm>
      </BaseCard>
    </main>
  </div>

  <div :class="$style.footer">
    <BaseFooter></BaseFooter>
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

main {
  width: 600px;
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

.resend_card {
  background-color: rgb(23, 80, 80);
}

.input {
  margin-bottom: 1rem;
}
</style>
