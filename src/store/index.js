import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import player from './modules/player'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    player
  },
  plugins: [createPersistedState()]
});

export default store;