<template>
  <v-container>
    <v-row>
      <v-col
        v-for="player in team"
        :key="player.playerId">
        <h2>
          {{ player.name }}
        </h2>
      </v-col>
    </v-row>
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
      return {}
    },
    watch: {
      'team': function(newVal, oldVal)  {
        console.log(newVal, oldVal);
      }
    }
  }
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  color: #d8dee9;
  position: static;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  position: absolute;
  transform: translateX(100vw);
}
.list-enter {
  top: 0;
}
</style>