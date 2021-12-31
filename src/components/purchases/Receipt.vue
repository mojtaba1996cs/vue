<template>
  <v-card id="receipt">
    <v-card-title>
      <span>فاتورة الشراء</span>
      <v-spacer></v-spacer>
      <v-btn
        class="warning"
        :disabled="!isReady"
        @click="$store.dispatch('purchases/dialog/newReceipt')"
        small
        >عرض</v-btn
      >
    </v-card-title>
    <v-card-text class="scroll-y pt-2">
      <v-row>
        <v-col>
          <v-card class="mb-3" v-for="item in receiptItems" :key="item.key">
            <v-card-text class="py-1 px-2">
              <v-row class="mb-2" no-gutters>
                <v-col class="col-11 primary--text subtitle-1">{{
                  item.value.name
                }}</v-col>
                <v-spacer></v-spacer>
                <v-col class="col-1 text-left">
                  <v-btn @click="remove(item.key)" dark icon x-small>
                    <v-icon color="warning">mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row justify="space-between" no-gutters>
                <v-col class="col-5">
                  <v-text-field
                    type="number"
                    hide-details="true"
                    class="ma-0 pa-0"
                    :label="item.value.unit"
                    v-model="item.value.quantity"
                    outlined
                    dense
                  />
                </v-col>
                <v-col class="col-5">
                  <v-text-field
                    type="number"
                    hide-details="true"
                    class="ma-0 pa-0"
                    label="جنيه"
                    v-model="item.value.price"
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <NewReceipt />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import _ar from "@/_ar";

import NewReceipt from "./dialogs/NewReceipt.vue";

export default Vue.extend({
  data: () => ({}),
  computed: {
    receiptItems() {
      return this.$store.getters["purchases/receiptItems"];
    },
    isReady() {
      if (this.receiptItems.length <= 0) return false;
      for (const item of this.receiptItems) {
        if (
          !item.value.quantity ||
          item.value.quantity <= 0 ||
          !item.value.price ||
          item.value.price <= 0
        ) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    remove(key: number) {
      this.$store.dispatch("purchases/removeFromReceipt", key);
    },
  },
  components: {
    NewReceipt,
  },
});
</script>

<style>
</style>