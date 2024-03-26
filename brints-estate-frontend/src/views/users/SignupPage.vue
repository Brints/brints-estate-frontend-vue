<script setup>
// import { ref } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import LabelInput from "@/components/LabelInput.vue";
import LabelSelect from "@/components/LabelSelect.vue";
</script>

<template>
  <main :class="$style.wrapper">
    <BaseForm>
      <template #legend>
        <h1>Signup</h1>
      </template>
      <template #content>
        <LabelInput
          label="Full Name"
          id="full-name"
          name="full-name"
          type="text"
          placeholder="Enter your full name"
        />
        <LabelInput
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <LabelInput
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <LabelSelect label="Role" id="role" name="role">
          <option value="">Choose a Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </LabelSelect>
        <BaseButton type="submit">Signup</BaseButton>
      </template>
    </BaseForm>
  </main>
</template>

<style module>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
