<template>
  <v-dialog v-model="dialog" max-width="350px" persistent>
    <v-card class="pt-4 pb-2">
      <v-card-text>
        <v-text-field v-model="row.value" label="رمز الدخول"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn class="warning" @click="setPin" small>حفظ</v-btn>
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
    pin: undefined as Record<string, string> | undefined,
  }),
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
    row: {
      required: true,
      type: Object,
    },
  },
  methods: {
    setPin() {
      this.$store.dispatch("setPin", this.row).then(() => this.closeMe());
    },
    closeMe() {
      this.$emit("closeMe", "isEditPin");
    },
  },
});
</script>