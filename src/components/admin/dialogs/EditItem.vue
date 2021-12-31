<template>
  <v-dialog v-model="dialog" max-width="350px" persistent>
    <v-card class="pt-4 pb-2">
      <v-card-text>
        <v-text-field v-model="row.value.name" label="إسم الصنف"></v-text-field>
        <v-select
          ref="select-unit"
          v-model="row.value.uid"
          item-text="value"
          item-value="key"
          :items="units"
          label="الوحدة"
        ></v-select>
        <v-select
          ref="select-cat"
          v-model="row.value.cid"
          item-text="value"
          item-value="key"
          :items="cats"
          label="التصنيف"
        >
        </v-select>
      </v-card-text>
      <v-card-actions>
        <v-row justify="space-between" no-gutters>
          <v-col class="col-auto"
            ><v-btn class="warning" @click="setItem" small>حفظ</v-btn></v-col
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
  data: () => ({}),
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
  computed: {
    units(): any {
      return this.$store.getters["admin/units"];
    },
    cats(): any {
      return this.$store.getters["admin/cats"];
    },
  },
  methods: {
    remove() {
      if (confirm("حذف العنصر؟")) {
        this.$store
          .dispatch("admin/deleteItem", this.row.key)
          .then(() => this.closeMe());
      }
    },
    setItem() {
      this.$store
        .dispatch("admin/setItem", this.row)
        .then(() => this.closeMe());
    },
    closeMe() {
      this.$emit("closeMe", "isEditItem");
    },
  },
});
</script>