import axios from 'axios';

const state = {
  token: '',
  failure: '',
};

const getters = {
  getToken: state => state.token,
  getFailure: state => state.failure
};

const actions = {
  register ({ commit }, { username, password }) {
    return axios.post('https://ladder-hero-api.honnold.me/auth/register', {
      username: username,
      password: password
    })
    .then(res => {
      commit('SET_TOKEN', res.data.token);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  },
  login ({ commit }, { username, password }) {
    return axios.post('https://ladder-hero-api.honnold.me/auth/login', {
      username: username,
      password: password
    })
    .then(res => {
      commit('SET_TOKEN', res.data.token);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  },
};

const mutations = {
  SET_TOKEN: (state, token) => state.token = token,
  SET_FAILURE: (state, failure) => state.failure = failure
};

export default {
  state,
  getters,
  actions,
  mutations
};