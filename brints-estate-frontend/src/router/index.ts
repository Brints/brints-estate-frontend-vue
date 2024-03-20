import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/users/LandingPage.vue";
// import LandingPage from "@/views/users/LandingPage.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage,
    },
    // {
    //   path: "/register",
    //   name: "signup",
    //   component: () => import("@/views/users/SignupPage.vue"),
    // },
  ],
});

export default router;
