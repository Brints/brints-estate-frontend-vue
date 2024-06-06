const userRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/users/LoginPage.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/users/SignupPage.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/verify-email",
    name: "verify-email",
    // redirect: (to) => {
    //   //perform logic

    //   return { name: "verify-email", query: { token: "asc", email: "asde" } };
    // },
    component: () => import("@/views/users/EmailVerification.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/users/ForgotPassword.vue"),
  },
  {
    path: "/verify-phone",
    name: "verify-phone",
    component: () => import("@/views/users/OTPVerification.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/views/users/SuccessPage.vue"),
  },
];

export default userRoutes;
