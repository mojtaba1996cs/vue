import { Module } from 'vuex';
import dialog from './dialog';
import { AdminState, RootState } from '../../../index';
import {
  getFee,
  setFee,
  setItem,
  getUnits,
  getCats,
  getItems,
  setUnit,
  setCat,
  deleteUnit,
  deleteCat,
  deleteItem,
} from '../../db';

const defaultState = (): AdminState => ({
  items: [],
  cats: [],
  pins: [],
  fee: undefined,
  units: [],
});

export default {
  namespaced: true,
  state: defaultState(),
  modules: {
    dialog,
  },
  mutations: {
    deleteUnit(state, key) {
      state.units = state.units.filter((unit: any) => unit.key != key);
    },
    deleteCat(state, key) {
      state.cats = state.cats.filter((cat: any) => cat.key != key);
    },
    deleteItem(state, key) {
      state.items = state.items.filter((item: any) => item.key != key);
    },
    setCat(state, { cat, update }) {
      if (update == true) {
        state.cats = state.cats.map((c: any) => {
          return c.key == cat.key ? cat : c;
        });
      } else {
        state.cats = [cat, ...state.cats];
      }
    },
    setUnit(state, { unit, update }) {
      if (update == true) {
        state.units = state.units.map((u: any) => {
          return u.key == unit.key ? unit : u;
        });
      } else {
        state.units = [unit, ...state.units];
      }
    },
    setItem(state, { item, update }) {
      if (update == true) {
        state.items = state.items.map((i: any) => {
          return i.key == item.key ? item : i;
        });
      } else {
        state.items = [item, ...state.items];
      }
    },
    setFee(state, fee) {
      state.fee = parseInt(fee);
    },
    initial(state, { fee, units, cats, items }) {
      state.fee = fee;
      state.units = units;
      state.cats = cats;
      state.items = items.sort((a: any, b: any) => a.value.cid - b.value.cid);
    },
    reset(state) {
      Object.assign(state, defaultState());
    },
  },
  actions: {
    async deleteUnit({ commit }, key) {
      await deleteUnit(key);
      commit('deleteUnit', key);
    },
    async deleteCat({ commit }, key) {
      await deleteCat(key);
      commit('deleteCat', key);
    },
    async deleteItem({ commit }, key) {
      await deleteItem(key);
      commit('deleteItem', key);
    },
    async setCat({ commit }, cat) {
      const update = typeof cat.key != 'undefined';
      await setCat(cat, update);
      commit('setCat', { cat, update });
    },
    async setUnit({ commit }, unit) {
      const update = typeof unit.key != 'undefined';
      await setUnit(unit, true);
      commit('setUnit', { unit, update });
    },
    async setItem({ commit }, item) {
      const update = typeof item.key != 'undefined';
      await setItem(item, true);
      commit('setItem', { item, update });
    },
    async setFee({ commit }, fee) {
      await setFee(parseInt(fee));
      commit('setFee', fee);
    },
    async initial({ commit, state }) {
      if (!state.fee) {
        const fee = await getFee();
        const units = await getUnits();
        const cats = await getCats();
        const items = await getItems();
        commit('initial', { fee, units, cats, items });
      }
    },
    async reset({ commit }) {
      commit('reset');
    },
  },
  getters: {
    items: (state) =>
      state.items.sort((a: any, b: any) => a.value.cid - b.value.cid),
    cats: (state) => state.cats.sort((a: any, b: any) => a.key - b.key),
    fee: (state) => state.fee,
    units: (state) => state.units.sort((a: any, b: any) => a.key - b.key),
  },
} as Module<AdminState, RootState>;
