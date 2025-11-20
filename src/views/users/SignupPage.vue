<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import BaseForm from "@/components/form/BaseForm.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import LabelSelect from "@/components/form/LabelSelect.vue";
import ImageInput from "@/components/form/ImageInput.vue";
import CountryCodeSelect from "@/components/form/CountryCodeSelect.vue";

import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

import ErrorMessages from "@/components/messages/ErrorMessage.vue";
import ValidationError from "@/components/messages/ValidationError.vue";

import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { maxSize } from "@/services/validations";

const userStore = useUserStore();
const router = useRouter();

const currentStep = ref(1);
const totalSteps = 3;

const formData = ref({
  fullname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  avatar: null,
  code: "",
  gender: "",
});

const rules = {
  fullname: {
    required: helpers.withMessage("Fullname is required", required),
    minLength: helpers.withMessage("Fullname should be more than 3 characters", minLength(3)),
    maxLength: helpers.withMessage("Fullname should not be more than 80 characters", maxLength(80)),
  },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Email must be valid", email),
  },
  phone: {
    required: helpers.withMessage("Phone number is required", required),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage("Password must be at least 8 characters", minLength(8)),
    maxLength: helpers.withMessage("Password must be at most 16 characters", maxLength(16)),
  },
  confirmPassword: {
    required: helpers.withMessage("Confirm Password is required", required),
  },
  avatar: {
    maxSize: helpers.withMessage("Avatar size should not be more than 4MB", maxSize(4 * 1024 * 1024)),
  },
  code: {
    required: helpers.withMessage("Code required", required),
  },
  gender: {
    required: helpers.withMessage("Gender is required", required),
  },
};

const v$ = useVuelidate(rules, formData);

const validateStep = async (step) => {
  if (step === 1) {
    const isNameValid = await v$.value.fullname.$validate();
    const isGenderValid = await v$.value.gender.$validate();
    const isAvatarValid = await v$.value.avatar.$validate();
    return isNameValid && isGenderValid && isAvatarValid;
  }
  if (step === 2) {
    const isEmailValid = await v$.value.email.$validate();
    const isCodeValid = await v$.value.code.$validate();
    const isPhoneValid = await v$.value.phone.$validate();
    return isEmailValid && isCodeValid && isPhoneValid;
  }
  return true;
};

const nextStep = async () => {
  if (await validateStep(currentStep.value)) {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleSignup = async () => {
  if (!(await v$.value.$validate())) return;

  await userStore.signup(formData.value);

  if (userStore.statusCode === 201) {
    setTimeout(() => {
      router.push({ name: "verify-phone" });
    }, 2000);
  }
};

const label = computed(() => {
  return userStore.loading ? "Creating Account..." : "Create Account";
});

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return "Personal Details";
    case 2: return "Contact Info";
    case 3: return "Security";
    default: return "";
  }
});

const handleGoogleSignup = () => {
  // Mock Google Signup
  console.log("Google Signup Clicked");
};
</script>

