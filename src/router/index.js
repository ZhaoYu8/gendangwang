Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "plan",
    component: () => import(/* webpackChunkName: "Plan" */ "../views/Plan.vue"),
  },
  {
    path: "/plan",
    name: "plan",
    component: () => import(/* webpackChunkName: "Plan" */ "../views/Plan.vue"),
  },
  {
    path: "/deliverGoods",
    name: "deliverGoods",
    component: () => import(/* webpackChunkName: "DeliverGoods" */ "../views/DeliverGoods.vue"),
  },
  {
    path: "/deliveryList",
    name: "deliveryList",
    component: () => import(/* webpackChunkName: "DeliveryList" */ "../views/DeliveryList.vue"),
  },
  {
    path: "*",
    name: "plan",
    redirect: "/plan",
  },
];

const router = new VueRouter({
  mode: "",
  base: process.env.BASE_URL,
  routes,
});

export default router;
