<template v-slot:default>
  <v-simple-table app>
    <thead>
      <tr>
        <th class="text-left">
          Team 1
        </th>
        <th>
          Team 2
        </th>
        <th>
          Map
        </th>
        <th>
          Replay Date
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="replay in replays"
        :key="replay.date"
        class="table__row">
        <td class="player">
          <p
            v-for="player in replay.team1"
            :key="player.name"
            class="player--name">
            <a
              :href="createPlayerLink(player.id)">
              {{ player.name }}
            </a>
            <span 
              :class="[
                raceClass,
                player.race + 'Class'
              ]"
              >
              {{ player.race }}
            </span>
          </p>
        </td>
        <td class="player">
          <p
            v-for="player in replay.team2"
            :key="player.name"
            class="player--name">
            <a
              :href="createPlayerLink(player.id)">
              {{ player.name }}
            </a>
            <span 
              :class="[
                raceClass,
                player.race + 'Class'
              ]"
              >
              {{ player.race }}
            </span>
          </p>
        </td>
        <td>
          <a 
            :href="createMapLink(replay.mapName)">
            {{ replay.mapName }}
          </a>
        </td>
        <td>
          {{ replay.date }}
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'HelloWorld',
  data () {
    return {
      replays: null,
      raceClass: 'race',
    }
  },
  methods: {
    createMapLink(mapName) {
      return 'https://liquipedia.net/starcraft2/' + mapName.split(' ').join('_');
    },
    createPlayerLink(id) {
      return 'https://starcraft2.com/en-us/profile/1/1/' + id;
    }
  },
  created () {
    axios
      .get('https://ladder-hero-api.honnold.me/api/v1/replays')
      .then(res => {
        let formatedReplays = [];
        for (let replay of res.data) {
          let formatedReplay = {
            mapName: replay.mapName,
            date: dayjs(replay.playedAt).format('YYYY MM-DD HH:mm:ss A'),
            team1: [],
            team2: []
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
.race {
  font-size: .85em;
  margin-left: 7px;
  position: relative;
  top: 5px;
}
.ZergClass {
  color: #512062;
  text-shadow: 1px 1px 1px #512062;
}
.TerranClass {
  color: #a95225;
  text-shadow: 1px 1px 1px #a95225;
}
.ProtossClass {
  color: #e4a432;
  text-shadow: 1px 1px 1px #e4a432;
}
.player--name {
  margin-bottom: 0;
  margin: 10px 0;
}
</style>
