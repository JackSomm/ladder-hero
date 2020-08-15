<template>
  <v-container class="team">
    <div class="row">
      <div 
        class="col"
        v-if="team.length > 1">
        <h4>
          Overall
        </h4>
      </div>
      <div class="col player"
        v-for="player in team"
        :key="player.playerId">
        <div class="player__name">
          <h4>
            {{ player.name }}
          </h4>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: 'TeamData',
    props: {
      team: {
        required: true
      }
    },
    extends: Line,
    data () {
      return {
      }
    },
  }
</script>

<style scoped>
h4 {
  color: #d8dee9;
  display: inline-block;
}
.team {
  border: 1px solid #d8dee9;
  background-color: #2e3439;
  box-shadow: 1px 3px 4px #000;
}
.row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col {
  text-align: center;
}
</style>