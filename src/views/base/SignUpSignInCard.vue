<script setup>
import BaseCard from "../../components/UI/BaseCard.vue";
import BaseDialog from "../../components/UI/BaseDialog.vue";
import GoogleSignup from "@/components/UI/GoogleSignup.vue";
</script>

<template>
  <div>
    <BaseCard>
      <BaseDialog title="" :show="true" fixed><GoogleSignup></GoogleSignup></BaseDialog>
    </BaseCard>
  </div>
</template>

<style scoped></style>
