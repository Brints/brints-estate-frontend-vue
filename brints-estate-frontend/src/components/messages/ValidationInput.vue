<script setup>
import { ref, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

const props = defineProps({
  formData: Object,
});

const validations = makeValidationRules(props.formData);

const v$ = useVuelidate(validations);

function makeValidationRules(formData) {
  return {
    formData: {
      fullname: { required: required },
      email: { required: required, email: email },
      phone: { required: required, minLength: minLength(11) },
      gender: { required: required },
      password: { required: required, minLength: minLength(8) },
      confirmPassword: { required: required, sameAs: sameAs(formData.password) },
    },
  };
}

const errorMessage = ref("");

watch(v$, (val) => {
  // const errors = Object.values(val.formData.$params).filter((param) => !param);
  const errors = Object.values(val.$error).flat();
  errorMessage.value = errors.length > 0 ? errors[0] : "";
});
</script>

<template>
  <div v-if="errorMessage" class="text-red-600 text-sm mb-2">
    {{ errorMessage }}
  </div>
</template>

<style module></style>
