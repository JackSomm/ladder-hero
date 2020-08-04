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
      test() {
        console.log(this.slug);
      }
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
.player--name a {
  text-decoration: none;
}
</style>