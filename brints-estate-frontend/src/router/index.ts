import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import baseRoutes from "./baseRoutes";
import userRoutes from "./userRoutes";
import listingRoutes from "./listingsRoutes";

const routes: Array<RouteRecordRaw> = [...baseRoutes, ...userRoutes, ...listingRoutes];

const router = createRouter({
  linkActiveClass: "active-link",
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
