<template>
  <v-menu class="chart-select"
    offset-y>
    <template
      #activator="{ on, attrs }">
      <v-btn class="chart-select__btn"
        color="#7f428b"
        v-on="on"
        v-bind="attrs">
        {{ current }}
      </v-btn>
    </template>
    <v-list class="chart-select__list">
      <v-list-item class="chart-select__item"
        v-for="(option, i) in options"
        :key="i"
        v-ripple
        @click="$emit('selected', option.value); changeCurrent(option.title);">
        <v-list-item-title>
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

<style lang="scss" scoped>
.chart-select {
  &__btn {
    text-transform: none;
    font-size: 0.929rem;
    border-radius: 0;
    padding: 1.5em 1.1em!important;
  }
  &__list {
    background-color: #253858;
  }
  &__item {
    cursor: pointer;
    transition: all .3 ease;
    &:hover {
      background-color: #a7a046;
    }
  }
}
</style>