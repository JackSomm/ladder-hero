<template>
  <div id="app">
    <Header/>
    <ReplaysTable/>
  </div>
</template>

<script>
import ReplaysTable from './components/ReplaysTable.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    ReplaysTable,
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
