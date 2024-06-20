<script setup>
import { ref } from "vue";

import { useUserStore } from "../../stores/userStore";
import { useRoute /*useRouter*/ } from "vue-router";

import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseForm from "@/components/form/BaseForm.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

const userStore = useUserStore();
const route = useRoute();
// const router = useRouter();

const credentials = ref({
  password: "",
  confirmPassword: "",
});

const resetPassword = async () => {
  const { token, email } = route.params;

  await userStore.resetPassword(token, email, credentials.value.password, credentials.value.confirmPassword);

  // if (userStore.successMessage !== "") {
  //   router.push({ name: "login" });
  // }
};
</script>

<template>
  <div class="wrapper">
    <main>
      <BaseCard mode="reset-password">
        <BaseDialog :show="!!userStore.errorMessage" title="An error occurred" @close="userStore.handleError()">
          <p>{{ userStore.errorMessage }}</p>
        </BaseDialog>

        <BaseDialog :show="!!userStore.successMessage" title="Success" @close="userStore.successMessage = ''">
          <p>{{ userStore.successMessage }}</p>
        </BaseDialog>

        <BaseDialog :show="!!userStore.loading" title="Loading..." fixed>
          <BaseSpinner></BaseSpinner>
        </BaseDialog>

        <BaseForm @submit="resetPassword">
          <fieldset>
            <legend class="text-2xl text-orange-400 px-4 pr-4">Reset Password</legend>

            <div className="mb-4">
              <BaseInput
                v-model="credentials.password"
                type="password"
                name="password"
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
