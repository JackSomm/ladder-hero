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
    <line-chart
      v-if="!loading"
      :data="chartStats"
      :options="chartOptions"/>
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
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
          this.chartStats.datasets = map(res.data.players, (p, i) => {
            let sortedSnapshots = sortBy(p.snapshots, ['loop']);
            return {
              label: p.name,
              data: map(sortedSnapshots, 'armyValueMinerals'),
              borderColor: this.colors[i]
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
</style>