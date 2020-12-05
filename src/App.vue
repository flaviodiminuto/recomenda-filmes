<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Catalogo from './components/Catalogo.vue'
import Nav from './view/Nav'
export default {
  name: 'App',
  components: {
    Catalogo: Catalogo,
    Nav: Nav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
