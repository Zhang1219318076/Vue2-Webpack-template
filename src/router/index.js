import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // {
    //   path: "*",
    //   component: () => import("/views/home"),
    //   meta: {
    //     title: "home",
    //   },
    // },
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/Index/index.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/yongread",
      name: "yongread",
      component: () => import("../views/Yongread/index.vue"),
      meta: {
        title: "协议阅读",
      },
    },
  ],
});

export default router;
