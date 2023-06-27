import type { RouteRecordRaw } from "vue-router";

const home: RouteRecordRaw[] = [{
  path: "/home",
  name: "Home",
  component: () => import("~/pages/home/index.vue"),
  meta: {
    title: "Home",
  },
},
{
  path: "/tutorial",
  name: "Tutorial",
  component: () => import("~/pages/home/components/Tutorial.vue"),
},
];

export default home;
