<template>
  <td>
    <p
      v-for="player in team"
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
</template>

<script>
  export default {
    name: 'Team',
    data () {
      return {
        raceClass: 'race',
      }
    },
    props: {
      team: {
        type: Array,
        required: true
      },
      slug: {
        type: String,
        required: true
      }
    },
    methods: {
      createPlayerLink(id) {
        return 'https://starcraft2.com/en-us/profile/1/1/' + id;
      },
    }
  }
</script>

<style scoped>
.race {
  font-size: .85em;
  margin-left: 7px;
  position: relative;
  top: 5px;
}
.ZergClass {
  color: #b652a3;
}
.TerranClass {
  color: #e4623a;
}
.ProtossClass {
  color: #f0af2d;
}
.player--name {
  margin-bottom: 0;
  margin: 10px 0;
}
.player--name {
  width: 13em;
}
.player--name a {
  text-decoration: none;
}
.player--name a:hover {
  color: #32d082;
  transition: all .3s ease;
}
</style>