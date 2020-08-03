<template>
  <div class="home">
    <ReplaysTable/>
  </div>
</template>

<script>
// @ is an alias to /src
import ReplaysTable from '@/components/ReplaysTable.vue'

export default {
  name: 'Home',
  components: {
    ReplaysTable
  }
}
</script>
