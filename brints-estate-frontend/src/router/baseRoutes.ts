import LandingPage from "@/views/base/LandingPage.vue";
import { title } from "process";

const baseRoutes = [
  {
    path: "/",
    name: "landing-page",
    component: LandingPage,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  // {
  //   path: "/landing",
  //   redirect: { name: "landing-page" },
  //   meta: {
  //     requiresAuth: false,
  //   },
  // },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/base/AboutUs.vue"),
    meta: {
      title: "About Us",
      requiresAuth: false,
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/base/ContactUs.vue"),
    meta: {
      title: "Contact Us",
      requiresAuth: false,
    },
  },
  {
    path: "/company",
    name: "company",
    component: () => import("@/views/base/CompanyProfile.vue"),
    meta: {
      title: "Company Profile",
      requiresAuth: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/base/NotFound.vue"),
    meta: {
      title: "Not Found",
      requiresAuth: false,
    },
  },
];

export default baseRoutes;
