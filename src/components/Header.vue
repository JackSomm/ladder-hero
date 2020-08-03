<template>
  <div>
    <v-app-bar app
      collapse-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" class="header--link">
        <v-toolbar-title>Ladder Hero</v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute>
      <router-link to="/">
        <v-list-item
          link>
          <v-list-item-content>
            Login
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        drawer: false
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style scoped>
.v-toolbar__title {
  font-weight: 700;
  font-size: 1.5rem;
}
.v-application a {
  text-decoration: none;
  color: #fff;
  transition: all .3s ease;
}
.v-application a:hover {
  color: var(--v-anchor-base)!important;
}
</style>