<template>
  <v-container>
    <v-row>
      <v-card
        elevation="3"
        width="48%"
        v-for="player in data.players"
        :key="player.name">
        <h1>
          {{ player.name }}
        </h1>
        <v-carousel
          :continuous="false"
          :cycle="cycle"
          :show-arrows="true"
          height="210"
          hide-delimiters>
          <Snapshot 
            v-for="(snapshot, i) in player.snapshots"
            :key="i"
            :data="snapshot"/>
        </v-carousel>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Snapshot from '../components/Snapshot.vue'

  export default {
    name: 'Replay',
    components: {
      Snapshot
    },
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        data: ''
      }
    },
    created() {
      axios
        .get(`https://ladder-hero-api.honnold.me/api/v1/replays/${this.slug}`)
        .then(res => this.data = res.data)
        .catch(err => console.log(err))
    }
  }
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.v-card {
  margin: 1rem;
  padding: 2rem;
  text-align: center;
  background-color: #434c5e;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.v-window__container {
  height: auto!important;
}
</style>
<style>
.v-window__next, .v-window__prev {
  top: calc(33% - 20px);
}
</style>