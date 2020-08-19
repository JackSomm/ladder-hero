<template>
  <v-container>
    <v-row
      justify="space-between">
      <v-col
        xl="4">
        <h1>
          Ladder Hero
        </h1>
        <transition class="fade">
          <token-form
            v-show="!getToken"
            ></token-form>
        </transition>
        <transition class="fade">
          <upload-form
            v-show="getToken"
            ></upload-form>
        </transition>
      </v-col>
      <v-col
        xl="">
        <replays-table 
          location="home"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReplaysTable from '@/components/ReplaysTable.vue';
import TokenForm from '@/components/TokenForm.vue';
import UploadForm from '@/components/UploadForm.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    ReplaysTable,
    TokenForm,
    UploadForm
  },
  data () {
    return {
      loggedIn: false
    }
  },
  computed: mapGetters(['getToken', 'getLoggedIn']),
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 5em;
  padding-left: 15px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  transition-delay: .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>