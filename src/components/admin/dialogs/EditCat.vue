<template>
  <v-dialog v-model="dialog" max-width="350px" persistent>
    <v-card class="pt-4 pb-2">
      <v-card-text>
        <v-text-field v-model="row.value" label="اسم الصنف"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-row justify="space-between" no-gutters>
          <v-col class="col-auto"
            ><v-btn class="warning" @click="setCat" small>حفظ</v-btn></v-col
          >
          <v-col v-if="row.key" class="col-auto" align-self="end">
            <v-icon color="error darken-1 pointer" @click="remove">
              mdi-delete
            </v-icon>
          </v-col>
          <v-col class="col-auto"
            ><v-btn class="secondary lighten-3" small @click="closeMe"
              >رجوع</v-btn
            ></v-col
          >
        </v-row>
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
    remove() {
      if (confirm("حذف العنصر؟")) {
        this.$store
          .dispatch("admin/deleteCat", this.row.key)
          .then(() => this.closeMe());
      }
    },
    setCat() {
      this.$store.dispatch("admin/setCat", this.row).then(() => this.closeMe());
    },
    closeMe() {
      this.$emit("closeMe", "isEditCat");
    },
  },
});
</script>