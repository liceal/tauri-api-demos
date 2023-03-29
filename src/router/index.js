import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/new1",

    name: "new1",

    component: () => import("../views/new1.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  routes,
});

export default router;
