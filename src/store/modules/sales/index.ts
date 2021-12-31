import { Module } from 'vuex';
import dialog from './dialog';
import { getUnits, getCats, getItems, setBill } from '@/store/db';
import { DBRow, RootState, SalesState, Item } from '../../../index';

const defaultState = (): SalesState => ({
  items: [],
  cats: [],
  billItems: [],
});

export default {
  namespaced: true,
  state: defaultState(),

  modules: {
    dialog,
  },

  mutations: {
    saveBill(state, rows: DBRow[]) {
      for (const row of rows) {
        for (const item of state.items) {
          if (item.key == row.key) item.value.count = row.value.count;
        }
      }
      state.billItems = [];
    },
    removeFromBill(state, key: number | string) {
      state.billItems.forEach((item, index) => {
        if (item.key == key) state.billItems.splice(index, 1);
      });
    },
    addToBill(state, item: Item) {
      item.value.price = item.value.p2! * item.value.quantity!;
      state.billItems.push(item);
    },
    initial(state, { units, cats, items }) {
      cats.unshift({ key: 0, value: 'كل اﻷصناف' });
      state.items = items
        .filter((item: DBRow) => item.value.p2 > 0)
        .map((item: DBRow) => {
          item.value.unit = units.filter(
            (u: DBRow) => u.key == item.value.uid
          )[0].value;
          item.value.cat = cats.filter(
            (c: DBRow) => c.key == item.value.cid
          )[0].value;
          return item;
        })
        .sort((a: Item, b: Item) => a.value.cid - b.value.cid);
    },
    reset(state) {
      Object.assign(state, defaultState());
    },
  },
  actions: {
    async saveBill({ commit, state }) {
      const rows = await setBill(state.billItems);
      commit('saveBill', rows);
    },
    removeFromBill({ commit }, key: number | string) {
      commit('removeFromBill', key);
    },
    addToBill({ commit }, item: Item) {
      commit('addToBill', item);
    },
    async initial({ commit }) {
      const units = await getUnits();
      const cats = await getCats();
      const items = await getItems();
      commit('initial', { units, cats, items });
    },
    async reset({ commit }) {
      commit('reset');
    },
  },
  getters: {
    items: (state) => state.items,
    cats: (state) => state.cats,
    billItems: (state) => state.billItems,
  },
} as Module<SalesState, RootState>;
