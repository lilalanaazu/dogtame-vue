import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registro from "../views/Registro.vue"
import Login from "../views/Login.vue"
import Favoritos from "../views/Favoritos.vue"
import Contacto from "../views/Contacto.vue"
import Busqueda from "../views/Busqueda.vue"
import Perfil from "../views/Perfil.vue"
import Adopcion from "../views/Adopcion.vue"
import Misadoptados from "../views/Misadoptados.vue"
import Doyenadopcion from "../views/Doyenadopcion.vue"
import firebase from "firebase"
import { NavbarPlugin } from 'bootstrap-vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/login', 
    name: 'Login',
    component: Login
  },
  {
    path: '/favoritos',
    name: 'Favoritos',
    component: Favoritos,
    meta: {
      auth: true,
    },
  },
  {
    path: '/contacto',
    name: "Contacto", 
    component: Contacto
  },
  {
    path: "/Busqueda",
    name: "Busqueda",
    component: Busqueda,
    meta: {
      auth: true,
    },
  }, 
  {
    path:"/Perfil", 
    name: "Perfil",
    component: Perfil,
    meta: {
      auth: true,
    },
  },
  {
    path: "/Adopcion",
    name:"Adopcion", 
    component: Adopcion,
    meta: {
      auth: true,
    },
  },
  {
    path:"/Misadoptados",
    name: "Misadoptados",
    component: Misadoptados,
    meta: {
      auth: true,
    },
  },
  {
    path:"/Doyenadopcion",
    name: "Doyenadopcion",
    component: Doyenadopcion,
    meta: {
      auth: true,
    },
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
  if (to.name === 'Busqueda') {
    next();
  }
  firebase.auth().onAuthStateChanged((user) => {
    let authRequired = to.matched.some((route) => route.meta.auth);
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        next();
      });
    } else {
      if (authRequired) next('/');
      else next();
    }
  });
});



export default router;

