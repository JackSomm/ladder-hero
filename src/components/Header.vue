<template>
  <div>
    <v-app-bar class="nav"
      app
      collapse-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" class="header--link">
        <v-toolbar-title class="nav__title">Ladder Hero</v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app>
      <router-link 
        to="/"
        v-show="!top">
        <v-list-item class="nav__link"
          link>
          <v-list-item-content>
            Home
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <v-list-item class="nav__link"
        @click="$emit('clicked', 'upload')">
        <v-list-item-content>
          Upload
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="nav__link"
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
          this.$emit('clicked', 'login');
          this.stateChangeText = 'Logout';
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

<style lang="scss" scoped>
.nav {
  background-color: #253858!important;
  &__link, a {
    color: #d8dee9;
    transition: all .3s ease;
    &:hover {
      color: var(--v-anchor-base)!important;
    }
  }
  &__title {
    font-weight: 700;
    font-size: 1.5rem;
  }
}
.v-application a {
  text-decoration: none;
}
</style>