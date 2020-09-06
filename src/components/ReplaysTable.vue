<template v-slot:default>
  <div class="replays">
    <router-link
      to="/replays"
      v-if="location === 'home'"
      :class="[location === 'home' ? 'replays__link': '', 'replays__title']"
      tag="h1">
      All Replays
    </router-link>
    <h1 class="replays__title"
      v-else>
      All Replays
    </h1>
    <v-card class="replays__wrap">
      <v-data-table
        :headers="headers"
        :items="replays"
        :items-per-page="25"
        :loading="replays.length === 0"
        :height="location === 'home' ? '600px': 'auto'"
        :search="search"
        calculate-widths
        class="elevation-4 replays__table">
        <template #item="{ item, search }">
          <replay-row
            :item="item"
            :search="search"
            :altClass="replays.indexOf(item) % 2 === 0 ? 'alt': ''"/>
        </template>
      </v-data-table>
    </v-card>
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
  props: [
    'location'
  ],
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Team 1',
          align: 'start',
          sortable: false,
          value: 'team1'
        },
        { text: 'Team 2', value: 'team2' },
      ],
      replays: [],
    }
  },
  beforeCreate () {
    axios
      .get('https://api.ladder-hero.com/api/v1/replays')
      .then(res => {
        let formatedReplays = [];
        if (this.location !== 'home') {
          this.headers.push(
            {
              text: 'Replay Date',
              value: 'date'
            },
            {
              text: 'Map',
              value: 'mapName'
            }
          );
        }
        for (let replay of res.data) {
          let formatedReplay = {
            team1: [],
            team2: [],
            slug: replay.slug
          };
          if (this.location !== 'home') {
            formatedReplay.date = dayjs(replay.playedAt).format('YYYY MM-DD HH:mm:ss A');
          }
          if (this.location !== 'home') {
            formatedReplay.mapName = replay.mapName;
          }
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
        this.headers.push({ text: '', value: 'details' });
      })
      .catch(err => console.log(err))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.replays {
  &__link {
    cursor: pointer;
    transition: all .3s ease;
    &:hover {
      color: #32d082;
    }
  }
  &__title {
    color: #f7f7f7;
    font-size: 3rem;
    text-align: center;
    margin: 2.3rem auto .7rem;
    display: inline-block;
  }
  &__table {
    background-color: #253858;
    border-radius: 0;
  }
  &__wrap {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                0px 4px 5px 0px rgba(0, 0, 0, 0.14),
                0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
}
</style>
