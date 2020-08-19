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
      <router-link to="/upload">
        <v-list-item
          link>
          <v-list-item-content>
            Upload
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <v-list-item
        link
        @click="handleStateChange()">
        <v-list-item-content>
          {{ stateChangeText }}
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        drawer: false,
        top: true,
        stateChangeText: 'Login'
      }
    },
    mounted() {
      window.addEventListener("scroll", this.onScroll);
      this.stateChangeText = this.$store.getters.getLoggedIn ? 'Logout': 'Login';
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
      },
      handleStateChange() {
        if (this.stateChangeText === 'Login') {
          this.$router.push('/');
        } else if (this.stateChangeText === 'Logout') {
          this.$store.commit('RESET_STATE');
          location.reload();
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
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #253858;
}
</style>