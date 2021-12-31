<template>
  <div>
    <v-dialog v-model="dialog" max-width="400px" persistent>
      <v-card v-if="dialog">
        <v-card-title>
          اﻷصناف
          <v-spacer></v-spacer>
          <v-btn
            class="warning"
            color="white"
            icon
            small
            @click="$store.dispatch('purchases/dialog/newItem')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col
              class="col-auto ma-1"
              v-for="item in cat.items"
              :key="item.id"
              ><v-chip @click="addToReceipt(item.id)">{{
                item.name
              }}</v-chip></v-col
            >
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="secondary lighten-3" small @click="closeMe">رجوع</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <NewItem />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import NewItem from "./NewItem.vue";

export default Vue.extend({
  data: () => ({}),
  computed: {
    cat() {
      return this.$store.getters["purchases/selectedCat"];
    },
    dialog() {
      return this.$store.getters["purchases/dialog/showItems"];
    },
  },
  methods: {
    addToReceipt(id: string) {
      this.$store.commit("purchases/addToReceipt", id);
    },
    closeMe() {
      this.$store.dispatch("purchases/setSelectedCat");
      this.$store.dispatch("purchases/dialog/showItems");
    },
  },
  components: {
    NewItem,
  },
});
</script>

<style>
</style>