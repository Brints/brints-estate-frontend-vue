import LandingPage from "@/views/base/LandingPage.vue";

const baseRoutes = [
  {
    path: "/",
    name: "landing-page",
    component: LandingPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/landing",
    redirect: { name: "landing-page" },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/base/AboutUs.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/base/ContactUs.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/company",
    name: "company",
    component: () => import("@/views/base/CompanyProfile.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/base/NotFound.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

export default baseRoutes;
