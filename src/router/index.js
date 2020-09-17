Vue.use(VueRouter);

const routes = [
  {
    path: "/depotInfo",
    name: "depotInfo",
    component: () => import(/* webpackChunkName: "DepotInfo" */ "../views/DepotInfo.vue"),
  },
  {
    path: "/depot",
    name: "depot",
    component: () => import(/* webpackChunkName: "Depot" */ "../views/Depot.vue"),
  },
  {
    path: "/enterDepot",
    name: "enterDepot",
    component: () => import(/* webpackChunkName: "EnterDepot" */ "../views/EnterDepot.vue"),
  },
  {
    path: "/outDepot",
    name: "outDepot",
    component: () => import(/* webpackChunkName: "outDepot" */ "../views/OutDepot.vue"),
  },
  {
    path: "/reviewDepot",
    name: "reviewDepot",
    component: () => import(/* webpackChunkName: "ReviewDepot" */ "../views/ReviewDepot.vue"),
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
