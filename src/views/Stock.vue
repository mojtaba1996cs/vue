<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row class="pa-2" justify="space-between" no-gutters>
      <v-col class="col-6 col-md-2">
        <v-select
          class="ma-0 pa-0"
          v-model="selected"
          item-text="value"
          item-value="key"
          :items="cats"
          single-line
          hide-details
          dense
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="col-auto">
        <v-btn @click="$store.dispatch('stock/dialog/receipts')" small
          >فواتير الشراء</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="col-auto col-md-6">
        <v-card class="ma-2" rounded>
          <v-simple-table v-if="result">
            <thead>
              <tr>
                <th>الصنف</th>
                <th>العدد</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in result" :key="item.key">
                <td>{{ item.value.name }}</td>
                <td>{{ item.value.count }} {{ item.value.unit }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <Receipts />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Item } from "..";
import Receipts from "../components/stock/dialogs/Receipts.vue";

export default Vue.extend({
  name: "Stock",

  data: () => ({
    item: undefined,
    selected: 0,
    result: undefined as Item[] | undefined,
  }),

  computed: {
    cats() {
      return this.$store.getters["stock/cats"];
    },
    items() {
      return this.$store.getters["stock/items"];
    },
  },
  watch: {
    selected: {
      handler(val) {
        if (val == 0) {
          this.result = this.items;
        } else {
          this.result = this.items.filter((v: any) => {
            return v.value.cid == val;
          });
        }
      },
    },
    items: {
      immediate: true,
      handler(val) {
        this.result = val;
      },
    },
  },
  methods: {
    editPrice(item: any) {
      this.item = item;
      this.$store.dispatch("stock/dialog/editPrice");
    },
  },
  components: {
    Receipts,
  },
  mounted() {
    this.$store.dispatch("stock/initial");
  },
  beforeDestroy() {
    this.$store.dispatch("stock/reset");
  },
});
</script>

