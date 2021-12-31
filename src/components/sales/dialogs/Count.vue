<template>
  <v-dialog v-model="dialog" max-width="150px" persistent>
    <v-form v-model="valid" @submit.prevent="addToBill" lazy-validation>
      <v-card class="pb-2">
        <v-card-subtitle>{{ item.value.name }}</v-card-subtitle>
        <v-card-text>
          <v-text-field
            ref="input-count"
            class="input-center"
            type="number"
            v-model="item.value.quantity"
            :hint="'متوفر ' + item.value.count + ' ' + item.value.unit"
            persistent-hint
            autofocus
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" class="warning" small>موافق</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="secondary lighten-3" small @click="closeMe">رجوع</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { deepCopy } from "@/helpers";
import { Item } from "@/index";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    valid: true,
  }),
  props: {
    item: {
      required: true,
      type: Object,
    },
    dialog: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    addToBill() {
      const quantity = this.item.value.quantity;
      if (!quantity || quantity <= 0) return;
      if (quantity > this.item.value.count) return;
      this.$store
        .dispatch("sales/addToBill", this.item)
        .then(() => this.closeMe());
    },
    closeMe() {
      this.$emit("closeMe");
    },
  },
});
</script>