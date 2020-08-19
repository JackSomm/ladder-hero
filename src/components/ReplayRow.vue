<template>
  <tr 
    :class="[altClass, 'replay']">
    <team-row :team="item.team1" :slug="item.slug" />
    <team-row :team="item.team2" :slug="item.slug" />
    <td 
      v-if="item.mapName">
      <a :href="checkForMap"
        class="replay__map">
        {{ item.mapName }}
      </a>
    </td>
    <td
      v-if="item.date">
      {{ item.date }}
    </td>
    <router-link
      tag="td"
      :to="{ name: 'replay', params: { slug: item.slug } }"
      class="replay__details">
      View Details
    </router-link>
  </tr>
</template>

<script scoped>
import TeamRow from './TeamRow.vue'

export default {
  name: 'ReplayRow',
  components: {
    TeamRow
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    search: {
      type: String
    },
    altClass: {
      type: String
    }
  },
  data() {
    return {
      router: this.$router,
    }
  },
  methods: {
    createMapLink(mapName) {
      return 'https://liquipedia.net/starcraft2/' + mapName.split(' ').join('_');
    },
  },
  computed: {
    checkForMap: function() {
      let mapLink = '';
      if (this.item.mapName) {
        mapLink = this.createMapLink(this.item.mapName);
      }
      return mapLink;
    }
  }
}
</script>

<style lang="scss" scoped>
.replay {
  transition: all .3s ease;
  &__details:hover, &__map:hover {
    color: #32d082;
    cursor: pointer;
    transition: all .3s ease;
  }
}
.replay.alt {
  background-color: #2a4066;
}
</style>