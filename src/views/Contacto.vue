<template>
    <div>

        <h1> Contacto </h1>
        <img class="banner" img-responsive src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYk9kaI7-g8ssfXw_9VzPD9_nL4mKzbfrVzg&usqp=CAU">


   <b-form-group :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
       
        label="Nombre"
        prop="name"
        label-for="input-1"
      
      >
        <b-form-input
     
          v-model="ruleForm.name"
          type="email"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

         <b-form-group class="demo-ruleForm"
      
        label="Correo"
        prop="email"
        label-for="input-1"
     
      >
        <b-form-input
          
          v-model="ruleForm.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group class="demo-ruleForm"
        id="input-group-1"
        label="Message"
        prop="message"
        label-for="input-1"
        
      >
        <b-form-input
          
          v-model="ruleForm.message"
          type="text-area"
          placeholder="Enter message"
          required
        ></b-form-input>
      </b-form-group>

<div class="">
    <b-button variant="outline-dark" @click="addComment(ruleForm), (ruleForm = {})">Enviar</b-button>
    </div>
    

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

.demo-ruleForm {
  width: 450px;
  position: relative;
  left:480px; top:2px;
}
</style>

