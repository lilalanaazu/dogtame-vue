<template>
  <div>
<template>
  <b-navbar toggleable type="dark" variant="secondary"> <img class="logo" src="../assets/logo.png">
    <b-navbar-brand class="titulo">Dogtame</b-navbar-brand>
  <b-navbar-brand class="redes">Encuéntranos
    <b-icon-instagram></b-icon-instagram>
    <b-icon-twitter></b-icon-twitter>
    <b-icon-facebook></b-icon-facebook></b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      
      <b-navbar-nav class="ml-auto">
         <b-nav-item ><router-link to="/">Inicio </router-link></b-nav-item>
        <b-nav-item ><router-link to="/Registro"> Registro </router-link> </b-nav-item>
        <b-nav-item ><router-link to="/Login"> Login </router-link></b-nav-item>
         <b-nav-item v-if="isLogged" ><router-link to="/Favoritos">Favoritos</router-link></b-nav-item>
          <b-nav-item v-if="isLogged" ><router-link to="/Busqueda">Búsqueda</router-link></b-nav-item>
           <b-nav-item v-if="isLogged" ><router-link to="/Perfil">Perfil</router-link></b-nav-item>
           <b-nav-item v-if="isLogged" ><router-link to="/Adopcion">Adopción</router-link></b-nav-item>
         <b-nav-item ><router-link to="/Contacto">Contacto</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar> 
 
         <div>
         <b-button  class="button-logout" variant="danger" v-if="isLogged" @click="signOut()">Salir</b-button>
         </div>
  </template>
  </div>
</template>   

  


<script>

import { mapState, mapActions} from "vuex";
import Firebase from "firebase";

      export default {
        data() {
          return {
            activeIndex: "1",
            activeIndex2: "1"
          };
        },
        computed: { ...mapState(["isLogged"])},
        methods: {...mapActions(["signOut"]),
        },
        
      };
    </script>

    <style scoped>

    .logo {
      width: 60px; 
    }

    .button-logout{
     position:relative; 
     left:630px; top:2px
    }

    .nombre{
      position:relative;
      left: 280px;
    }

    .redes{
      position: relative;
      left: 280px;
    }

    .titulo{
      position: relative;
      left: 280px;
    }

  

    
    </style>