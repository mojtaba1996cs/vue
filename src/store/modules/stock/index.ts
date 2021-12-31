import { Module } from 'vuex';
import dialog from './dialog';
import {
  getUnits,
  getCats,
  getItems,
  getReceipts,
  confirmReceipt,
} from '@/store/db';
import { Item, RootState, StockState } from '../../../index';

const defaultState = (): StockState => ({
  receipts: [],
  items: [],
  cats: [],
  units: [],
});

export default {
  namespaced: true,
  state: defaultState(),
  modules: {
    dialog,
  },
  mutations: {
    confirm(state, key: number | string) {
      const quantities: Record<number, number> = {};

      state.receipts = state.receipts.filter((r) => {
        if (r.key == key) {
          for (const item of r.value.items) {
            quantities[item.key] = item.value.quantity!;
          }
          return false;
        } else {
          return true;
        }
      });

      for (const item of state.items) {
        const quantity = quantities[item.key];
        if (quantity) item.value.count! += quantity;
        state.items.splice(state.items.indexOf(item), 1, item);
      }
    },

    initial(state, { units, cats, items, receipts }) {
      state.units = units;
      state.cats = cats;
      state.items = items;
      state.receipts = receipts;
    },

    reset(state) {
      Object.assign(state, defaultState());
    },
  },
  actions: {
    async confirm({ commit }, key: number) {
      await confirmReceipt(key);
      commit('confirm', key);
    },
    async initial({ commit }) {
      const units = await getUnits();
      const cats = await getCats();
      const items = await getItems();
      const receipts = await getReceipts();
      cats.unshift({ key: 0, value: 'كل اﻷصناف' });
      commit('initial', { units, cats, items, receipts });
    },
    async reset({ commit }) {
      commit('reset');
    },
  },
  getters: {
    receipts: (state) => state.receipts,
    items: (state) => state.items,
    cats: (state) => state.cats,
  },
} as Module<StockState, RootState>;
