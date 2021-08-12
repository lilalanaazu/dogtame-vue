<template>
    
<div>
   <h1> Encuentra a tu próximo miembro de la familia </h1>


  <div>
    <h5> Elige el tipo de animal que buscas </h5> 
    <b-form-select v-model="selected" :options="options"></b-form-select> 
    <br/>
    <b-button class="mt-3" variant="outline-secondary" @click="filterBy(selected)"> Buscar </b-button>
  </div>


<b-card-group>
  <b-card deck v-for="(adoption, i) in adoptionsFiltered" :key="i"
    title="Adogtame" 
    :img-src="adoption.photoURL.url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    
  >
    <b-card-text>
          <h5>Nombre:  {{adoption.petsname}}</h5>
          <h5>Ubicación: {{adoption.city}}</h5>
          <h5>Tipo de animal: {{adoption.typeofanimal}}</h5>
          <h5>Tamaño: {{adoption.size}}</h5>
          <h5>Vacunas: {{adoption.vaccine}}</h5>
          <h5>Sexo: {{adoption.sex}}</h5>
          <h5>Cirugías: {{adoption.surgery}}</h5>
          <h5>Años: {{adoption.age}}</h5>
          <h5>Likes: {{adoption.likes}}</h5>
    </b-card-text>
    <b-button :key="adoption.likes" href="#" variant="outline-danger"  v-if="isLiked(adoption)" @click="like(adoption)">Like</b-button>
  </b-card>
  </b-card-group>

      
  

</div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import firebase from "firebase"
import Vue from 'vue';

export default {
    name: "Busqueda",
    data() {
        return {
          selected: null,
          options: ["Perro", "Gato", "Conejo", "Ave", "Todos"],
          adoptionsFiltered: [],
          allFavorites: [],
        }
    },
    mounted(){
      this.fetch_adoptions();
      this.get_Favorites();
      this.adoptionsFiltered = this.allAdoptions;
      this.allFavorites = this.favorites;
      console.log(this.adoptionsFiltered.length);
      console.log(this.allFavorites.length);
    },
    methods: {
      ...mapActions(["fetch_adoptions", "get_Favorites", "addFavorite", "update_Adoption"]),
      filterBy(selected){
        const typeofanimal = selected.toLowerCase();
        this.adoptionsFiltered = this.allAdoptions;
        if(typeofanimal != "todos") {
          this.adoptionsFiltered = this.adoptionsFiltered.filter(a => a.typeofanimal == typeofanimal);
        }
        

      },
      like(adoption){
        const fav = this.allFavorites.find(i => i.adoptionsId == adoption.id);
        if (fav == null) {
          console.log("giving like...");
          adoption.likes ++;
          const { id } = adoption;
          this.addFavorite(adoption);
          this.update_Adoption({adoption: adoption, id});
          this.$forceUpdate();

        } else {
          console.log("already liked");
        }


      },
      isLiked(adoption){
        const fav = this.allFavorites.find(i => i.adoptionsId == adoption.id);
        if (fav == null) {
          return true;
        } else {
          return false;
        }
      }
    },
    computed: {...mapState(["allAdoptions", "favorites"])}
   
    
}
</script>



<style scoped>

.card-group .card {
    max-width: 25%;
}

.card-deck .card {
    max-width: calc(25% - 30px);
}
</style>