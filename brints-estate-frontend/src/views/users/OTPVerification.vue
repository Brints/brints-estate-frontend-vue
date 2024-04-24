<script>
import BaseForm from "@/components/form/BaseForm.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

export default {
  name: "OTPVerification",
  components: {
    BaseForm,
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      form: {
        otp: "",
      },
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await this.$store.dispatch("users/verifyOTP", this.form);
        this.$router.push({ name: "login" });
      } catch (error) {
        this.loading = false;
      }
    },
    handleInput(e) {
      this.form[e.target.name] = e.target.value;
    },
  },
};
</script>

<template>
  <div :class="$style.wrapper">
    <BaseForm @submit.prevent="submit" :loading="loading">
      <template #legend>
        <h1>OTP Verification</h1>
      </template>
      <template #content>
        <BaseInput id="otp" label="OTP" type="text" name="otp" placeholder="Enter OTP" @input="handleInput" />
        <BaseButton type="submit" :loading="loading">Verify OTP</BaseButton>
      </template>
    </BaseForm>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
