<template>
  <tr >
    <Team :team="item.team1" />
    <Team :team="item.team2" />
    <td>
      <a :href="createMapLink(item.mapName)">
        {{ item.mapName }}
      </a>
    </td>
    <td>{{ item.date }}</td>
  </tr>
</template>

<script>
import Team from './Team.vue'

export default {
  name: 'ReplayRow',
  components: {
    Team
  },
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {

    }
  },
  methods: {
    createMapLink(mapName) {
      return 'https://liquipedia.net/starcraft2/' + mapName.split(' ').join('_');
    },
  }
}
</script>