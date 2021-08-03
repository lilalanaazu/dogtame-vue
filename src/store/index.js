import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    idEditing: null,
    editing: false,
    isLogged: false,
    
  },
  mutations: {
    SET_USER (state, user) {
      state.user= user;
    },  
    GET_USERS (state, users) {
      state.users = users
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
  },
  actions: {
    setUser ({commit}, user) {
      commit ("SET_USER", user);
    },
    addComment ({commit}, contacto) {
      firebase.firestore().collection("contacts").add(contacto)
    },
    addAdoption( {commit}, adoption) {
      firebase.firestore().collection("adoptions").add(adoption)
    },
    show_Snack( { commit}, snack) {
      commit ('SHOW_SNACK', snack);
    },
    
    register({ commit }, { name, email, address, resource, desc, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const { uid } = userCredential.user;
          const fields = {
           name,
           email, 
           address,
           resource, 
           desc, 
           password,
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
              commit('SHOW_SNACK', snack);
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
      .onSnapshot((snapshot)=> {
        const users = []
        snapshot.forEach((doc)=> {
          users.push( { id: doc.id, data: doNotTrack.data()});

        });
        commit ( "GET_USERS", users)
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
    usarios: (state) => (search)=> {
      return state.users.filter(u => u.data.name.includes(search))
    },
    snackbar: ({snack} )=> {
      return snack;
    }
    
  }

});
