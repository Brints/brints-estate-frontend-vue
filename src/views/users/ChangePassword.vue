<script setup>
import { ref, onMounted } from "vue";

import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";
import ListingsHeader from "@/components/layout/ListingsHeader.vue";
import ErrorMessage from "@/components/messages/ErrorMessage.vue";
import SuccessMessage from "@/components/messages/SuccessMessage.vue";
// import ValidationError from "@/components/messages/ValidationError.vue";
import BaseCard from "@/components/UI/BaseCard.vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const formData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const changePassword = async () => {
  await userStore.changePassword(
    formData.value.oldPassword,
    formData.value.newPassword,
    formData.value.confirmPassword
  );

  if (userStore.statusCode === 200) {
    router.push({ name: "change-password" });
  }
};

onMounted(() => {
  authStore.loadTokenFromLocalStorage();
  if (!authStore.isLoggedIn) {
    router.push({ name: "login" });
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <ListingsHeader></ListingsHeader>
    </div>

    <div class="main_section">
      <div class="error_message">
        <ErrorMessage :message="userStore.error"></ErrorMessage>
      </div>
      <div class="success_message">
        <SuccessMessage :message="userStore.successMessage"></SuccessMessage>
      </div>
      <BaseCard mode="card_change_password">
        <BaseForm>
          <fieldset>
            <legend>Change Password</legend>
            <div>
              <BaseInput
                v-model="formData.oldPassword"
                label="Old Password"
                id="oldPassword"
                type="password"
                name="oldPassword"
                placeholder="Enter your old password"
                asterisk="*"
                icon="lock"
              ></BaseInput>
              <!-- <ValidationError :message="v$.value.oldPassword"></ValidationError> -->
            </div>

            <div>
              <BaseInput
                v-model="formData.newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                asterisk="*"
                icon="lock"
              ></BaseInput>
              <!-- <ValidationError :message="v$.value.newPassword"></ValidationError> -->
            </div>

            <div>
              <BaseInput
                v-model="formData.confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                asterisk="*"
                icon="lock"
              ></BaseInput>
              <!-- <ValidationError :message="v$.value.confirmPassword"></ValidationError> -->
            </div>
            <BaseButton label="Change Password" type="submit" @click="changePassword"></BaseButton>
          </fieldset>
        </BaseForm>
      </BaseCard>
    </div>

    <div class="footer">
      <BaseFooter></BaseFooter>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main_section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.card_change_password {
  /* padding: 1rem; */
  width: 600px;
}

fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

legend {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0 10px;
}

.error_message {
  display: flex;
  justify-content: center;
  background-color: red;
  color: white;
}
</style>
