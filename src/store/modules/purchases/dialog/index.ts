import { Module } from 'vuex';

export default {
  namespaced: true,
  state: {
    newReceipt: false,
    newItem: false,
    newCat: false,
    showItems: false,
  },
  mutations: {
    newReceipt(state) {
      state.newReceipt = !state.newReceipt;
    },
    newCat(state) {
      state.newCat = !state.newCat;
    },
    newItem(state) {
      state.newItem = !state.newItem;
    },
    showItems(state) {
      state.showItems = !state.showItems;
    },
  },
  actions: {
    newReceipt({ commit }) {
      commit('newReceipt');
    },
    newCat({ commit }) {
      commit('newCat');
    },
    newItem({ commit }) {
      commit('newItem');
    },
    showItems({ commit }) {
      commit('showItems');
    },
  },
  getters: {
    newReceipt: (state) => state.newReceipt,
    newCat: (state) => state.newCat,
    newItem: (state) => state.newItem,
    showItems: (state) => state.showItems,
  },
} as Module<any, any>;
