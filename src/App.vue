<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>

import EmptyLayout from "./layouts/Empty";
import MainLayout from "./layouts/Main";

export default {
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout(){
      return this.$route.meta.layout
    },
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
}
#app {
  display: block;
  width: 100%;
  height: 100vh;
  min-width: 800px;
  min-height: 600px;
  line-height: 1.5;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 60px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
