<template>
  <div>
    <div class="containter m-5 p-5">
      <h1>Registro</h1>
      <img
        class="banner"
        img-responsive
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1V9W_Ge75fgtpzVES2woj0Zo-cRicGzNcZQ&usqp=CAU"
      />
      <el-form
        :model="user"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="Correo" prop="email"
          ><el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="Ubicación" prop="region"
          ><el-input v-model="user.address"> </el-input
        ></el-form-item>
        <el-form-item label="Contraseña" prop="pass"
          ><el-input type="password" v-model="user.password"></el-input
        ></el-form-item>

        <el-form-item label="Deseas dar en adopción" prop="resource">
          <el-radio-group v-model="user.resource">
            <el-radio label="Si"></el-radio>
            <el-radio label="No"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Descripción" prop="desc">
          <el-input type="textarea" v-model="user.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button variant="outline-secondary" @click="register(user), (user = {})"
            >Registrarme</el-button
          >
          <el-button>Cancelar </el-button>
        </el-form-item>
      </el-form>
    </div>
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
        desc: ""
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
</style>