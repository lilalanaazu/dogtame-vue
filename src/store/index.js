import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    adoptions: [],
    allAdoptions: [],
    favorites: [],
    userFoundByEmail: null,
    idEditing: null,
    editing: false,
    isLogged: false,
  },
  mutations: {
    SET_ITEM_DATA_IN_FORM(state, id) {
      state.editing = true;
      state.idEditing = id
    },
    SET_USER (state, user) {
      state.user= user;
    },  
    GET_USERS (state, users) {
      state.users = users
    },
    GET_USERS_BY_ID (state, id){
      state.id = id 
    },
    GET_USERS_BY_EMAIL (state, email){
      console.log("in mutation GET_USERS_BY_EMAIL");
      state.userFoundByEmail = state.users.find(u => u.email == email);
      console.log("found: " + state.userFoundByEmail.email);
    },
    GET_FAVORITES (state, favorites){
      state.favorites = favorites;
    },
    ADD_FAVORITE(state, favorite){
      
    },
    GET_ADOPTIONS (state, adoptions) {
      state.adoptions = adoptions
    },
    FETCH_ADOPTIONS (state, allAdoptions) {
      state.allAdoptions = allAdoptions
    },
    GET_ADOPTIONS_BY_EMAIL( state, email) {
      state.adoptions = state.adoptions.find(a => a.email == email);
    },
    ADD_COMMENT ( state, contacto) {
      state.contacto = contacto
    },
    ADD_ADOPTION (state, adoption){
      state.adoption = adoption 
    },
    SET_LOGGED_IN(state) {
      state.isLogged = true;
    },
    SET_ADOPTIONS(state, adoptions) {
      state.adoptions = adoptions;
    },
  },
  actions: {
    setUser ({commit}, user) {
      commit ("SET_USER", user);
    },
   
    addComment ({commit}, contacto) {
      firebase.firestore().collection("contacts").add(contacto)
    },

    addAdoption( {commit}, adoption) {
      adoption.email = firebase.auth().currentUser.email;
      firebase.firestore().collection("adoptions").add(adoption);
      alert("Tu mascota ha sido ingresada exitosamente");
    },
    addFavorite( {commit}, adoption) {
      console.log("adding to favorites...");
      const favorite = adoption;
      firebase.firestore().collection("favorites").add(favorite);
      alert("Ha sido agregada a Tus Favoritos");
    },
    delete_adoption ( {commit}, adoption) {
      console.log("adoption id: " + adoption.id);
      firebase.firestore().collection("adoptions").doc(adoption.id).delete();
      alert("Tu adoptante ha sido eliminado");
    },
    show_Snack( { commit}, snack) {
      commit ('SHOW_SNACK', snack);
    },
    get_Adoptions_By_Email(){
      console.log("get_User_By_Email");
      commit('GET_ADOPTIONS_BY_EMAIL', email)
    },
    get_User_By_Email({commit}){
      console.log("get_User_By_Email");
      const email = firebase.auth().currentUser.email;
      commit('GET_USERS_BY_EMAIL', email)
    },
    get_Favorites( {commit}) {
      console.log("in get favorites");
      const email = firebase.auth().currentUser.email;
      firebase
      .firestore()
      .collection("favorites")
      .onSnapshot((snapshot) => {
        const favorites = [];
        let favoritesByEmail = [];
        snapshot.forEach((doc) => { console.log("favs: " + doc.data().email);       
          favorites.push({ id: doc.id, email: doc.data().email, age: doc.data().age,
        photoURL: doc.data().photoURL, city: doc.data().city, petsname: doc.data().petsname, size: doc.data().size, surgery: doc.data().surgery, 
        typeofanimal: doc.data().typeofanimal, vaccine: doc.data().vaccine, sex: doc.data().sex,
        surgery: doc.data().surgery});
        });
        favoritesByEmail = favorites.filter(a => a.email == email);
      commit ( "GET_FAVORITES", favoritesByEmail, email)
    });
    },
    update_User({ commit }, { user, id }) {
      console.log("userUpdated: " + user.name);
      firebase.firestore().collection("users").doc(id).set(user)
    },
    setItemDataInForm({ commit }, id) {
      commit("SET_ITEM_DATA_IN_FORM", id)
    },
    register({ commit }, { name, email, address, resource, desc, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const nameFile = "";
          const url = "";
          const photoURL = { nameFile, url}
          const { uid } = userCredential.user;
          const fields = {
           name,
           email, 
           address,
           resource, 
           desc, 
           password,
           photoURL
          };
          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .set(fields)
            .then(() => {
              const snack = {
                show: true,
                text: 'Registrado con exito!',
                color: 'success',
              };
            })
            .catch((error) => {
              const snack = {
                show: true,
                text: error.message,
                color: 'error',
              };
              commit('SHOW_SNACK', snack);
            });
        })
        .catch((error) => {
          const snack = {
            show: true,
            text: error.message,
            color: 'error',
          };
          commit('SHOW_SNACK', snack);
        });
    }, 
    fetch_adoptions( {commit}) {
      console.log("in fetch_adoptions");

      firebase
      .firestore()
      .collection("adoptions")
      .orderBy('city')
      .onSnapshot((snapshot) => {
        const allAdoptions = []
        snapshot.forEach((doc) => {          
        allAdoptions.push({ id: doc.id, email: doc.data().email, age: doc.data().age,
        photoURL: doc.data().photoURL, city: doc.data().city, petsname: doc.data().petsname, size: doc.data().size, surgery: doc.data().surgery, 
        typeofanimal: doc.data().typeofanimal, vaccine: doc.data().vaccine, sex: doc.data().sex,
        surgery: doc.data().surgery});
        });
      commit ( "FETCH_ADOPTIONS", allAdoptions)
    });
    },
    signOut ( { commit}) {
      firebase 
      .auth()
      .signOut()
      .then(()=> {
        commit( "SET_USER", null);
      })
      .catch( ( error)=> {
        const snack = {
          show: true,
          text: error.message,
          color: 'error',
        };
        commit('SHOW_SNACK', snack);
      });
        },
        auth_State_Change ( { commit}) {
          firebase.auth().onAuthStateChanged(( userCredential) => {
            if(userCredential) {
              const { uid }= userCredential;
              firebase
              .firestore()
              .collection( 'users')
              .doc(uid)
              .get()
              .then((doc )=> {
                doc.data();
                commit('SET_USER', doc.data());
              })
              .catch(()=> commit('SET_USER', null));
            }else {
              commit('SET_USER', null);
            }
          });
        },
    getUsers: ( { commit }) => {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          const users = []
          snapshot.forEach((doc) => {console.log("doc: " + doc.data().email);
            users.push({ id: doc.id, email: doc.data().email, password: doc.data().password,
            photoURL: doc.data().photoURL, desc: doc.data().desc, resource: doc.data().resource,
            address: doc.data().address, name: doc.data().name});
          });
        commit ( "GET_USERS", users)
      });
    },
    getAdoptions: ( { commit }) => {
      const email = firebase.auth().currentUser.email;
      firebase
        .firestore()
        .collection("adoptions")
        .onSnapshot((snapshot) => {
          const allAdoptions = []
          let adoptions = []
          snapshot.forEach((doc) => {          
          allAdoptions.push({ id: doc.id, email: doc.data().email, age: doc.data().age,
          photoURL: doc.data().photoURL, city: doc.data().city, petsname: doc.data().petsname, size: doc.data().size, surgery: doc.data().surgery, 
          typeofanimal: doc.data().typeofanimal, vaccine: doc.data().vaccine, sex: doc.data().sex,
          surgery: doc.data().surgery});
          adoptions = allAdoptions.filter(a => a.email == email);
          adoptions.forEach(a => {console.log("email of user giving: " + a.email);})
          });
        commit ( "GET_ADOPTIONS", adoptions)
      });
    },
    addUser({ commit }, user) {
      console.log("Adding user: " + user.name);
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const userSigned = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        console.log("user: " + user.email);
      firebase.firestore().collection("users").add(user)
    },
    setLoggedIn({ commit }, hasCorrectCredentials) {
      if (hasCorrectCredentials) {
        commit("SET_LOGGED_IN")
      }
     
    }
  },

  getters: {
    getUserById ({idEditing, users}) {
      return users.find(i => i.id == idEditing);
    },
    user (state){
      return state.user.data; 
    },
    users: (state) => (search)=> {
      return state.users.filter(u => u.name.includes(search))
    },
    snackbar: ({snack} )=> {
      return snack;
    }
  }

});
