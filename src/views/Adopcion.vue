
<template> 
<div>
  <h1> Formulario para dar en Adopción </h1>
<h4> Favor de subir una imágen de el adoptante </h4>
<b-icon-dog></b-icon-dog>
  
   <input type="file" @change="setImg"/>
   <br/><br>
   <button @click="saveAdoption"><b-icon-cloud-arrow-up></b-icon-cloud-arrow-up> Subir foto </button>
  
   <div>
     <h6> </h6>
     <img width="200 " :src ="imgInput"/>
     <br>
   </div>

<h2 class="pt-5"> Formulario Adopción</h2>
<p> La información sobre la mascota que darás en adopción <br>
es importante a la hora de adoptar, favor 
    llenena todos los campos.</p>
<div class="container border mt-5 mb-5">
  
  
 <b-input class="mt-3" v-model="adoption.petsname" placeholder="Nombre Mascota"/> 
<br>
<b-input v-model="adoption.age" placeholder="Años"/>
<br> 
<b-input v-model="adoption.typeofanimal" placeholder="Tipo de animal"/>
<br> 
<b-input v-model="adoption.sex" placeholder="Sexo"/>
<br>
 <b-input v-model="adoption.size" placeholder="Tamaño"/>
<br> 
<b-input v-model="adoption.surgery"  placeholder="Cirugías"/>
<br> 
<b-input v-model="adoption.vaccine"  placeholder="Vacunas al día"/>
<br> 
 <b-input v-model="adoption.city" placeholder="Ciudad"/>
<br> 

<b-button variant="outline-secondary" class="mb-3" @click="addAdoption(adoption)">Dar en Adopción </b-button>

</div>
<footer class="footer"></footer>
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
      adoption:{
        age: "",
        city: "",
        petsname: "",
        size: "",
        surgery: "",
        typeofanimal:"",
        userid: "",
        sex:"",
        vaccine:"",
        email:"",
        photoURL: {
          nameFile: "",
          url: ""
        }
      }
    };
  
  },
  mounted(){
    this.user.email = firebase.auth().currentUser.email;
  },
  methods: {
    ...mapActions(["addAdoption"]),
    setImg(e) {
      const file = e.target.files[0];
      this.file = file;
      console.log(file.name);
      const reader= new FileReader();
      reader.readAsDataURL(file);
      reader.onload= ()=> {
        this.imgInput = reader.result;
      };
    },
    async saveAdoption() {
      try {
        await this.uploadFile();
        const { adoption} = this;
        alert("Imagen subida con éxito");
      } catch (e) {
        console.log(e);
      }
    },
    async registerAdoption(){
      console.log("Adding adoption...");
      this.addAdoption({adoption: data});
    },
    async uploadFile(){
      const {
        adoption,
        file: { name: nameFile },
        file
      } = this;
      const storageRef = firebase.storage().ref();
      const fileDirection = storageRef.child(`${nameFile}`);
      await fileDirection.put(file);
      const url = await fileDirection.getDownloadURL();
      this.imgInput = url;
      adoption.photoURL = {
        url, 
        nameFile
      };
      console.log("guardado con éxito");
    },
    async deleteImg(nameFile) {
      try {
        const storageRef= firebase.storage().ref();
        const fileDirection = storageRef.child (`${nameFile}`);
        await fileDirection.delete();
      } catch (e){
        console.log(e);
      }
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

.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}
</style>