<template>
  <div class="min-h-screen flex bg-white font-sans text-slate-800">
    <!-- Left Side - Image & Branding (Hidden on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
      <div class="absolute inset-0 bg-indigo-900/40 z-10 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10"></div>
      <img 
        src="@/assets/images/house-1.jpg" 
        alt="Luxury Home" 
        class="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
      />
      
      <div class="relative z-20 flex flex-col justify-between w-full p-12 text-white">
        <div>
          <router-link :to="{ name: 'landing-page' }" class="text-2xl font-bold flex items-center gap-2">
             <span>Brints</span>
             <span class="px-2 py-1 rounded text-sm font-semibold bg-white text-indigo-900">Estate</span>
          </router-link>
        </div>
        
        <div class="mb-12">
          <h2 class="text-4xl font-bold mb-6 leading-tight">Join the exclusive community of luxury property owners.</h2>
          <p class="text-lg text-slate-200 max-w-md">Access premium listings, expert guidance, and secure transactions all in one place.</p>
        </div>
        
        <div class="text-sm text-slate-400">
          &copy; {{ new Date().getFullYear() }} Brints Estate. All rights reserved.
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 overflow-y-auto">
      <div class="w-full max-w-md">
        <!-- Mobile Header -->
        <div class="lg:hidden mb-8 text-center">
          <router-link :to="{ name: 'landing-page' }" class="text-2xl font-bold inline-flex items-center gap-2">
             <span class="text-indigo-900">Brints</span>
             <span class="px-2 py-1 rounded text-sm font-semibold bg-indigo-600 text-white">Estate</span>
          </router-link>
        </div>

        <div class="mb-6">
          <router-link :to="{ name: 'landing-page' }" class="text-sm text-slate-500 hover:text-indigo-600 transition mb-4 inline-flex items-center gap-2">
            <font-awesome-icon :icon="faArrowLeft" /> Back to Home
          </router-link>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Create an Account</h1>
          <p class="text-slate-600">Step {{ currentStep }} of {{ totalSteps }}: {{ stepTitle }}</p>
        </div>

        <!-- Step Indicator -->
        <div class="flex gap-2 mb-8">
          <div 
            v-for="step in totalSteps" 
            :key="step"
            class="h-1 flex-1 rounded-full transition-all duration-300"
            :class="step <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'"
          ></div>
        </div>

        <BaseDialog :show="!!userStore.loading" title="Processing..." fixed>
          <BaseSpinner />
        </BaseDialog>

        <BaseDialog :show="userStore.statusCode === 201" title="Signup Success" fixed>
          <p class="text-center text-green-600">Redirecting to OTP verification page...</p>
        </BaseDialog>

        <BaseDialog :show="!!userStore.error" title="An error occurred" @close="userStore.handleError()">
          <ErrorMessages :message="userStore.error" class="text-red-500" />
        </BaseDialog>

        <!-- Google Signup Button (Only on Step 1) -->
        <div v-if="currentStep === 1" class="mb-8">
          <button 
            @click="handleGoogleSignup"
            class="w-full py-3 px-4 border border-slate-300 rounded-lg flex items-center justify-center gap-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            <font-awesome-icon :icon="faGoogle" class="text-red-500 text-lg" />
            Sign up with Google
          </button>
          <div class="relative my-6 text-center">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200"></div>
            </div>
            <span class="relative px-4 bg-white text-sm text-slate-500">Or continue with email</span>
          </div>
        </div>

        <BaseForm @submit="handleSignup" class="space-y-6">
          
          <!-- Step 1: Personal Details -->
          <div v-if="currentStep === 1" class="space-y-5 animate-fade-in">
             <!-- Avatar Upload -->
            <div class="flex justify-center mb-6">
              <div class="w-full">
                <ImageInput
                  v-model="v$.avatar.$model"
                  label="Profile Photo"
                  id="avatar"
                  name="avatar"
                  icon="image"
                  :multiple="false"
                  class="w-full"
                />
                <ValidationError :model="v$.avatar" class="mt-1 text-red-500 text-sm" />
              </div>
            </div>

            <!-- Full Name -->
            <div>
              <BaseInput
                v-model="v$.fullname.$model"
                label="Full Name"
                id="fullname"
                name="fullname"
                type="text"
                placeholder="e.g. John Doe"
                asterisk="*"
                icon="user"
                class="w-full"
              />
              <ValidationError :model="v$.fullname" class="mt-1 text-red-500 text-sm" />
            </div>

             <!-- Gender -->
            <div>
              <LabelSelect
                label="Gender"
                id="gender"
                name="gender"
                asterisk="*"
                icon="venus-mars"
                v-model="v$.gender.$model"
                class="w-full"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </LabelSelect>
              <ValidationError :model="v$.gender" class="mt-1 text-red-500 text-sm" />
            </div>
          </div>

          <!-- Step 2: Contact Info -->
          <div v-if="currentStep === 2" class="space-y-5 animate-fade-in">
             <!-- Email -->
            <div>
              <BaseInput
                v-model="v$.email.$model"
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder="e.g. john@example.com"
                asterisk="*"
                icon="envelope"
                class="w-full"
              />
              <ValidationError :model="v$.email" class="mt-1 text-red-500 text-sm" />
            </div>

            <!-- Phone & Code -->
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-1">
                <CountryCodeSelect
                  v-model="v$.code.$model"
                  label="Code"
                  id="code"
                  name="code"
                  asterisk="*"
                  icon="globe"
                  class="w-full"
                />
                <ValidationError :model="v$.code" class="mt-1 text-red-500 text-sm" />
              </div>
              <div class="col-span-2">
                <BaseInput
                  v-model="v$.phone.$model"
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="123 456 7890"
                  asterisk="*"
                  icon="phone"
                  class="w-full"
                />
                <ValidationError :model="v$.phone" class="mt-1 text-red-500 text-sm" />
              </div>
            </div>
          </div>

          <!-- Step 3: Security -->
          <div v-if="currentStep === 3" class="space-y-5 animate-fade-in">
            <!-- Password -->
            <div>
              <BaseInput
                v-model="v$.password.$model"
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                asterisk="*"
                icon="lock"
                special="eye"
                special_icon="password_eye"
                class="w-full"
              />
              <ValidationError :model="v$.password" class="mt-1 text-red-500 text-sm" />
            </div>

            <!-- Confirm Password -->
            <div>
              <BaseInput
                v-model="v$.confirmPassword.$model"
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                asterisk="*"
                icon="lock"
                special="eye"
                special_icon="confirm_eye"
                class="w-full"
              />
              <ValidationError :model="v$.confirmPassword" class="mt-1 text-red-500 text-sm" />
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="pt-4 flex gap-4">
            <button 
              v-if="currentStep > 1"
              type="button"
              @click="prevStep"
              class="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            
            <button
              v-if="currentStep < totalSteps"
              type="button"
              @click="nextStep"
              class="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              Next <font-awesome-icon :icon="faArrowRight" />
            </button>

            <BaseButton
              v-if="currentStep === totalSteps"
              type="submit"
              mode="signup"
              :label="label"
              :disabled="v$.$invalid || userStore.loading"
              class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
            />
          </div>
          
          <div class="text-center mt-6 text-slate-500 text-sm">
            Already have an account? 
            <router-link :to="{ name: 'login' }" class="text-indigo-600 font-semibold hover:text-indigo-800">
              Log in
            </router-link>
          </div>
        </BaseForm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-slow-zoom {
  animation: slowZoom 20s infinite alternate;
}

@keyframes slowZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
