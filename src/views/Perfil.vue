<template>
  <div class="border-box" >
    <h1>Perfil de Usuario</h1>

    <div class="mb-2">
      <h1>{{ userFoundByEmail.name }}</h1>
    
      <input type="file" @change="setImg" />
      <b-button variant="outline-warning" @click="saveUser"
        ><b-icon-camera></b-icon-camera> Guardar</b-button> <b-button variant="outline-danger"  @click="deleteImg(nameFile)"><b-icon-trash></b-icon-trash>Eliminar Imagen</b-button></div>
        <br>
  <img class="avatar" width="100" :src="imgInput" />

      <div v-for="({ data: {  imgInput,  name,    photoURL: { url, nameFile }  } }, i) in users"  :key="i"></div>

     
<div class="caja">
    <b-icon-person-circle></b-icon-person-circle><h4>Nombre:</h4>
    <h5>{{ userFoundByEmail.name }}</h5>
    <b-icon-at></b-icon-at><h4>Correo:</h4>
    <h5>{{ userFoundByEmail.email }}</h5>
    <b-icon-cursor-fill></b-icon-cursor-fill>
    <h4>Ubicación:</h4>
    <h5>{{ userFoundByEmail.address }}</h5>
    <div class="mt-5">
      <b-button class="mt-3" variant="light"> Guardar </b-button><span></span>
      <b-button class="mt-3" variant="light" v-b-modal.modal-prevent-closing><b-icon-pencil></b-icon-pencil>Editar</b-button>
</div>
    </div>

 <div>
    

    <div class="mt-3">
      
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Editar información Usuario"
      @show="resetModal"
      @hidden="resetModal"
      @ok="updateUser(userFoundByEmail)"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="userFoundByEmail.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

          <b-form-group
          label="Correo"
          label-for="email-input"
          invalid-feedback="Email is required"
          :state="emailState"
        >
          <b-form-input
            id="email-input"
            v-model="userFoundByEmail.email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>

          <b-form-group
          label="Ubicación"
          label-for="address-input"
          invalid-feedback="Address is required"
          :state="addressState"
        >
          <b-form-input
            id="address-input"
            v-model="userFoundByEmail.address"
            :state="addressState"
            required
          ></b-form-input>
        </b-form-group>


      </form>
    </b-modal>
  </div>



    <div>
      <b-button class="mb-5" variant="light"><router-link to="/Misadoptados">
        Mis Adoptados</router-link> </b-button
      >
      <b-button class="mb-5" variant="light"> <router-link to="/Favoritos">Favoritos </router-link> </b-button>
      <b-button class="mb-5" variant="light"> <router-link to="/Doyenadopcion">
        Doy en Adopción</router-link></b-button
      >
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      dialog: false,
      user: { data: {} },

      imgInput: "",
      file: null
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          const user = { id: doc.id, data: doc.data() };
          users.push(user);
        });
        this.users = users;
      });
    const authEmail = firebase.auth().currentUser.email;
    {
      this.user = this.get_User_By_Email(authEmail);
      console.log(
        "this.userFoundByEmail.data.photoURL.url: " + this.userFoundByEmail.name
      );
      this.imgInput = this.userFoundByEmail.photoURL.url;

      //console.log("firebase auth: " + firebase.auth().currentUser.email);
      firebase
        .firestore()
        .collection("users")
        .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            //console.log({id: doc.id, data: doc.data()});
          });
        });
    }
  },
  computed: { ...mapState(["userFoundByEmail"]) },
  methods: {
    ...mapActions(["update_User", "get_User_By_Email"]),
    setImg(e) {
      const file = e.target.files[0];
      this.file = file;
      console.log(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgInput = reader.result;
      };
    },
    async saveUser() {
      try {
        await this.uploadFile();
        const { user } = this;
        console.log("user: " + user);
        //await firebase.firestore().collection("users").add(user);
        alert("Img guardada con éxito");
      } catch (e) {
        console.log(e);
      }
    },
    async uploadFile() {
      const {
        user,
        file: { name: nameFile },
        file
      } = this;
      const storageRef = firebase.storage().ref();
      const fileDirection = storageRef.child(`${nameFile}`);
      await fileDirection.put(file);
      const url = await fileDirection.getDownloadURL();
      this.imgInput = url;
      this.userFoundByEmail.photoURL = {
        url,
        nameFile
      };
      this.user = this.userFoundByEmail;
      console.log("url: " + this.user.photoURL.url);
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.id)
        .set(this.user);
      return true;
    },
    async deleteImg(nameFile) {
      try {
        const storageRef = firebase.storage().ref();
        const fileDirection = storageRef.child(`${nameFile}`);
        await fileDirection.delete();
      } catch (e) {
        console.log(e);
      }
    },
    getUserByEmail() {
      const authEmail = firebase.auth().currentUser.email;

      this.user = this.get_User_By_Email(authEmail);
    },
    updateUser(userFoundByEmail) {
      console.log("user a editar: " + userFoundByEmail.name);
      const { user } = userFoundByEmail;
      const { id } = userFoundByEmail;
      this.update_User({ user: userFoundByEmail, id });
      this.dialog = false;
    },
    setItemDataInForm(id) {
      console.log(this.users);
      this.dialog = true;
      const { users } = this;
      const { id: idUser, data } = { ...users.find(i => i.id == id) };
      const user = { id: idUser, data: { ...data } };
      this.user = user;
    }
  }
};
</script>


<style scoped>
.avatar{
      height: 100px;
    width: 100px;
    /* los siguientes valores son independientes del tamaño del círculo */
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 50%;
    background-size: 100% auto;
}

.caja {
  width: 400px;
  position: relative;
  left:500px; top:2px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
}

.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}

</style>