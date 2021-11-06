import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from "../components/Authentication";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/',
    name: 'MainPage',
    meta: {auth: true},
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentToken = localStorage.getItem('token');
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth && !currentToken){
    next('/login');
  } else {
    next();
  }
});

export default router
