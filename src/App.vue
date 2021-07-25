<template>
  <div id="app">
    <div id="nav">
      <Navbar/>
    </div>
    <router-view/>
  </div>
</template>



<script>
import Navbar from "@/components/Navbar"


export default {
  name: "app",
  components: {Navbar}
}
</script>

<style>
*{
  margin: 5px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #909399;

}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color:#909399;
}

@media all and (max-width: 800px) {

}

@media all and (max-width: 600px) {

}

@media all and (max-width: 400px){

}

</style>
