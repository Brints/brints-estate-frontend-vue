const listingRoutes = [
  {
    path: "/listings",
    name: "listings",
    component: () => import("@/views/listings/AllListings.vue"),
    meta: {
      requiresAuth: true,
      title: "Listings",
    },
  },
];

export default listingRoutes;
