<template>
    
    <div>
        <h1> Doy en Adopción </h1>

<h5> En esta sección encontrarás a los animalitos que quieres dar en adopción </h5>

<div class="container">
  <b-card-group v-for="(adoption, i) in adoptions" :key="i" >
        <b-card title="Busca hogar"  :img-src="adoption.photoURL.url" img-alt="Image" img-top> 
      <b-card-text>
          <h5>Nombre:  {{adoption.petsname}}</h5>
          <h5>Ubicación: {{adoption.city}}</h5>
          <h5>Tipo de animal: {{adoption.typeofanimal}}</h5>
          <h5>Tamaño: {{adoption.size}}</h5>
          <h5>Vacunas: {{adoption.vaccine}}</h5>
          <h5>Cirugías: {{adoption.surgery}}</h5>
          <h5>Años: {{adoption.age}}</h5>
      </b-card-text>
      <template #footer>
        <small class="text-muted"><b-button variant="outline-danger">Eliminar </b-button></small>
      </template>
        </b-card>
  </b-card-group>
</div>

    <div>
        <b-button variant="outline-warning"><router-link to="/Perfil"> Volver a Perfil </router-link></b-button>
    </div>

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
    ...mapActions(["getAdoptions"]),
  }
}
</script>

