import { Module } from 'vuex';
import dialog from './dialog';
import { sendReq } from '../../api';
import { getUnits, getCats, getItems, setReceipt } from '@/store/db';
import { deepCopy } from '@/helpers';
import { DBRow, PurchasesState, RootState, Item } from '../../../index';

const defaultState = (): PurchasesState => ({
  receiptItems: [],
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
    saveReceipt(state) {
      state.receiptItems = [];
    },
    removeFromReceipt(state, key: number) {
      state.receiptItems = state.receiptItems.filter((item) => item.key != key);
    },
    addToReceipt(state, key: number) {
      for (const item of state.receiptItems) {
        if (item.key == key) return;
      }
      state.items.forEach((item) => {
        if (item.key == key) {
          return state.receiptItems.push(deepCopy(item));
        }
      });
    },
    initial(state, { units, cats, items }) {
      state.units = units.sort(
        (a: DBRow, b: DBRow) => (a.key as number) - (b.key as number)
      );
      state.cats = cats.sort(
        (a: DBRow, b: DBRow) => (a.key as number) - (b.key as number)
      );
      state.items = items
        .map((item: Item) => {
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
    async saveReceipt({ commit, state }) {
      if (state.receiptItems.length == 0) throw new Error('No Receipt Items');
      await setReceipt(state.receiptItems);
      commit('saveReceipt');
    },
    async setSelectedCat({ commit }, cid) {
      commit('setSelectedCat', cid);
    },
    async removeFromReceipt({ commit }, key) {
      if (!key) throw new Error('No Key');
      commit('removeFromReceipt', key);
    },
    async addToReceipt({ commit }, key) {
      if (!key) throw new Error('No Key');
      commit('addToReceipt', key);
    },
    async addCat({ commit }, { name, uid }) {
      try {
        if (!name || !uid) throw new Error('No Name Or unit');
        const { id } = await sendReq('/purchases/cat', 'post', {
          name,
          uid,
        });
        commit('addCat', { id, name });
      } catch (error) {
        console.log(error);
      }
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
    receiptItems: (state) => state.receiptItems,
    items: (state) => state.items,
    cats: (state) => state.cats,
    units: (state) => state.units,
  },
} as Module<PurchasesState, RootState>;
