<template v-slot:default>
  <div>
    <v-data-table
      :headers="headers"
      :items="replays"
      :items-per-page="25"
      :loading="replays.length === 0"
      class="elevation-4">
      <template v-slot:item="{ item }">
        <ReplayRow :item="item" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import ReplayRow from './ReplayRow.vue'

export default {
  name: 'ReplaysTable',
  components: {
    ReplayRow
  },
  data () {
    return {
      headers: [
        {
          text: 'Team 1',
          align: 'start',
          sortable: false,
          value: 'team1'
        },
        { text: 'Team 2', value: 'team2' },
        { text: 'Map', value: 'mapName' },
        { text: 'Replay Date', value: 'date' },
        { text: '', value: 'details' },
      ],
      replays: []
    }
  },
  beforeCreate () {
    axios
      .get('https://ladder-hero-api.honnold.me/api/v1/replays')
      .then(res => {
        let formatedReplays = [];
        for (let replay of res.data) {
          let formatedReplay = {
            mapName: replay.mapName,
            date: dayjs(replay.playedAt).format('YYYY MM-DD HH:mm:ss A'),
            team1: [],
            team2: [],
            slug: replay.slug
          };
          for (let player of replay.players) {
            if (player.teamId === 0) {
              formatedReplay.team1.push({name: player.name, race: player.race, id: player.profileId});
            }
            if (player.teamId === 1) {
              formatedReplay.team2.push({name: player.name, race: player.race, id: player.profileId});
            }
          }
          formatedReplays.push(formatedReplay);
        }
        this.replays = formatedReplays;
      })
      .catch(err => console.log(err))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.theme--dark.v-data-table {
  background-color: transparent;
}
</style>
