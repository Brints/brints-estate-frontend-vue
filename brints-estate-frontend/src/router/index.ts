import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
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
    {
      path: "/:path(.*)",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
