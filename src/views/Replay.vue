<template>
  <v-container>
    <v-row>
      <div class="col team"
        v-for="(team, i) in teamsObject"
        :key="i"
        @click="swapTeam(team)">
        <h1>Team {{ i + 1 }}</h1> 
      </div>
    </v-row>
    <TeamData :team="currentTeam" />
  </v-container>
</template>

<script>
  import axios from 'axios'
  import TeamData from '../components/TeamData.vue'
  import groupBy from 'lodash/groupBy'
  import values from 'lodash/values'

  export default {
    name: 'Replay',
    components: {
      TeamData
    },
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        teamsObject: [],
        currentTeam: []
      }
    },
    methods: {
      swapTeam(team) {
        this.currentTeam = team;
      }
    },
    mounted() {
      axios.get(`https://ladder-hero-api.honnold.me/api/v1/replays/${this.slug}`)
        .then((res) => {
          const players = res.data.players;
          this.teamsObject = values(groupBy(players, 'teamId'));
          this.currentTeam = this.teamsObject[0];
        })
        .catch(err => console.log(err));
    }
  }
</script>

<style scoped>
h1, h2 {
  margin-bottom: 20px;
  color: #d8dee9;
}
.col {
  text-align: center;
}
.team {
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>