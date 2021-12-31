import { Module } from 'vuex';

export default {
  namespaced: true,
  state: {
    currentSection: localStorage.currentSection,
  },
  mutations: {
    leave(state) {
      state.currentSection = undefined;
    },
    enter(state, currentSection) {
      state.currentSection = currentSection;
    },
  },
  actions: {
    leave({ commit }) {
      localStorage.removeItem('currentSection');
      commit('leave');
    },
    enter({ commit, rootState }, pinVal) {
      const pins = rootState.pins;
      for (const pin of pins) {
        if (pin.value == pinVal) {
          const currentSection = pin.key.split(':')[1];
          localStorage.currentSection = currentSection;
          commit('enter', currentSection);
        }
      }
    },
  },
  getters: {
    currentSection: (state) => state.currentSection,
  },
} as Module<any, any>;
