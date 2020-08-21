<template>
  <div id="app">
    <v-app>
      <Header
        @clicked="changeForm"
        v-if="currentView !== 'home'"/>
      <v-main>
        <v-container fluid>
          <router-view/>
        </v-container>
        <form-modal
          :currentForm="form"
          v-if="currentView !== 'home' && showModal"
          @close="closeModal"
          ></form-modal>
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
import Header from '@/components/Header.vue'
import FormModal from '@/components/FormModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    FormModal
  },
  data () {
    return {
      currentView: this.$route.name,
      form: '',
      showModal: false
    }
  },
  methods: {
    changeForm(v) {
      if (v === 'login') {
        this.form = 'TokenForm';
        this.showModal = true;
      } else if (v === 'upload') {
        this.form = 'UploadForm';
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
    }
  },
  created () {
    this.$vuetify.theme.dark = true;
  },
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f7f7f7;
  background-color: #232e41;
}
.footer--link {
  text-decoration: none;
  font-weight: 700;
}
</style>