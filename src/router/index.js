import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from "../components/Authentication";
import MainPage from "../components/MainPage";
import WorkerPage from "../components/WorkerPage";
import MyProfile from "../components/MyProfile";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Authentication',
    meta: {layout: 'empty-layout'},
    component: Authentication
  },
  {
    path: '/',
    name: 'MainPage',
    meta: {layout: 'main-layout', auth: true},
    component: MainPage
  },
  {
    path: '/profile/:id',
    name: 'WorkerPage',
    meta: {layout: 'main-layout', auth: true},
    component: WorkerPage,
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    meta: {layout: 'main-layout', auth: true},
    component: MyProfile,
  }
]

const router = new VueRouter({
  mode: 'history',
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
