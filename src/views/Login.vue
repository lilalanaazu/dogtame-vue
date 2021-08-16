<template>
  <div>
    <h1 class="titulo"> Login </h1>
    <b-card bg-variant="light" text-variant="dark">
   
      <img img-fluid width="500px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZN9-G_r7koBb_aLE1hRzTqKb5N5dKLxNIVg&usqp=CAU">

    </b-card>

<b-form-group class="form"
        id="input-group-1"
        label="Correo Electrónico"
        label-for="input-1"
  
      >
        <b-form-input 
          id="input-1"
          v-model="user.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group class="form" id="input-group-2" label="Contraseña" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="user.password"
          placeholder="Enter your password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>




      
      <b-button id="loginbutton" variant="outline-dark" @click="logIn()"> Ingresar</b-button>


    <footer class="footer"></footer>
  </div>
</template>

<script>
import Firebase from "firebase";
import firebaseConfig from "@/firebaseConfig";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      hasCorrectCredentials: null,
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["setLoggedIn"]),
    logIn() {
      Firebase.auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(
          accept => {
            this.hasCorrectCredentials = true;
            this.setLoggedIn(this.hasCorrectCredentials);
            console.log(this.hasCorrectCredentials);
            this.$router.push("/");
          },
          reject => {
            this.$message({
              showClose: true,
              message: reject.message,
              type: "error"
            });
          }
        );
    }
  },
  
};
</script>

<style scoped>

.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}

.form {
     width: 450px;
  position: relative;
  left:480px; top:2px;
}

</style>