<template>
  <v-container
    fluid>
    <replays-table></replays-table>
  </v-container>
</template>

<script>
import ReplaysTable from '@/components/ReplaysTable.vue'

export default {
  name: 'AllReplays',
  components: {
    ReplaysTable
  }
}
</script>