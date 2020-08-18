<template>
  <v-container>
    <h1>
      {{ mapName }}
    </h1>
    <v-row>
      <div 
        class="col team"
        v-for="(team, i) in teamsObject"
        :key="i">
        <h3>Team {{ i + 1 }}</h3>
        <TeamCol :team="team" />
      </div>
    </v-row>
    <div>
      <chart-select @selected="selectChart" />
    </div>
    <div class="chart-wrap">
      <line-chart
        v-if="!loading"
        :data="changeChartData"
        :options="chartOptions"/>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import TeamCol from '../components/TeamCol.vue'
  import LineChart from '../components/LineChart.vue'
  import ChartSelect from '../components/ChartSelect.vue'
  import groupBy from 'lodash/groupBy'
  import values from 'lodash/values'
  import sortBy from 'lodash/sortBy'
  import map from 'lodash/map'
  import reduce from 'lodash/reduce'

  export default {
    name: 'Replay',
    components: {
      TeamCol,
      LineChart,
      ChartSelect
    },
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        mapName: '',
        players: [],
        selectedChart: ['armyValueMinerals'],
        teamsObject: [],
        chartStats: {},
        chartOptions: {
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
      },
      selectChart(v) {
        this.selectedChart = v;
      },
    },
    mounted() {
      axios.get(`https://ladder-hero-api.honnold.me/api/v1/replays/${this.slug}`)
        .then((res) => {
          this.teamsObject = values(groupBy(res.data.players, 'teamId'));
          this.players = res.data.players;
          this.mapName = res.data.mapName;
          this.loading = false;
        })
        .catch(err => console.log(err));
    },
    computed: {
      changeChartData: function() {
        const chartStats = {};
        chartStats.labels = map(sortBy(this.players[0].snapshots, ['loop']), 'loop');
        
        const orderedPlayers = sortBy(this.players, ['teamId']);
        chartStats.datasets = map(orderedPlayers, (p, i) => {
          let sortedSnapshots = sortBy(p.snapshots, ['loop']);
          
          return {
            label: p.name,
            data: map(sortedSnapshots, s => {
              return reduce(this.selectedChart, (sum, n) => { 
                return sum + s[n];
              }, 0);
            }),
            borderColor: this.colors[p.teamId][i % 4],
            backgroundColor: "rgba(0, 0, 0, 0)",
            pointRadius: 0,
          }
        });
        
        return chartStats;
      }
    }
  }
</script>

<style scoped>
h1, h2, h3 {
  padding: 10px 0;
  color: #f7f7f7;
}
h1, .col {
  text-align: center;
}
.chart-wrap {
  width: 100%;
  height: 32rem;
  overflow: hidden;
}
</style>