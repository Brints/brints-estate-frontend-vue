import path = require("node:path");

const userRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/users/LoginPage.vue"),
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/users/SignupPage.vue"),
    meta: {
      title: "Signup",
      requiresAuth: false,
    },
  },
  {
    path: "/verify-email",
    name: "verify-email",
    component: () => import("@/views/users/EmailVerification.vue"),
    meta: {
      title: "Verify Email",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/users/ForgotPassword.vue"),
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    },
  },
  {
    path: "/verify-phone",
    name: "verify-phone",
    component: () => import("@/views/users/OTPVerification.vue"),
    meta: {
      title: "Verify Phone",
      requiresAuth: false,
    },
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/views/users/SuccessPage.vue"),
    meta: {
      title: "Success",
      requiresAuth: false,
    },
  },
  {
    path: "/resend-token",
    name: "resend-token",
    component: () => import("@/views/users/ResendEmailVerificationToken.vue"),
    mata: {
      title: "Resend Token",
      requiresAuth: false,
    },
  },
];

export default userRoutes;
