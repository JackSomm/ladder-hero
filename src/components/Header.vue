<template>
  <div>
    <v-app-bar 
      app
      collapse-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" class="header--link">
        <v-toolbar-title>Ladder Hero</v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app>
      <router-link 
        to="/"
        v-show="!top">
        <v-list-item
          link>
          <v-list-item-content>
            Home
          </v-list-item-content>
        </v-list-item>
      </router-link>
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
        drawer: false,
        top: true
      }
    },
    mounted() {
      window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onScroll);
    },
    methods: {
      onScroll() {
        if (window.scrollY !== 0) {
          this.top = false;
        } else {
          this.top = true;
        }
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
  color: #d8dee9;
  transition: all .3s ease;
}
.v-application a:hover {
  color: var(--v-anchor-base)!important;
}
</style>