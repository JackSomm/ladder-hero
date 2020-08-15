<template>
  <v-container>
    <v-row>
      <div 
        class="col team"
        v-for="(team, i) in teamsObject"
        :key="i">
        <h3>Team {{ i + 1 }}</h3>
        <TeamData :team="team" />
      </div>
    </v-row>
    <div class="chart-wrap">
      <line-chart
        v-if="!loading"
        :data="chartStats"
        :options="chartOptions"/>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import TeamData from '../components/TeamData.vue'
  import LineChart from '../components/LineChart.vue'
  import groupBy from 'lodash/groupBy'
  import values from 'lodash/values'
  import sortBy from 'lodash/sortBy'
  import map from 'lodash/map'

  export default {
    name: 'Replay',
    components: {
      TeamData,
      LineChart
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
        chartStats: {},
        chartOptions: {
          title: {
            display: true,
            text: 'Army Value in Minerals',
            fontSize: 34
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        },
        loading: true,
        colors: [
          [
            'rgba(255, 138, 128, 1)',
            'rgba(255, 82, 82, 1)',
            'rgba(255, 23, 68, 1)',
            'rgba(213, 0, 0, 1)'
          ],
          [
            'rgba(130, 177, 255, 1)',
            'rgba(68, 138, 255, 1)',
            'rgba(41, 121, 255, 1)',
            'rgba(41, 98, 255, 1)'
          ],
        ]
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
          this.teamsObject = values(groupBy(res.data.players, 'teamId'));
          
          this.chartStats.labels = map(sortBy(res.data.players[0].snapshots, ['loop']), 'loop');
          const orderedPlayers = sortBy(res.data.players, ['teamId']);
          this.chartStats.datasets = map(orderedPlayers, (p, i) => {
            let sortedSnapshots = sortBy(p.snapshots, ['loop']);
            return {
              label: p.name,
              data: map(sortedSnapshots, s => s.armyValueMinerals + s.armyValueVespene),
              borderColor: this.colors[p.teamId][i % 4],
              backgroundColor: "rgba(0, 0, 0, 0)",
              pointRadius: 0,
            }
          });
          
          this.loading = false;
        })
        .catch(err => console.log(err));
    }
  }
</script>

<style scoped>
h2, h3 {
  padding: 20px 0;
  color: #d8dee9;
}
.col {
  text-align: center;
}
.chart-wrap {
  width: 100%;
  height: 32rem;
  overflow: hidden;
}
</style>