<template>
    <div>
<h1> Mis Favoritos </h1>

<b-card-group>
  <b-card deck v-for="(favorite, i) in favorites" :key="i"
    title="Adogtame" 
    :img-src="favorite.photoURL.url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    
  >
    <b-card-text>
          <h5>Nombre:  {{favorite.petsname}}</h5>
          <h5>Ubicación: {{favorite.city}}</h5>
          <h5>Tipo de animal: {{favorite.typeofanimal}}</h5>
          <h5>Tamaño: {{favorite.size}}</h5>
          <h5>Vacunas: {{favorite.vaccine}}</h5>
          <h5>Sexo: {{favorite.sex}}</h5>
          <h5>Cirugías: {{favorite.surgery}}</h5>
          <h5>Años: {{favorite.age}}</h5>
    </b-card-text>
    <b-button href="#" variant="outline-danger">Adoptar</b-button>
  </b-card>
  </b-card-group>

   </div>     
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "Favoritos",
    data() {
        return {
          favoritesFiltered: []
        }
    },
    mounted(){
      this.get_Favorites();
      console.log("size: " + this.favorites.length);
    },
    methods: {
      ...mapActions(["get_Favorites"])
    },
    computed: {...mapState(["favorites"])}
   
}
</script>