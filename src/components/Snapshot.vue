<template>
  <v-carousel-item>
    <p>
      Lost Minerals: {{ data.lostMinerals}}, Lost Vespene: {{ data.lostVespene}}
    </p>
    <p>
      Unspent Minerals: {{ data.unspentMinerals}}, Unspent Vespene: {{ data.unspentVespene}}
    </p>
    <p>
      Mineral Collection Rate: {{ data.collectionRateMinerals}}, Vespene Collection Rate: {{ data.collectionRateVespene}}
    </p>
    <p>
      Active Workers: {{ data.activeWorkers}}
    </p>
    <p>
      Army Value (Minerals): {{ data.armyValueMinerals}}, Army Value (Vespene): {{ data.armyValueVespene}}
    </p>
  </v-carousel-item>
</template>

<script>
export default {
  name: 'Snapshot',
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  data () {
    return {}
  },
}
</script>

<style scoped>

</style>