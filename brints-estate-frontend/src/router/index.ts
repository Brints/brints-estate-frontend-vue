import { createRouter, createWebHistory } from "vue-router";

import baseRoutes from "./baseRoutes";
import userRoutes from "./userRoutes";
import listingRoutes from "./listingsRoutes";

const routes = [...baseRoutes, ...userRoutes, ...listingRoutes];

const router = createRouter({
  linkActiveClass: "active-link",
  history: createWebHistory(),
  routes,
});

export default router;
