<template>
  <v-dialog v-model="dialog" max-width="400px" persistent>
    <v-card>
      <v-container>
        <v-form ref="form" @submit.prevent="addNewCat" lazy-validation>
          <v-card-text>
            <v-text-field
              v-model="newCat.name"
              label="إسم الصنف"
              :rules="newCatRules"
            />
            <v-select
              v-model="newCat.uid"
              label="وحدة القياس"
              item-text="name"
              item-value="id"
              :items="units"
              dense
            >
            </v-select>
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
    newCatRules: [(v: string) => !!v || "إسم الصنف مطلوب"],
    newCat: {} as { name: string; uid: number },
  }),
  computed: {
    units() {
      return this.$store.getters["purchases/units"];
    },
    dialog() {
      return this.$store.getters["purchases/dialog/newCat"];
    },
  },
  methods: {
    async addNewCat() {
      if (!this.newCat || !this.newCat.name || !this.newCat.uid) return;
      await this.$store.dispatch("purchases/addCat", {
        name: this.newCat.name,
        uid: this.newCat.uid,
      });
      this.closeMe();
    },
    closeMe() {
      (this.$refs.form as HTMLFormElement).reset();
      this.$store.dispatch("purchases/dialog/newCat");
    },
  },
});
</script>

<style>
</style>