<template>
  <v-dialog v-model="dialog" max-width="250px" persistent>
    <v-card class="py-2">
      <v-card-text class="px-1">
        <v-card outlined>
          <v-simple-table>
            <tbody>
              <tr v-for="item in receipt.value.items" :key="item.key">
                <td>{{ item.value.name }}</td>
                <td>{{ item.value.quantity }} {{ item.value.unit }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn class="warning" @click="confirm" small>تأكيد اﻹستلام</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="secondary lighten-3" small @click="closeMe">رجوع</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({}),
  props: {
    receipt: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dialog(): any {
      return this.$store.getters["stock/dialog/confirm"];
    },
  },
  methods: {
    confirm() {
      this.$store
        .dispatch("stock/confirm", this.receipt.key)
        .then(() => this.closeMe());
    },
    closeMe() {
      this.$store.dispatch("stock/dialog/confirm");
    },
  },
});
</script>