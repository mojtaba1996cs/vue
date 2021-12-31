<template>
  <v-card class="pt-2" flat outlined>
    <v-virtual-scroll
      class="table"
      height="560"
      item-height="35"
      :items="items"
    >
      <template v-slot:default="{ item }">
        <v-card
          class="pointer mx-1"
          rounded="0"
          @click="addToReceipt(item.key)"
          flat
          outlined
        >
          <span class="pr-2 subtitle-2 primary--text">{{
            item.value.name
          }}</span>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import _ar from "@/_ar";
import { Item } from "../../index";

export default Vue.extend({
  props: {
    cid: {
      required: true,
      type: Number,
    },
  },
  computed: {
    units() {
      return this.$store.getters["purchases/units"];
    },
    items(): Item[] {
      const _items: Item[] = this.$store.getters["purchases/items"];
      return this.cid == 0
        ? _items
        : _items.filter((item) => item.value.cid == this.cid);
    },
  },
  methods: {
    addToReceipt(key: string) {
      this.$store.commit("purchases/addToReceipt", key);
    },
    unit(key: number) {
      for (const u of this.units) {
        if (u.key == key) return u.value;
      }
    },
    arPin(key: any) {
      return _ar[key.split(":")[1]];
    },
  },
});
</script>

<style></style>
