<template>
    <div>
<h1> Mis Favoritos <b-icon-heart></b-icon-heart></h1>

<b-card-group>
  <b-card deck v-for="(favorite, i) in favoritesByEmail" :key="i"
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
    <b-button :key='counter' href="#" variant="outline-danger" @click="unlike(favorite)" >Unlike</b-button>
  </b-card>
  </b-card-group>

<b-button variant="outline-warning"><router-link to="/Perfil"> Volver a Perfil </router-link></b-button>
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
          favoritesFiltered: [],
          counter: 0
        }
    },
    mounted(){
      this.get_Favorites();
      this.fetch_adoptions();
      console.log("size: " + this.favoritesByEmail.length);
    },
    methods: {
      ...mapActions(["fetch_adoptions","get_Favorites","delete_Favorite","update_Adoption"]),
      adoptar (favorite) {
        const { email, petsname, ownersname, phone, likedusername, likedemail } = favorite;
        console.log("phone: " + phone);
        emailjs.send("service_tbrs0g6","template_7zoosci",{

          to_name:ownersname,
          adopted_name: petsname,
          user_id: likedusername,
          user_phone: phone,
          email: likedemail,
          reply_to: likedusername,
          user_email: email,
          });
          alert("Ha sido enviado un correo electrónico al dueño de esta mascota");
      },
      unlike(favorite){
        const adoption = this.allAdoptions.find(i => i.id == favorite.adoptionsId);
        this.counter ++;
        
          console.log("FAV A eliminar: " + adoption.id);
          adoption.likes --;
          this.delete_Favorite({favorite: favorite});
          let { id } = adoption;
          this.update_Adoption({adoption: adoption, id});
          
          console.log("already liked");
        
      }
    },
    computed: {...mapState(["allAdoptions","favoritesByEmail"])}
   
}
</script>


<style scoped>
.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}
</style>