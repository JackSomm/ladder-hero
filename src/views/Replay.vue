<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(team, i) in groupTeams"
        :key="i">
        <v-row
          v-for="player in team"
          :key="player.profileId"
          justify="center">
          <v-card
            elevation="3">
            <h1>
              {{ player.name }}
            </h1>
            <v-carousel
              :continuous="false"
              :show-arrows="true"
              show-arrows-on-hover
              height="210"
              cycle
              hide-delimiters
              progress>
              <Snapshot 
                v-for="(snapshot, i) in player.snapshots"
                :key="i"
                :data="snapshot"/>
            </v-carousel>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Snapshot from '../components/Snapshot.vue'
  import groupBy from 'lodash/groupBy'
  import values from 'lodash/values'

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
        players: []
      }
    },
    mounted() {
      axios
        .get(`https://ladder-hero-api.honnold.me/api/v1/replays/${this.slug}`)
        .then(res => this.players = res.data.players)
        .catch(err => console.log(err))
    },
    computed: {
      groupTeams: function() {
        const teamsObject = groupBy(this.players, 'teamId');
        console.log(values(teamsObject));
        return values(teamsObject);
      }
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
.v-card {
  height: 100%;
}
</style>