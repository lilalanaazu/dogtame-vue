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
    component: Favoritos
  },
  {
    path: '/contacto',
    name: "Contacto", 
    component: Contacto
  },
  {
    path: "/Busqueda",
    name: "Busqueda",
    component: Busqueda
  }, 
  {
    path:"/Perfil", 
    name: "Perfil",
    component: Perfil
  },
  {
    path: "/Adopcion",
    name:"Adopcion", 
    component: Adopcion
  },
  {
    path:"/Misadoptados",
    name: "Misadoptados",
    component: Misadoptados
  },
  {
    path:"/Doyenadopcion",
    name: "Doyenadopcion",
    component: Doyenadopcion
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router;

