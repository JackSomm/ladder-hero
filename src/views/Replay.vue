<template>
  <v-main>
    <h1>
      {{ data }}
    </h1>
  </v-main>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'Replay',
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        data: ''
      }
    },
    components: {
      // Graphs, tables, etc.
    },
    created() {
      axios
        .get(`https://ladder-hero-api.honnold.me/api/v1/replays/${this.slug}`)
        .then(res => this.data = res.data)
        .catch(err => console.log(err))
    }
  }
</script>

<style scoped>

</style>