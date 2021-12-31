<template>
  <v-dialog v-model="dialog" max-width="400px" persistent>
    <v-card>
      <v-container>
        <v-form ref="form" @submit.prevent="addNewItem" lazy-validation>
          <v-card-text>
            <v-text-field
              v-model="itemName"
              label="إسم الصنف"
              :rules="itemRules"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" class="warning" small>حفظ</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="secondary lighten-3" small @click="closeMe"
              >رجوع</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    itemRules: [(v: string) => !!v || "إسم الصنف مطلوب"],
    itemName: "",
  }),
  computed: {
    dialog() {
      return this.$store.getters["purchases/dialog/newItem"];
    },
  },
  methods: {
    async addNewItem() {
      if (!this.itemName) return;
      await this.$store.dispatch("purchases/addItem", this.itemName);
      this.closeMe();
    },
    closeMe() {
      (this.$refs.form as HTMLFormElement).reset();
      this.$store.dispatch("purchases/dialog/newItem");
    },
  },
});
</script>

<style>
</style>