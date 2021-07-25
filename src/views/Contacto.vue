<template>
    <div>

        <h1> Contacto </h1>
        <img class="banner" img-responsive src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYk9kaI7-g8ssfXw_9VzPD9_nL4mKzbfrVzg&usqp=CAU">

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="Nombre"  prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="Correo" prop="correo">
      <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="Mensaje" prop="mensaje">
    <el-input type="textarea" v-model="ruleForm.message"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addComment(ruleForm), (ruleForm = {})">Enviar</el-button>
    <el-button @click="resetForm('ruleForm')">Cancelar</el-button>
  </el-form-item>
</el-form>
    </div>
</template>


<script>

import { mapActions} from "vuex";
import firebase from "firebase";

  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          email: '',
          message: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please write a message name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
        }
      };
    },
     mounted(){
      firebase.firestore().collection('contacto').onSnapshot( snapshot => {
        snapshot.forEach( doc => {
          console.log( {id: doc.id, data: doc.data()});
        })
      })
    }, methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      ...mapActions (["addComment"])
    
    },
    
  
    
  }
</script>

<style scoped>

.banner {
    width: 400px;
}
</style>

