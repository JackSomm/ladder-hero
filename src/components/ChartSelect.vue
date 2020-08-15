<template>
  <v-menu
    offset-y>
    <template
      #activator="{ on, attrs }">
      <v-btn
        color="secondary"
        v-on="on"
        v-bind="attrs">
        {{ current }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(option, i) in options"
        :key="i"
        v-ripple>
        <v-list-item-title
          :value="option.value"
          @click="$emit('selected', option.value); changeCurrent(option.title)">
          {{ option.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ChartSelect',
  data() {
    return {
      options: [
        {
          title: 'Army Value in Minerals',
          value: ['armyValueMinerals']
        },
        {
          title: 'Army Value in Vespene', 
          value: ['armyValueVespene']
        },
        {
          title: 'Army Value Total',
          value: ['armyValueMinerals', 'armyValueVespene']
        },
        {
          title: 'Mineral Collection Rate',
          value: ['collectionRateMinerals']
        },
        {
          title: 'Vespene Collection Rate',
          value: ['collectionRateVespene']
        },
        {
          title: 'Total Collection Rate',
          value: ['collectionRateMinerals', 'collectionRateVespene']
        },
        {
          title: 'Active Workers',
          value: ['activeWorkers']
        },
        {
          title: 'Unspent Minerals',
          value: ['unspentMinerals']
        },
        {
          title: 'Unspent Vespene',
          value: ['unspentVespene'], 
        },
        {
          title: 'Total Unspent Resources',
          value: ['unspentMinerals', 'unspentVespene']
        },
        {
          title: 'Lost Minerals',
          value: ['lostMinerals']
        },
        {
          title: 'Lost Vespene',
          value: ['lostVespene']
        },
        {
          title: 'Total Lost Resources',
          value: ['lostMinerals', 'lostVespene']
        }
      ],
      current: 'Army Value in Minerals'
    }
  },
  methods: {
    changeCurrent(str) {
      this.current = str;
    }
  }
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
  font-size: 0.929rem;
  min-height: 48px;
}
.v-list.v-sheet {
  background-color: #5e81ac;
}
.v-list-item {
  cursor: pointer;
  transition: all .3 ease;
}
.v-list-item:hover {
  background-color: #2E2E2E;
}
</style>