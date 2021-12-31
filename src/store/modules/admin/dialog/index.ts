import { Module } from 'vuex';

export default {
  namespaced: true,
  state: {
    editFee: false,
    editItem: false,
  },
  mutations: {
    editItem(state) {
      state.editItem = !state.editItem;
    },
    editFee(state) {
      state.editFee = !state.editFee;
    },
  },
  actions: {
    editItem({ commit }) {
      commit('editItem');
    },
    editFee({ commit }) {
      commit('editFee');
    },
  },
  getters: {
    editItem: (state) => state.editItem,
    editFee: (state) => state.editFee,
  },
} as Module<any, any>;
