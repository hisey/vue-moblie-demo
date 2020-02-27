import Vue from "vue";
import Router from "vue-router";
import store from "./store";
Vue.use(Router);

const routes = [{
  path: "/",
  component: () => import("./view/layout/index.vue"),
  redirect: "/demo",
  name: "layout",
  children: [{
    path: "demo",
    name: "demo",
    component: () => import("./view/demo/index.vue"),
    meta: {
      title: "demo",
      isLogin: false
    }
  }]
}
];

// add route path
// routes.forEach(route => {
//   route.path = route.path || "/" + (route.name || "");
// });

const router = new Router({
  mode: "hash",
  //base: "mobile",
  routes,
  fallback: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title;
  if (title) {
    document.title = title;
  }
  if (to.meta.isLogin && !store.state.app.userInfo) {
    next({
      name: "userRegister",
      replace: true
    });
  }
  next();
});

export {
  router
};
