<template>
    
    <div>
        <h1> Doy en Adopción </h1>

<h5> En esta sección encontrarás a los animalitos que quieres dar en adopción </h5>


  <b-card-group deck v-for="(adoption, i) in adoptions" :key="i" >
        <b-card title="Busca hogar"  :img-src="adoption.photoURL.url" img-alt="Image" img-top> 
      <b-card-text>
          <h5>Nombre:  {{adoption.petsname}}</h5>
          <h5>Ubicación: {{adoption.city}}</h5>
          <h5>Tipo de animal: {{adoption.typeofanimal}}</h5>
          <h5>Tamaño: {{adoption.size}}</h5>
          <h5>Vacunas: {{adoption.vaccine}}</h5>
          <h5>Sexo: {{adoption.sex}}</h5>
          <h5>Cirugías: {{adoption.surgery}}</h5>
          <h5>Años: {{adoption.age}}</h5>
      </b-card-text>
      <template #footer>
        <small class="text-muted"><b-button variant="outline-danger" @click="delete_adoption(adoption)"><b-icon-trash></b-icon-trash> </b-button></small>
      </template>
        </b-card>
  </b-card-group>


    <div>
        <b-button variant="outline-warning"><router-link to="/Perfil"> Volver a Perfil </router-link></b-button>
    </div>
    <footer class="footer"></footer>
    </div>
</template>

<script>

import {mapState, mapActions} from "vuex";


export default {
    name: "doyenadopcion",
    created() {
    this.getAdoptions();
  },
    data(){
    return {
      user: {
        email: "", 
        files: [],
      }, 
      file: null, 
      adoption:{
        age: "",
        city: "",
        petsname: "",
        size: "",
        surgery: "",
        typeofanimal:"",
        userid: "",
        sex: "", 
        vaccine:"",
        email:"",
        photoURL: {
          nameFile: "",
          url: ""
        }
      }
    };
  
  },
  computed: { ...mapState(["adoptions"]) },
  methods: {
    ...mapActions(["getAdoptions", "delete_adoption"]),
  
  }
}
</script>

<style scoped>

.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}

.b-card{
    position: relative;
    width: 300px;
    height: 300px;
}
</style>
