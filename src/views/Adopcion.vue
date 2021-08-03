
<template> 
<div>
  <h1> Formulario para dar en Adopción </h1>
<h4> Favor de subir una imágen de el adoptante </h4>
  <input placeholder="e-mail" v-model="user.email"/>
   <input type="file" @change="setFile"/>
   <br/><br>
   <button @click="uploadFile">Subir foto </button>
  
   <div v-for="({ url, name}, i ) in user.files" :key="i">
     <h6> {{name}}</h6>
     <img width="200 " :src ="url"/>
     <br>
   </div>

<h2 class="pt-5"> Formulario Adopción</h2>
<div class="container border mt-5">
  
 <b-input v-model="adoptMe.petsname" placeholder="Nombre Mascota"/> 
<br>
<b-input v-model="adoptMe.age" placeholder="Años"/>
<br> 
<b-input v-model="adoptMe.typeofanimal" placeholder="Tipo de animal"/>
<br> 
 <b-input v-model="adoptMe.size" placeholder="Tamaño"/>
<br> 
<b-input v-model="adoptMe.surgery"  placeholder="Cirugías"/>
<br> 
<b-input v-model="adoptMe.vaccine"  placeholder="Vacunas al día"/>
<br> 
 <b-input v-model="adoptMe.city" placeholder="Ciudad"/>
<br> 
<b-button variant="outline-secondary" @click="addAdoption(adoptMe)"> Enviar </b-button>

</div>

</div>

</template>

<script>
import firebase from "firebase";
import {mapState, mapActions} from "vuex";

export default {
  name: "Perfil", 
  data(){
    return {
      user: {
        email: "", 
        files: [],
      }, 
      file: null, 
      adoptMe:{
        age: "",
        city: "",
        petsname: "",
        size: "",
        surgery: "",
        typeofanimal:"",
        userid: "",
        vaccine:"",
      }
    };
  
  },
  methods: {
    ...mapActions(["addAdoption"]),
    async uploadFile(){
      const {
        file,
        file: { name },
      } = this;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(name);
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      this.user.files.push({name, url });
      console.log("archivo subiro con éxito", url );
      this.recordUpload();
    },
    async recordUpload(){
      const { user} = this;
      const {email } = user;
      await firebase.firestore().collection("users").doc(email).set(user);
      console.log("guardado con éxito");
    },
    setFile(e){
      const elemento = e.target;
      const archivoEnElElemento= elemento.files[0];
      this.file = archivoEnElElemento;
      console.log(archivoEnElElemento);
    },
    async getData(){
      const {
        user: {email},
      } = this;
      const doc= await firebase 
      .firestore()
      .collection("users")
      .doc(email)
      .get();
      this.user= doc.data();
    },
  }
};
</script>

<style scoped>

.container{
  width: 500px;
}
</style>