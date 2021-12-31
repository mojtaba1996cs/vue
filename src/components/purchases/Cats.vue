<template>
  <v-row id="cats" no-gutters>
    <v-col
      v-for="cat in cats"
      :key="cat.key"
      class="col-auto col-md-12 px-1 py-2"
    >
      <v-btn
        :class="cat.key == 0 ? 'font-weight-bold selected' : 'font-weight-bold'"
        @click="setCid($event, cat.key)"
        rounded
        small
      >
        {{ cat.value }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { DBRow } from "../../index";
import Vue from "vue";

export default Vue.extend({
  methods: {
    setCid(e: Event, cid: number | string) {
      (document.querySelectorAll(".selected") as NodeList).forEach((node) => {
        (node as HTMLElement).classList.remove("selected");
      });
      (e.target as HTMLElement).classList.add("selected");
      this.$emit("setCid", cid);
    },
  },
  computed: {
    cats(): DBRow[] {
      const _cats: DBRow[] = this.$store.getters["purchases/cats"];
      return [{ key: 0, value: "كل اﻷصناف" }, ..._cats];
    },
  },
});
</script>

<style>
#cats .selected {
  color: #f1ac00 !important;
}
</style>
