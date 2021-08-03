<template>
  <div>
    <h1> Login </h1>
    <b-card bg-variant="light" text-variant="dark">
   
      <img img-fluid width="500px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZN9-G_r7koBb_aLE1hRzTqKb5N5dKLxNIVg&usqp=CAU">

    </b-card>

    <el-form label-width="100px" class="demo-ruleForm">
      <el-form-item prop="email" label="Email">
        <el-input v-model="user.email">
          Correo electrónico</el-input
        ></el-form-item
      >
      <el-form-item prop="password" label="Password" type="password"
        ><el-input v-model="user.password" type="password"
          >Contraseña</el-input
        ></el-form-item
      >
      <el-button variant="outline-secondary" @click="logIn()"> Ingresar</el-button>
    </el-form>
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