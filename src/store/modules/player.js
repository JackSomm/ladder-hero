import axios from 'axios';

const reset = () => {
  return {
    token: '',
    loggedIn: false
  }
}
const state = reset();

const getters = {
  getToken: state => state.token,
  getLoggedIn: state => state.loggedIn,
};

const actions = {
  register ({ commit }, { username, password }) {
    return axios.post('https://api.ladder-hero.com/auth/register', {
      username: username,
      password: password
    })
    .then(res => {
      commit('SET_TOKEN_LOGIN', res.data.token);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  },
  login ({ commit }, { username, password }) {
    return axios.post('https://api.ladder-hero.com/auth/login', {
      username: username,
      password: password
    })
    .then(res => {
      commit('SET_TOKEN_LOGIN', res.data.token);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  },
  resetState ({ commit }) {
    commit('RESET_STATE');
  }
};

const mutations = {
  SET_TOKEN_LOGIN: (state, token) => {
    return state.loggedIn = true, state.token = token;
  },
  RESET_STATE: (state) => Object.assign(state, reset()),
};

export default {
  state,
  getters,
  actions,
  mutations
};