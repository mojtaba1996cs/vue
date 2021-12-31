<template>
  <v-dialog v-model="dialog" max-width="150px" persistent>
    <v-card class="pb-2">
      <v-card-text>
        <v-text-field
          id="input-fee"
          type="number"
          prefix="%"
          v-model="fee"
          hide-details
          persistent-hint
          autofocus
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn class="warning" @click="setFee" small>حفظ</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="secondary lighten-3" small @click="closeMe">رجوع</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    fee: "",
  }),
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
    row: {
      required: true,
      type: Number,
    },
  },
  watch: {
    row: {
      immediate: true,
      handler(val) {
        if (!this.fee) this.fee = val;
      },
    },
  },
  methods: {
    setFee() {
      this.$store.dispatch("admin/setFee", this.fee).then(() => this.closeMe());
    },
    closeMe() {
      this.$emit("closeMe", "isEditFee");
    },
  },
});
</script>