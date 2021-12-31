<template>
  <v-dialog v-model="dialog" max-width="250px" persistent>
    <v-card>
      <v-container>
        <v-form ref="form" @submit.prevent="save" lazy-validation>
          <v-card-text class="pt-0">
            <span>{{ item.name }}</span>
            <v-text-field
              type="number"
              id="input-price"
              v-model="item.price"
              :label="'سعر ال' + item.unit"
              :rules="priceRules"
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
    priceRules: [(v: string) => !!v || "السعر مطلوب"],
  }),
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    dialog(): any {
      return this.$store.getters["stock/dialog/editPrice"];
    },
  },
  methods: {
    async save() {
      await this.$store.dispatch("stock/editPrice", {
        iid: this.item.id,
        cid: this.item.cid,
        price: this.item.price,
      });
      this.closeMe();
    },
    closeMe() {
      // (this.$refs.form as HTMLFormElement).reset();
      this.$store.dispatch("stock/dialog/editPrice");
    },
  },
  mounted() {
    document
      .querySelector("#input-price")
      ?.addEventListener("focus", (e: any) => {
        e.currentTarget.select();
      });
  },
});
</script>