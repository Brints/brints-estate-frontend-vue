<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email as emailValidator, helpers } from "@vuelidate/validators";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseCard from "@/components/UI/BaseCard.vue";
import ValidationError from "@/components/messages/ValidationError.vue";

const email = ref("");

const rules = {
  email: {
    required: helpers.withMessage("Email is required.", required),
    emailValidator: helpers.withMessage("Email must be a valid email address", emailValidator),
  },
};

const v$ = useVuelidate(rules, email);

const submitForm = async () => {
  if (!(await v$.value.$validate())) return;
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
