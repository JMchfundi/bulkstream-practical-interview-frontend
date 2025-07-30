import store from "@/state/store";

export default [
  {
    path: "/home-deleted",
    name: "Home",
    component: () => import("@/EstateAgency/components/index.vue"),
  },
  {
    path: "/propertydetails",
    name: "proertydetails",
    component: () => import("@/EstateAgency/components/property-single.vue"),
  },
  {
    path: "/hotel/:id?",
    name: "Hotel",
    component: () => import("@/views/Hotel.vue"),
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: () => import("@/views/Reservation.vue"),
    props: true,
  },
  {
    path: "/property-grid",
    name: "property-grid",
    component: () => import("@/EstateAgency/components/property-grid.vue"),
    props: true,
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/pages/account/login.vue"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters["auth/loggedIn"]) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/pages/account/register"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters["auth/loggedIn"]) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot-password",
    component: () => import("../views/pages/account/forgot-password"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters["auth/loggedIn"]) {
          next({ name: "home" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch("auth/logOut");
        } else {
          store.dispatch("authfack/logout");
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
          route.push("/login")
        );
        next(authRequiredOnPreviousRoute ? { name: "home" } : { ...routeFrom });
      },
    },
  },

  // Auth-protected pages
  {
    path: "/Xingzheng/dashboard",
    name: "home",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/index"),
  },
  {
    path: "/accounting/coa",
    name: "coa",
    meta: { authRequired: true },
    component: () => import("../views/pages/accounting/coa"),
  },
  {
    path: "/accounting/je",
    name: "je",
    meta: { authRequired: true },
    component: () => import("../views/pages/accounting/je"),
  },
  {
    path: "/display",
    name: "display",
    meta: { authRequired: true },
    component: () => import("../views/display/display"),
  },
  {
    path: "/tresentry",
    name: "tresentry",
    meta: { authRequired: true },
    component: () => import("../views/display/tresentry"),
  },
  {
    path: '/ledger-summary/:accountId',
    name: 'LedgerSummary',
    meta: { authRequired: true },
    component: () => import('@/views/display/LedgerSummary.vue'),
  },
  {
    path: "/Xingzheng/reg_buyers",
    name: "reg_buyers",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/admin-dashboard/system_users"),
  },
  {
    path: "/Xingzheng/reg_agents",
    name: "reg_agent",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/admin-dashboard/agents_report"),
  },
  {
    path: "/Xingzheng/reg_financiers",
    name: "reg_financiers",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/admin-dashboard/financiers_report"),
  },
  {
    path: "/Xingzheng/reg_promoters",
    name: "reg_promoters",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/admin-dashboard/promoters_report"),
  },
  // IMPORTANT: The path '/form' is duplicated with '/entry/:formType?/:id?'.
  // I'm assuming '/form' without parameters is for a generic "new form" page.
  // If '/form' should also use the dynamic Entry component, you might want to remove it
  // or rename 'forms_entry' for clarity if it's a different generic form.
  // For now, I'll keep it as is, but be aware of potential conflicts.
  {
    path: "/form",
    name: "forms_entry",
    meta: { authRequired: true },
    component: () => import("@/views/forms/create.vue"),
  },
  {
    path: "/Xingzheng/addProject",
    name: "add_project_1",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/admin-dashboard/activities/addProject"),
  },
  {
    path: "/Xingzheng/add_project",
    name: "add_project_2",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/admin-dashboard/activities/add_project"),
  },
  {
    path: "/Xingzheng/support",
    name: "support",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/admin-dashboard/view_projects"),
  },
  {
    path: "/kaufer/dashboard",
    name: "kaufer",
    meta: { authRequired: true },
    component: () => import("../views/pages/admin/index"),
  },
  {
    path: "/kaufer/profile",
    name: "profile",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/profile/my_profile"),
  },
  {
    path: "/kaufer/edit_profile",
    name: "edit_profile",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/profile/editProfile/edit_profile"),
  },
  {
    path: "/kaufer/new/doc/upload/document",
    name: "upload_document",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/documents/upload-docs"),
  },
  {
    path: "/kaufer/documents",
    name: "documents",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/documents/my-documents"),
  },
  {
    path: "/kaufer/new/document/upload",
    name: "uploads",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/documents/upload-docs"),
  },
  {
    path: "/kaufer/contribution",
    name: "deposits",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/contribution/my-contribution"),
  },
  {
    path: "/kaufer/contribute",
    name: "contribute",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/contribution/contribute"),
  },
  {
    path: "/kaufer/refund/process/reimbursement",
    name: "reimbursement",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/refund/reimbursement"),
  },
  {
    path: "/kaufer/apply/refund/request",
    name: "requests",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/refund/request-refund"),
  },
  {
    path: "/kaufer/C000923A/mortgage/compliance/",
    name: "mortgage-compliance",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/compliance/mortgage-compliance"),
  },
  {
    path: "/kaufer/projects",
    name: "view_projects",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/projects/view-projects"),
  },
  {
    path: "/kaufer/view_more_details",
    name: "project_details",
    meta: { authRequired: true },
    component: () => import("../views/pages/buyer-dashboard/projects/project_details"),
  },
  {
    path: "/kaufer/house_preference",
    name: "house_plan",
    meta: { authRequired: true },
    component: () => import("../views/pages/forms/validation.vue"),
  },

  // Agent Dashboard
  {
    path: "/ajan/dashboard",
    name: "ajan",
    meta: { authRequired: true },
    component: () => import("../views/pages/agent-dashboard/index-agent"),
  },
  {
    path: "/ajan/view-projects",
    name: "house_types",
    meta: { authRequired: true },
    component: () => import("../views/pages/agent-dashboard/view_projects"),
  },
  {
    path: "/ajan/houses",
    name: "houses",
    meta: { authRequired: true },
    component: () => import("../views/pages/agent-dashboard/available-houses"),
  },
  {
    path: "/ajan/popular-designs",
    name: "designs",
    meta: { authRequired: true },
    component: () => import("../views/pages/agent-dashboard/popular_designs.vue"),
  },
  {
    path: "/ajan/share-designs",
    name: "share_designs",
    meta: { authRequired: true },
    component: () => import("../views/pages/agent-dashboard/share-designs"),
  },

  // Finance Dashboard
  {
    path: "/pesa/dashboard",
    name: "pesa",
    meta: { authRequired: true },
    component: () => import("../views/pages/finance-dashboard/index-finance"),
  },
  {
    path: "/pesa/loan-requests",
    name: "loans",
    meta: { authRequired: true },
    component: () => import("../views/pages/finance-dashboard/loan-requests"),
  },
  {
    path: "/pesa/purchase/requests",
    name: "purchase_requests",
    meta: { authRequired: true },
    component: () => import("../views/pages/finance-dashboard/purchase-requests"),
  },
  {
    path: "/pesa/over_dues",
    name: "dues",
    meta: { authRequired: true },
    component: () => import("../views/pages/finance-dashboard/over_dues"),
  },
  {
    path: "/pesa/browse/projects",
    name: "views",
    meta: { authRequired: true },
    component: () => import("../views/pages/finance-dashboard/view-projects"),
  },

  // Developer Dashboard
  {
    path: "/razrabotchik/index",
    name: "razrabotchik",
    meta: { authRequired: true },
    component: () => import("../views/pages/dev-dashboard/index-developer"),
  },
  {
    path: "/razrabotchik/projects",
    name: "see-project",
    meta: { authRequired: true },
    component: () => import("../views/pages/dev-dashboard/view-projects"),
  },
  {
    path: "/razrabotchik/houses",
    name: "houses",
    meta: { authRequired: true },
    component: () => import("../views/pages/dev-dashboard/available-houses"),
  },
  {
    path: "/razrabotchik/designs",
    name: "designs",
    meta: { authRequired: true },
    component: () => import("../views/pages/dev-dashboard/popular-designs"),
  },
  {
    path: "/razrabotchik/promote",
    name: "share",
    meta: { authRequired: true },
    component: () => import("../views/pages/dev-dashboard/share-designs"),
  },
  // ---
  // Updated Entry route for dynamic form editing
  {
    // The 'formType' parameter tells us which form component to load (e.g., 'client', 'officer', 'group').
    // The 'id' parameter is optional and will be the ID of the specific item to edit.
    // If 'id' is present, the form loads for editing; otherwise, it loads for creating a new item.
    path: "/entry/:formType?/:id?",
    name: "Entry",
    meta: { authRequired: true },
    // This should point to your refactored Entry.vue component
    component: () => import("@/views/forms/create.vue"), // Assuming create.vue is your Entry component
    props: true // Crucial: passes route parameters (formType, id) as props to the component
  },
];