import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    idEditing: null,
    editing: false,
    
  },
  mutations: {
    SET_USER (state, user) {
      state.user= user;
    }  },
    GET_USERS (state, users) {
      state.users = users
    },
    ADD_COMMENT ( state, contacto) {
      state.contacto = contacto
    },
  actions: {
    setUser ({commit}, user) {
      commit ("SET_USER", user);
    },
    addComment ({commit}, contacto) {
      firebase.firestore().collection("contacts").add(contacto)
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
      firebase.firestore().collection("users").add(user)
    },
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
    }
    
  }

});
