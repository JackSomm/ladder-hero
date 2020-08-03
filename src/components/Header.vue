<template>
  <v-app-bar
    app
    collapse-on-scroll="true">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Ladder Hero</v-toolbar-title>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header',
  }
</script>

<style scoped>
.v-toolbar__title {
  font-weight: 700;
  font-size: 1.5rem;
}
</style>