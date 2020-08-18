import axios from 'axios';

const state = {
  token: '',
};

const getters = {
  getToken: state => state.token
};

const actions = {
  async register ({ commit }, { username, password }) {
    axios.post('https://ladder-hero-api.honnold.me/auth/register', {
      username: username,
      password: password
    })
    .then(res => {
      commit('setToken', res.data.token);
    });
  },
  async login ({ commit }, { username, password }) {
    axios.post('https://ladder-hero-api.honnold.me/auth/login', {
      username: username,
      password: password
    })
    .then(res => {
      commit('setToken', res.data.token);
    });
  },
};

const mutations = {
  setToken: (state, token) => state.token = token
};

export default {
  state,
  getters,
  actions,
  mutations
};