<template>
  <tr @click="goToReplay(item.slug)">
    <Team :team="item.team1" :slug="item.slug" />
    <Team :team="item.team2" :slug="item.slug" />
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
    goToReplay(slug) {
      this.$router.push({ name: 'replay', params: { slug: slug } })
    }
  }
}
</script>

<style scoped>
tr {
  cursor: pointer;
  transition: all .3s ease;
}
</style>