import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/docs",
      redirect: "/docs/index.html",
      beforeEnter() {
        window.location.href = '/docs/index.html'; 
      },
    },
  ],
});

export default router;
