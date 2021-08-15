<template>
    
<div>
   <h1> Encuentra a tu próximo miembro de la familia </h1>


  <div>
    <h5> Elige el tipo de animal que buscas </h5> 
    <b-form-select v-model="selected" :options="options"></b-form-select> 
    <br/>
    <b-button class="mt-3" variant="outline-dark" @click="filterBy(selected)"> <b-icon-search></b-icon-search>Buscar </b-button>
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
           <b-button variant="outline-danger"><h5>Likes: {{adoption.likes}}</h5></b-button>
           <h5>Nombre:  {{adoption.petsname}}</h5>
          <h5>Ubicación: {{adoption.city}}</h5>
          <h5>Tipo de animal: {{adoption.typeofanimal}}</h5>
          <h5>Tamaño: {{adoption.size}}</h5>
          <h5>Vacunas: {{adoption.vaccine}}</h5>
          <h5>Sexo: {{adoption.sex}}</h5>
          <h5>Cirugías: {{adoption.surgery}}</h5>
          <h5>Años: {{adoption.age}}</h5>
         

    </b-card-text>
    <div :key='counter'>
    <b-button href="#" variant="danger" v-show="isLiked(adoption)" @click="like(adoption)">Like</b-button>
    <b-button href="#" variant="danger" v-show="!isLiked(adoption)" @click="like(adoption)">Unlike</b-button>
    </div>
  </b-card>
  </b-card-group>

      
  <footer class="footer"> </footer>

</div>
</template>

<script>

import {mapActions, mapState, mapGetters} from "vuex";
import firebase from "firebase"
import Vue from 'vue';

export default {
    name: "Busqueda",
    data() {
        return {
          selected: null,
          adoption : {},
          options: ["Perro", "Gato", "Conejo", "Ave", "Todos"],
          adoptionsFiltered: [],
          allFavorites: [],
          counter: 0
        }
    },
    mounted(){
      this.fetch_adoptions();
      this.get_Favorites();
      this.adoptionsFiltered = this.allAdoptions;
      this.allFavorites = this.favorites;
      //const favs = []
      this.adoptionsFiltered.forEach(adoption => {
        let fav = this.allFavorites.find(i => i.adoptionsId == adoption.id);
        
      });
      
      console.log(this.allFavorites.length);
    },
    methods: {
      ...mapActions(["fetch_adoptions", "get_Favorites", "addFavorite", "update_Adoption", "delete_Favorite"]),
      filterBy(selected){
        const typeofanimal = selected.toLowerCase();
        this.adoptionsFiltered = this.allAdoptions;
        if(typeofanimal != "todos") {
          this.adoptionsFiltered = this.adoptionsFiltered.filter(a => a.typeofanimal == typeofanimal);
        }
        

      },
      async like(adoption){
        this.counter ++;
        console.log(this.allFavorites);
        const fav = this.allFavorites.find(i => i.adoptionsId == adoption.id);
        
        if (fav == null) {
          console.log("giving like...");
          adoption.likes ++;
          const { id } = adoption;
          let favorite = {};
          
          favorite.email = adoption.email;
          favorite.adoptionsId = adoption.id;
          favorite.photoURL = adoption.photoURL;
          favorite.city = adoption.city;
          favorite.petsname = adoption.petsname;
          favorite.size = adoption.size;
          favorite.surgery = adoption.surgery;
          favorite.typeofanimal = adoption.typeofanimal;
          favorite.vaccine = adoption.vaccine;
          favorite.sex = adoption.sex;
          favorite.surgery = adoption.surgery;
          favorite.typeofanimal = adoption.typeofanimal;
          
         //delete favorite.id;         
          favorite.adoptionsId = adoption.id;
          this.addFavorite(favorite);
          this.update_Adoption({adoption: adoption, id});
          
      let favs = [];
      firebase
        .firestore()
        .collection("favorites")
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            favs.push({ id: doc.id, data: doc.data() });
          });

          //favoritesByEmail = favorites.filter(a => a.favUserEmail == email);
        });
          console.log("favs desde busqueda" + favs.length);
          //this.allFavorites.push(favorite);
          this.isLikedComputed
          //this.get_Favorites();
          alert("Ha sido agregada a Tus Favoritos");
          await console.log("state favorites: " + this.favorites.length);
          this.allFavorites.push(favorite);
          //this.liked.splice(i, 0, false);
        } else {
          console.log("FAV A eliminar: " + fav.id);
          adoption.likes --;
          let favId = fav.id;
          this.delete_Favorite({favorite: fav});
          let { id } = adoption;
          this.allFavorites.splice(fav);
          this.update_Adoption({adoption: adoption, id});
          
          console.log("already liked");
        }
      },// pasarlo a computed 
      isLiked(adoption){
        const fav = this.allFavorites.find(i => i.adoptionsId == adoption.id);
      this.isLikedComputed;
        if (fav == null) {
          return true;
        } else {
          return false;
        }
      }
      
    },
    computed: {...mapState(["allAdoptions", "favorites"]),
    ...mapGetters(["favorites"])
    ,isLikedComputed: function(){

      this.get_Favorites();
        return true
      }
    }

    
   
    
}
</script>



<style scoped>

.card-group .card {
    max-width: 25%;
}

.card-deck .card {
    max-width: calc(25% - 30px);
}

.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}
</style>