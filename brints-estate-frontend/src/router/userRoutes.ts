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
    component: () => import("@/views/users/EmailVerification.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/verify-phone",
    name: "verify-phone",
    component: () => import("@/views/users/OTPVerification.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

export default userRoutes;
