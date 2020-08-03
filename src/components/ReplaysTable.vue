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
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr class="replay"
        v-for="replay in replays"
        :key="replay.id">
        <td class="player">
          <p
            v-for="player in replay.team1"
            :key="player.name"
            class="player--name">
            <a target="_blank"
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
            <a target="_blank"
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
          <a target="_blank"
            :href="createMapLink(replay.mapName)">
            {{ replay.mapName }}
          </a>
        </td>
        <td>
          {{ replay.date }}
        </td>
        <router-link class="replay--link"
          tag="td"
          :to="{ name: 'replay', params: { slug: replay.id }}">
          View Replay
        </router-link>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'ReplaysTable',
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
    },
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
            team2: [],
            id: replay.slug
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
.replay--link {
  cursor: pointer;
}
.replay:hover {
  background-color: transparent!important;
}
.race {
  font-size: .85em;
  margin-left: 7px;
  position: relative;
  top: 5px;
}
.ZergClass {
  color: #b48ead;
}
.TerranClass {
  color: #d08770;
}
.ProtossClass {
  color: #ebcb8b;
}
.player--name {
  margin-bottom: 0;
  margin: 10px 0;
}
</style>
