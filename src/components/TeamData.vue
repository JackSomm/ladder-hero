<template>
  <v-container class="team">
    <div class="row">
      <div 
        class="col overall"
        v-if="team.length > 1">
        <div class="player__name">
          <h4>
            Overall
          </h4>
        </div>
        <div class="overall__data">
          <div 
            class="overall--item"
            v-for="(stat, i) of overall"
            :key="i"
            v-show="i !== 'name' || i !== 'teamId'">
            <p>{{ i }}</p>
            <h5>{{ stat }}</h5>
          </div>
        </div>
      </div>
      <div class="col player"
        v-for="player in team"
        :key="player.name">
        <div class="player__name">
          <h4>
            {{ player.name }}
          </h4>
        </div>
        <div class="player__data">
          <div
            class="player--item"
            v-for="(stat, i) in organizePlayerStats(player)"
            :key="i"
            v-show="i !== 'name' || i !== 'teamId'">
            <p>{{ i }}</p>
            <h5>{{ stat }}</h5>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>

  export default {
    name: 'TeamData',
    props: {
      team: {
        required: true
      }
    },
    data () {
      return {
        stats: [
          'collectedMinerals',
          'collectedVespene',
          'avgUnspentMinerals',
          'avgUnspentVespene',
          'avgCollectionRateMinerals',
          'avgCollectionRateVespene'
        ],
        titles: [
          'Collected Minerals',
          'Collected Vespene',
          'Avg. Unspent Minerals',
          'Avg. Unspent Vespene',
          'Avg. Mineral Collection Rate',
          'Avg. Vespene Collection Rate',
        ],
        overall: {}
      }
    },
    methods: {
      organizePlayerStats(player) {
        let playerStats = { ...player };
        for (let [key] of Object.entries(playerStats)) {
          if (this.stats.indexOf(key) > -1) {
            continue;
          } else {
            delete playerStats[key];
          }
        }
        for (let i in this.titles) {
          playerStats[this.titles[i]] = playerStats[this.stats[i]];
          delete playerStats[this.stats[i]];
        }
        return playerStats;
      }
    },
    created() {
      this.team.forEach(player => {
        for (let [key, value] of Object.entries(player)) {
          if (this.stats.indexOf(key) > -1) {
            if (this.overall[key]) {
              this.overall[key] += value;
            } else {
              this.overall[key] = value;
            }
          }
        }
      });

      for (let i in this.titles) {
        this.overall[this.titles[i]] = this.overall[this.stats[i]];
        delete this.overall[this.stats[i]];
      }
    }
  }
</script>

<style scoped>
h4, h5, p {
  margin-bottom: 0;
}
h4, h5 {
  display: inline-block;
  color: #e5e9f0;
}
p {
  display: block;
  font-size: .9rem;
  font-weight: 700;
  color: #d8dee9;
}
h4 {
  margin-bottom: 1em;
  font-size: 1.3em;
}
h5 {
  flex: 1;
  font-weight: 400;
}
.team {
  border-radius: 6px;
  background-color: #3b4252;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.row {
  display: flex;
  justify-content: center;
  align-items: start;
}
.col {
  text-align: center;
}
.player--item, .overall--item {
  margin-bottom: 7px;
  line-height: 1.1em;
}
</style>