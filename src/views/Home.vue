<template>
  <v-container>
    <v-row
      justify="space-between">
      <v-col
        xl="4">
        <h1>
          Ladder Hero
        </h1>
        <main-form></main-form>
      </v-col>
      <v-col
        xl="">
        <replays-table 
          location="home"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReplaysTable from '@/components/ReplaysTable.vue'
import MainForm from '@/components/MainForm.vue'

export default {
  name: 'Home',
  components: {
    ReplaysTable,
    MainForm
  }
}
</script>

<style scoped>
h1 {
  font-size: 5em;
  padding-left: 15px;
}
</style>