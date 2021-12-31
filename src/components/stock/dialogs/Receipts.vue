<template>
  <v-dialog v-model="dialog" max-width="250px" persistent>
    <v-card>
      <v-container>
        <v-card-text v-if="receipts.length > 0" class="pt-0">
          <v-row v-for="receipt in receipts" :key="receipt.key">
            <v-col>
              <v-card class="pointer">
                <v-card-subtitle
                  class="text-left"
                  style="direction: ltr"
                  @click="confirm(receipt)"
                  >{{ receipt.value.d }}</v-card-subtitle
                >
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else class="text-subtitle-1">
          لايوجد فواتير شراء معلقة
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="secondary lighten-3" small @click="closeMe">رجوع</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
    <Confirm v-if="receipt" :receipt="receipt" />
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Confirm from "./Confirm.vue";

export default Vue.extend({
  data: () => ({
    receipt: undefined as Record<any, any> | undefined,
  }),
  computed: {
    receipts(): any {
      return this.$store.getters["stock/receipts"];
    },
    dialog(): any {
      return this.$store.getters["stock/dialog/receipts"];
    },
  },
  methods: {
    confirm(receipt: Record<any, any>) {
      this.receipt = receipt;
      this.$store.dispatch("stock/dialog/confirm");
    },
    closeMe() {
      this.$store.dispatch("stock/dialog/receipts");
    },
  },
  components: {
    Confirm,
  },
});
</script>