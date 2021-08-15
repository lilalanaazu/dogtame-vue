<template>
    <div>
<h1> Mis Favoritos <b-icon-heart></b-icon-heart></h1>

<b-card-group>
  <b-card deck v-for="(favorite, i) in favorites" :key="i"
    title="Adogtame" 
    :img-src="favorite.photoURL.url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    
  ><b-icon-heart-fill></b-icon-heart-fill>
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
    <b-button href="#" variant="outline-danger" @click="adoptar(favorite)" >Adoptar</b-button>
  </b-card>
  </b-card-group>


<footer class="footer"> </footer>
   </div>     
</template>

<script>

import {mapActions, mapState} from "vuex";
import{ init } from 'emailjs-com';
import emailjs from 'emailjs-com';
init("user_tVClIVhzXViVGiPJjj6NZ");

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
      ...mapActions(["get_Favorites"]),
      adoptar (favorite) {
        const { email, petsname, ownersname, phone, likedusername } = favorite;
        console.log("phone: " + phone);
        emailjs.send("service_tbrs0g6","template_7zoosci",{
          to_name:ownersname,
          adopted_name: petsname,
          user_id: likedusername,
          user_phone: phone,
          reply_to: likedusername,
          user_email: email,
          });
      }
    },
    computed: {...mapState(["favorites"])}
   
}
</script>


<style scoped>
.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}
</style>