<template>
  <tr class="replay">
    <Team :team="item.team1" :slug="item.slug" />
    <Team :team="item.team2" :slug="item.slug" />
    <td>
      <a :href="createMapLink(item.mapName)"
        class="replay--map">
        {{ item.mapName }}
      </a>
    </td>
    <td>{{ item.date }}</td>
    <router-link
      tag="td"
      :to="{ name: 'replay', params: { slug: item.slug } }"
      class="replay--details">
      View Details
    </router-link>
  </tr>
</template>

<script scoped>
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
      router: this.$router
    }
  },
  methods: {
    createMapLink(mapName) {
      return 'https://liquipedia.net/starcraft2/' + mapName.split(' ').join('_');
    },
  },
}
</script>

<style scoped>
.replay {
  transition: all .3s ease;
}
.replay--details:hover, .replay--map:hover {
  color: #a3be8c;
  cursor: pointer;
  transition: all .3s ease;
}
</style>