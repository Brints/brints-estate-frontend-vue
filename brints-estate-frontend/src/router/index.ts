import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/users/LandingPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage,
    },
    {
      path: "/register",
      name: "signup",
      component: () => import("@/views/users/SignupPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/users/LoginPage.vue"),
    },
    {
      path: "/user/:token",
      name: "verify-email",
      component: () => import("@/views/users/VerifyEmailPage.vue"),
    },
  ],
});

export default router;
