import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";

const userRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/users/LoginPage.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutUs.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/users/SignupPage.vue"),
    },
    {
      path: "/:path(.*)*",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default userRouter;
