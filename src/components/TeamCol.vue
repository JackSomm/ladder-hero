<template>
  <v-container class="team"
    :class="{ 'winner': team[0].didWin }">
    <div class="overflow">
      <table class="team-table">
        <tr class="team-table__row team-table__head">
          <td class="team-table__title"></td>
          <th class="team-table__header team-table__overall"
            v-if="team.length > 1">
            Overall
          </th>
          <th class="team-table__header"
            v-for="player in team"
            :key="player.name">
            {{ player.name }}
          </th>
        </tr>
        <tr
          :class="[titles.indexOf(title) % 2 === 0 ? 'team-table__alt': '', 'team-table__row']"
          v-for="title in titles"
          :key="title">
          <th class="team-table__title">
            {{ title }}
          </th>
          <td class="team-table__stat"
            v-if="team.length > 1">
            {{ overall[title] }}
          </td>
          <td class="team-table__stat"
            v-for="player in team"
            :key="player.name">
            {{ organizePlayerStats(player)[title] }}
          </td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>

  export default {
    name: 'TeamCol',
    props: {
      team: {
        required: true
      }
    },
    data () {
      return {
        stats: [
          'collectedMinerals',
          'collectedVespene',
          'avgUnspentMinerals',
          'avgUnspentVespene',
          'avgCollectionRateMinerals',
          'avgCollectionRateVespene'
        ],
        titles: [
          'Collected Minerals',
          'Collected Vespene',
          'Avg. Unspent Minerals',
          'Avg. Unspent Vespene',
          'Avg. Mineral Collection Rate',
          'Avg. Vespene Collection Rate',
        ],
        overall: {}
      }
    },
    methods: {
      organizePlayerStats(player) {
        let playerStats = { ...player };

        for (let [key] of Object.entries(playerStats)) {
          if (this.stats.indexOf(key) > -1) {
            continue;
          } else {
            delete playerStats[key];
          }
        }
        for (let i in this.titles) {
          playerStats[this.titles[i]] = playerStats[this.stats[i]];
          delete playerStats[this.stats[i]];
        }

        return playerStats;
      }
    },
    created() {
      this.team.forEach(player => {
        for (let [key, value] of Object.entries(player)) {
          if (this.stats.indexOf(key) > -1) {
            if (this.overall[key]) {
              this.overall[key] += value;
            } else {
              this.overall[key] = value;
            }
          }
        }
      });

      for (let i in this.titles) {
        this.overall[this.titles[i]] = this.overall[this.stats[i]];
        delete this.overall[this.stats[i]];
      }
    }
  }
</script>

<style lang="scss" scoped>
div.winner {
  background-color: #2e5731;
}
.overflow {
  overflow-x: auto;
}
.team {
  padding: 0;
  background-color: #253858;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
              0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  margin-bottom: 1.5em;
}
th {
  text-align: left;
}
.team-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  &__row {
    border-bottom: 1px solid #fff;
    &:last-of-type {
      border-bottom: 0;
    }
  }
  &__header {
    text-align: center;
    font-size: 1.2rem;
    padding: .5em 0;
  }
  &__title {
    padding: .4em 0 .4em 1em;
    // width: 12.4rem;
    font-size: .85em;
  }
  &__stat {
    padding: .6em .8em;
    font-size: .85em;
  }
  &__alt {
    background-color: #2a4066;
  }
}
.winner tr.team-table__alt {
  background-color: #426844;
}
th {
  text-align: left;
}
@media only screen and (max-width: 450px),
(min-device-width: 768px) and (max-device-width: 1024px) {
  table, thead, tbody, th, td, tr { 
		display: block; 
  }
  .team-table {
    &__header {
      width: 100%;
    }
    &__overall {
      font-size: 1.4em;
      border-bottom: 1px solid #eee;
    }
    &__title, &__stat {
      width: 100%;
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
    }
    &__stat {
      border-bottom: 0;
    }
    &__title {
      text-align: center;
    }
	}
}
</style>