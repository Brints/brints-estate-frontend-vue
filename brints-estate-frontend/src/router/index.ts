import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

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
  try {
    const authStore = useAuthStore();
    authStore.loadTokenFromLocalStorage();
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      next({ name: "login" });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in router.beforeEach: ", error);
    next(false);
  }
});

router.onError((error) => {
  console.error("Error in router.onError: ", error);
});

router.afterEach((to) => {
  document.title = `Brints Estate - ${(to.meta.title as string) ?? ""}`;
});

export default router;
