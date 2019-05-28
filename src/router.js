import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import VueAirtable from './views/Airtable.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*', 
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home, 
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }, 
    {
      path: '/login', 
      name: 'Login', 
      component: Login
    }, {
      path:'/sign-up',
      name: 'SignUp', 
      component: SignUp
    }, {
      path: '/airtable', 
      name: 'airtable', 
      component: VueAirtable, 
      meta: {
        requiresAuth: true
      }
    }
  ]
}); 

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser; 
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); 

  if (requiresAuth && !currentUser) next('login'); 
  else if (!requiresAuth && currentUser) next ('home'); 
  else next(); 
}); 
export default router; 
