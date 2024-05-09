import { createRouter, createWebHistory } from "vue-router";

import baseRoutes from "./baseRoutes";
import userRoutes from "./userRoutes";

const routes = [...baseRoutes, ...userRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
