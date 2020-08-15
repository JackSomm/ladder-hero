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
          <div class="overall--item">
            <p>Collected Minerals</p>
            <h5>{{ overall.collectedMinerals }}</h5>
          </div>
          <div class="overall--item">
            <p>Collected Vespene</p>
            <h5>{{ overall.collectedVespene }}</h5>
          </div>
          <div class="overall--item">
            <p>Avg. Unspent Minerals</p>
            <h5>{{ overall.avgUnspentMinerals }}</h5>
          </div>
          <div class="overall--item">
            <p>Avg. Unspent Vespene</p>
            <h5>{{ overall.avgUnspentVespene }}</h5>
          </div>
          <div class="overall--item">
            <p>Avg. Mineral Collection Rate</p>
            <h5>{{ overall.avgCollectionRateMinerals }}</h5>
          </div>
          <div class="overall--item">
            <p>Avg. Vespene Collection Rate</p>
            <h5>{{ overall.avgCollectionRateVespene }}</h5>
          </div>
        </div>
      </div>
      <div class="col player"
        v-for="player in team"
        :key="player.playerId">
        <div class="player__name">
          <h4>
            {{ player.name }}
          </h4>
        </div>
        <div class="player__data">
          <div class="player--item">
            <p>Collected Minerals</p>
            <h5>{{ player.collectedMinerals }}</h5>
          </div>
          <div class="player--item">
            <p>Collected Vespene</p>
            <h5>{{ player.collectedVespene }}</h5>
          </div>
          <div class="player--item">
            <p>Avg. Unspent Minerals</p>
            <h5>{{ player.avgUnspentMinerals }}</h5>
          </div>
          <div class="player--item">
            <p>Avg. Unspent Vespene</p>
            <h5>{{ player.avgUnspentVespene }}</h5>
          </div>
          <div class="player--item">
            <p>Avg. Mineral Collection Rate</p>
            <h5>{{ player.avgCollectionRateMinerals }}</h5>
          </div>
          <div class="player--item">
            <p>Avg. Vespene Collection Rate</p>
            <h5>{{ player.avgCollectionRateVespene }}</h5>
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
        overall: {}
      }
    },
    created() {
      this.team.forEach(p => {
        for (let [key, value] of Object.entries(p)) {
          if (this.overall[key]) {
            this.overall[key] += value;
          } else {
            this.overall[key] = value;
          }
        }
      });
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
  border: 1px solid #d8dee9;
  background-color: #263238;
  box-shadow: 1px 3px 4px #000;
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