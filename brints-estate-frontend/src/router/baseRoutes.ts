import LandingPage from "@/views/LandingPage.vue";

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
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutUs.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactUs.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/company",
    name: "company",
    component: () => import("@/views/CompanyProfile.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

export default baseRoutes;
