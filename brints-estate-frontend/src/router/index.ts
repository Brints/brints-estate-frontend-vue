import { createRouter, createWebHashHistory } from "vue-router";
import LandingPage from "@/views/users/LandingPage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/users/LoginPage.vue"),
    },
  ],
});

export default router;
