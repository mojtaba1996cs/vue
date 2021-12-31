<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-md-1 mt-md-2">
        <Cats @setCid="setCid" />
      </v-col>
      <v-col class="col-12 col-md-4">
        <Items :cid="cid" />
      </v-col>
      <v-col class="col-12 col-md-7">
        <Receipt />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import Cats from "@/components/purchases/Cats.vue";
import Items from "@/components/purchases/Items.vue";
import Receipt from "@/components/purchases/Receipt.vue";

export default Vue.extend({
  name: "Purchases",
  data: () => ({
    cid: 0,
  }),
  methods: {
    setCid(cid: number) {
      this.cid = cid;
    },
  },
  components: {
    Cats,
    Items,
    Receipt,
  },

  mounted() {
    this.$store.dispatch("purchases/initial");
  },
  beforeDestroy() {
    // this.$store.dispatch("purchases/reset");
  },
});
</script>
