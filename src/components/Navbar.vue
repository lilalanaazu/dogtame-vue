<template>
  <div>
<template>
  <b-navbar toggleable type="dark" variant="secondary">
    <img class="logo" src="../assets/logo.png">
    <b-navbar-brand type="light">Dogtame</b-navbar-brand>

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
         <b-nav-item ><router-link to="/Favoritos">Favoritos</router-link></b-nav-item>
          <b-nav-item ><router-link to="/Busqueda">Búsqueda</router-link></b-nav-item>
         <b-nav-item ><router-link to="/Contacto">Contacto</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
    
  </div>
</template>   


<script>

import Firebase from "firebase";

      export default {
        data() {
          return {
            activeIndex: "1",
            activeIndex2: "1"
          };
        },
        methods: {
          async signOut(){

            try {
              await Firebase.auth().signOut();
              alert ("Desblogeado con éxito");
            } catch (e) {}
          },
          handleSelect(key, keyPath) {
            console.log(key, keyPath);
          }
        }
      };
    </script>

    <style scoped>

    .logo {
      width: 60px; 
    }

    </style>