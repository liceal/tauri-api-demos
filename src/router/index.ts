import { createRouter, createWebHashHistory } from "vue-router";

const routes:any = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
  },
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
  {
    path: "/new2",
    name: "new2",
    component: () => import("../views/new2.vue"),
  },
  {
    path: "/demo2",
    name: "Demo2",
    component: () => import("../views/demo2"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  routes,
});

export default router;
