<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row justify="space-between" no-gutters>
      <v-col class="col-12 col-md-7">
        <v-card
          v-if="items.length > 0"
          class="scroll-y pa-2"
          height="90vh"
          max-height="90vh"
          width="auto"
          flat
        >
          <v-row no-gutters>
            <v-col
              class="col-12 col-md-6 pa-2"
              v-for="item in items"
              :key="item.key"
            >
              <v-card class="pa-2 pointer" @click="openCount(item)">
                <v-row no-gutters>
                  <v-col>{{ item.value.name }}</v-col>
                  <v-col class="text-left">
                    <span class="caption">
                      ال{{ item.value.unit }} {{ item.value.p2 }} جنيه
                    </span>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-card v-else class="ma-4">
          <v-card-text>
            <v-card-subtitle> لاتوجد مشتريات </v-card-subtitle>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-5 pa-2">
        <v-card v-if="hasItems" class="pa-2">
          <v-card-text>
            <v-row no-gutters>
              <v-col
                class="col-12 pt-2"
                v-for="item in billItems"
                :key="item.key"
              >
                <v-card>
                  <v-icon
                    class="warning--text float-left pointer"
                    @click="removeFromBill(item.key)"
                    small
                    >mdi-close</v-icon
                  >
                  <v-row class="pa-2" no-gutters>
                    <v-col>{{ item.value.name }}</v-col>
                    <v-col>
                      <span class="caption"
                        >{{ item.value.quantity }} {{ item.value.unit }}</span
                      >
                    </v-col>
                    <v-col class="text-left">
                      <span class="caption"> {{ item.value.price }} جنيه </span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="warning" @click="saveBill" small>حفظ</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Count v-if="dialog" v-bind="{ dialog, item }" @closeMe="dialog = false" />
  </v-container>
</template>

<script lang="ts">
import { deepCopy } from "@/helpers";
import Vue from "vue";
import { Item } from "..";
import Count from "../components/sales/dialogs/Count.vue";

export default Vue.extend({
  name: "Sales",

  data: () => ({
    item: undefined as Item | undefined,
    dialog: false,
  }),

  computed: {
    hasItems() {
      if (this.billItems && this.billItems.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    billItems(): Item[] {
      return this.$store.getters["sales/billItems"];
    },
    items(): Item[] {
      return this.$store.getters["sales/items"];
    },
    cats() {
      return this.$store.getters["sales/cats"];
    },
  },
  methods: {
    saveBill() {
      this.$store.dispatch("sales/saveBill");
    },
    openCount(item: Item) {
      for (const i of this.billItems) {
        if (i.key == item.key) return;
      }
      this.item = deepCopy(item);
      this.dialog = true;
    },
    removeFromBill(key: number | string) {
      this.$store.dispatch("sales/removeFromBill", key);
    },
  },
  components: {
    Count,
  },
  mounted() {
    this.$store.dispatch("sales/initial");
  },
  beforeDestroy() {
    this.$store.dispatch("sales/reset");
  },
});
</script>

