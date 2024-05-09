const userRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/users/LoginPage.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/users/SignupPage.vue"),
  },
  {
    path: "/verify-email",
    name: "verify-email",
    component: () => import("@/views/users/EmailVerification.vue"),
  },
  {
    path: "/verify-phone",
    name: "verify-phone",
    component: () => import("@/views/users/OTPVerification.vue"),
  },
];

export default userRoutes;
