const adminRoutes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: () => import("@/views/admin/AdminDashboard.vue"),
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
  },
  {
    path: "/contact-admin",
    name: "contact-admin",
    component: () => import("@/views/admin/ContactAdmin.vue"),
    meta: {
      title: "Contact Admin",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/change-password",
    name: "admin-change-password",
    component: () => import("@/views/users/ChangePassword.vue"),
    meta: {
      title: "Change Password",
      requiresAuth: true,
    },
  },
];

export default adminRoutes;
