Vue.use(VueRouter);

const routes = [
  {
    path: '/tab',
    name: 'tab',
    component: () => import(/* webpackChunkName: "tab" */ '../components/Tabs.vue'),
    children: [
      {
        path: '/depotInfo',
        name: 'depotInfo',
        component: () => import(/* webpackChunkName: "DepotInfo" */ '../views/DepotInfo.vue'),
      },
      {
        path: '/depot',
        name: 'depot',
        component: () => import(/* webpackChunkName: "Depot" */ '../views/Depot.vue'),
      },
      {
        path: '/report',
        name: 'report',
        component: () => import(/* webpackChunkName: "report" */ '../views/Report.vue'),
      },
      {
        path: '/enterDepot',
        name: 'enterDepot',
        component: () => import(/* webpackChunkName: "EnterDepot" */ '../views/EnterDepot.vue'),
      },
      {
        path: '/outDepot',
        name: 'outDepot',
        component: () => import(/* webpackChunkName: "outDepot" */ '../views/OutDepot.vue'),
      },
      {
        path: '/reviewDepot',
        name: 'reviewDepot',
        component: () => import(/* webpackChunkName: "ReviewDepot" */ '../views/ReviewDepot.vue'),
      },
      {
        path: '/plan',
        name: 'plan',
        component: () => import(/* webpackChunkName: "Plan" */ '../views/Plan.vue'),
      },
      {
        path: '/deliverGoods',
        name: 'deliverGoods',
        component: () => import(/* webpackChunkName: "DeliverGoods" */ '../views/DeliverGoods.vue'),
      },
      {
        path: '/deliveryList',
        name: 'deliveryList',
        component: () => import(/* webpackChunkName: "DeliveryList" */ '../views/DeliveryList.vue'),
      },
      {
        path: '/formTable',
        name: 'formTable',
        component: () => import(/* webpackChunkName: "formTable" */ '../views/FormTable.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/plan',
  },
  {
    path: '*',
    redirect: '/plan',
  },
];

const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes,
});

export default router;
