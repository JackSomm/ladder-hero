<template>
  <v-container>
    <v-row
      justify="space-between">
      <v-col class="forms"
        xl="4">
        <h1>
          Ladder Hero
        </h1>
        <transition name="fade">
          <token-form
            v-if="!getToken"
            ></token-form>
        </transition>
        <transition name="fade">
          <upload-form
            v-if="getToken"
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
.forms {
  position: relative;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s ease;
  transition-delay: .6s;
  position: absolute;
  width: 96%;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>