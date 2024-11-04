import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/vue3-infinite-scroll/docs",
      redirect: "/vue3-infinite-scroll/docs/index.html",
      
    },
  ],
});

export default router;
