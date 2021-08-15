<template>
  <div>
    <div class="containter m-3 p-3">
      <h1>Registro</h1>
      <img
        class="banner"
        img-responsive
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1V9W_Ge75fgtpzVES2woj0Zo-cRicGzNcZQ&usqp=CAU"
      />

      <b-form-group :model="user" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <b-form-input
          id="input-1"
          v-model="user.name"
          placeholder="Nombre"
          required
        ></b-form-input>
      </b-form-group>

        <b-form-group>
        <b-form-input
        id="input-2"
        v-model="user.email"
        placeholder="Email"
        required></b-form-input>
        </b-form-group>

          <b-form-group>
        <b-form-input
        id="input-3"
        v-model="user.address"
        placeholder="Ubicación"
        required></b-form-input>
        </b-form-group>

        <b-form-group>
        <b-form-input
        id="input-4"
        v-model="user.password"
        placeholder="Email"
        prop="pass"
        type="password"
        required></b-form-input>
        </b-form-group>

          <b-form-group>
        <b-form-input
        id="input-5"
        v-model="user.phone"
        placeholder="Teléfono"
        required></b-form-input>
        </b-form-group>

          <b-form-group label="Deseas dar en adopcción"  id="input-6"
        v-model="user.resource"
        prop="resource"
    
        required>
    
        <b-form-checkbox value="Sí">Sí</b-form-checkbox>
        <b-form-checkbox value="No">No</b-form-checkbox>
        </b-form-group>

           <b-form-group label="Describe lo que buscas">
        <b-form-input
        id="input-7"
        v-model="user.desc"
        placeholder="Descripción"
        type="textarea"
        required></b-form-input>
        </b-form-group>

      
       
          <b-button variant="outline-dark" @click="register(user), (user = {})"
            >Registrarme</b-button
          >
          <b-button variant="outline-dark">Cancelar </b-button>
   

    </div>

    <footer class="footer"></footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import firebase from "firebase"

export default {

  data() {
    return {
      user: {
        name: "",
        email: "",
        address: "",
        resource: "",
        desc: "",
        phone: "",
        photoURL: {
          nameFile: "",
          url: ""
        }
      }
    };
  },  mounted(){
    firebase.firestore().collection('users').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        console.log({id: doc.id, data: doc.data()});
      })
    })
  },
  methods: {...mapActions(["register"])},


  computed: {
    ...mapState(["users"]),
    
  }
};
</script>


<style scoped>
.banner {
  width: 520px;
  height: 200px;
}

.b-form {
  width: 520px;
  position: relative;
  left: 300px;
}

.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}
</style>