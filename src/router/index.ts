import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/docs",
      redirect: "/docs/index.html",
    },
  ],
});

export default router;
