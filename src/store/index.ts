import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account';
import admin from './modules/admin';
import purchases from './modules/purchases';
import sales from './modules/sales';
import stock from './modules/stock';

import { initialDB, getIsShowPins, setShowPins, getPins, setPin } from './db';
import { DBRow } from '..';

Vue.use(Vuex);

const defaultState = () => ({
  pins: [] as DBRow[],
  isShowPins: undefined as boolean | undefined,
  dbReady: false,
});

export default new Vuex.Store({
  state: defaultState(),
  mutations: {
    setPin(state, pin) {
      state.pins = state.pins.map((p) => {
        return p.key == pin.key ? pin : p;
      });
    },
    isShowPins(state, isShowPins) {
      state.isShowPins = isShowPins;
    },
    initial(state, { isShowPins, pins }) {
      state.isShowPins = isShowPins;
      state.pins = pins;
      state.dbReady = true;
    },
  },
  actions: {
    async setPin({ commit }, pin) {
      await setPin(pin, true);
      commit('setPin', pin);
    },
    async isShowPins({ commit }, isShowPins) {
      await setShowPins(isShowPins, true);
      commit('isShowPins', isShowPins);
    },
    async initial({ commit }) {
      try {
        let isShowPins = await getIsShowPins();
        if (typeof isShowPins == 'undefined') {
          console.log(await initialDB());
          isShowPins = await getIsShowPins();
        }
        const pins = await getPins();
        commit('initial', { isShowPins, pins });
      } catch (error) {
        console.log('Store InitialDB', error);
      }
    },
  },
  getters: {
    pins: (state) => state.pins,
    isShowPins: (state) => state.isShowPins,
    dbReady: (state) => state.dbReady,
  },
  modules: {
    account,
    admin,
    purchases,
    sales,
    stock,
  },
});
