<template>
    <div>

        <h1> Contacto </h1>
        <img class="banner" img-responsive src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYk9kaI7-g8ssfXw_9VzPD9_nL4mKzbfrVzg&usqp=CAU">


   <b-form-group :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
        id="input-group-1"
        label="Nombre"
        prop="name"
        label-for="input-1"
      
      >
        <b-form-input
          id="input-1"
          v-model="ruleForm.name"
          type="email"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

         <b-form-group 
        id="input-group-1"
        label="Correo"
        prop="email"
        label-for="input-1"
     
      >
        <b-form-input
          id="input-1"
          v-model="ruleForm.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group 
        id="input-group-1"
        label="Mensaje"
        prop="mensaje"
        label-for="input-1"
        
      >
        <b-form-input
          id="input-1"
          v-model="ruleForm.message"
          type="email"
          placeholder="Enter message"
          required
        ></b-form-input>
      </b-form-group>


    <b-button variant="dark" @click="addComment(ruleForm), (ruleForm = {})">Enviar</b-button><br>
    <b-button variant="dark" @click="resetForm('ruleForm')">Cancelar</b-button>

<footer class="footer"></footer>

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

.footer{
  width: auto;
  height: 100px;
  background-color: #99a9bf;
}

.el-form {
   width: 520px;
  position: relative;
  left: 300px;
}
</style>

