import { Module } from 'vuex';

export default {
  namespaced: true,
  state: {
    editPrice: false,
    receipts: false,
    confirm: false,
  },
  mutations: {
    editPrice(state) {
      state.editPrice = !state.editPrice;
    },
    receipts(state) {
      state.receipts = !state.receipts;
    },
    confirm(state) {
      state.confirm = !state.confirm;
    },
  },
  actions: {
    editPrice({ commit }) {
      commit('editPrice');
    },
    receipts({ commit }) {
      commit('receipts');
    },
    confirm({ commit }) {
      commit('confirm');
    },
  },
  getters: {
    editPrice: (state) => state.editPrice,
    receipts: (state) => state.receipts,
    confirm: (state) => state.confirm,
  },
} as Module<any, any>;
