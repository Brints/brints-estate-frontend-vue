import LandingPage from "@/views/LandingPage.vue";

const baseRoutes = [
  {
    path: "/",
    name: "landing-page",
    component: LandingPage,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutUs.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactUs.vue"),
  },
  {
    path: "/company",
    name: "company",
    component: () => import("@/views/CompanyProfile.vue"),
  },
];

export default baseRoutes;
