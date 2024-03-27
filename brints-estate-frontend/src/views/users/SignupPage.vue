<script setup>
// import { ref } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import LabelInput from "@/components/LabelInput.vue";
import LabelSelect from "@/components/LabelSelect.vue";
import ImageInput from "../../components/ImageInput.vue";
</script>

<template>
  <main :class="$style.wrapper">
    <BaseForm>
      <template #legend>
        <h1>Sign Up</h1>
      </template>
      <template #content>
        <ImageInput label="Upload your Avatar" id="avatar" name="avatar" />
        <section :class="$style.form_content">
          <section class="left-column">
            <LabelInput
              label="Full Name"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name e.g. John Doe"
            />
            <LabelInput
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email e.g. johndoe@example.com"
            />
            <LabelInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </section>
          <section class="right-column">
            <LabelInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
            <LabelSelect label="Gender" id="gender" name="gender">
              <option value="">Choose your Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </LabelSelect>
            <LabelInput
              label="Confirm Password"
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your Password"
            />
          </section>
        </section>

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

.form_content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
