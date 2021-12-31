<template>
  <v-container> 404 </v-container>
</template>

<script lang="ts">
import router from "@/router";
import Vue from "vue";

export default Vue.extend({
  name: "NotFound",

  mounted() {
    router.replace("/");
  },
});
</script>
