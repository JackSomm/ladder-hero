<template>
  <div id="app">
    <v-app>
      <Header/>
      <v-main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-main>
      <v-footer app>
        <a class="footer--link" href="https://github.com/JackSomm/ladder-hero" target="_blank">
          Github
        </a>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
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
.footer--link {
  text-decoration: none;
  font-weight: 700;
}
</style>