import { Module } from 'vuex';

export default {
  namespaced: true,
  state: {
    count: false,
  },
  mutations: {
    count(state) {
      state.count = !state.count;
    },
  },
  actions: {
    count({ commit }) {
      commit('count');
    },
  },
  getters: {
    count: (state) => state.count,
  },
} as Module<any, any>;
