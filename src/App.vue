<template>
  <div id="app">
    <v-app>
      <Header/>
      <v-main>
        <v-container fluid>
          <ReplaysTable/>
        </v-container>
      </v-main>
      <v-footer app>
      
      </v-footer>
    </v-app>
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
  },
  created () {
    this.$vuetify.theme.dark = true
  },
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
