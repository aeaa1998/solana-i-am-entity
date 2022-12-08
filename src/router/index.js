import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { Error401 } from "../views/errors";
import Login from "../views/auth/Login.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import { auth } from './middleware/auth.js'
import { logged } from './middleware/logged.js'
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/unauthorized",
    name: "401",
    component: Error401,
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   // route level code-splitting
  //   // this generates a separate chunk (register.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
  // },
  {
    path: "/credentials",
    name: "Credenciales",
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Credenciales" */ "../views/credentials/Credentials.vue"),
  },
  {
    path: "/credentials/create",
    name: "Crear Credenciales",
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Crear Credenciales" */ "../views/credentials/CreateCredential.vue"),
  },
  {
    path: "/dispensers",
    name: "Dispensadores",
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Ver Dispensadores" */ "../views/dispensers/Dispensers.vue"),
  },
  {
    path: "/dispensers/create",
    name: "Crear dispensadores",
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Crear dispensadores" */ "../views/dispensers/CreateDispenser.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if(!["Login", "401"].includes(to.name)){
    auth({next, router, to, from})
  }else{
    logged({ next, to })
  }
})

export default router;
