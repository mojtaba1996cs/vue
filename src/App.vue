<template>
  <v-app>
    <v-app-bar
      color="primary"
      elevation="0"
      app
      dense
      dark
      v-if="currentSection"
    >
      <div class="pr-2">
        <h3>{{ section }}</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="leave" text>
        <v-icon small>mdi-open-in-new</v-icon>
        <span>خروج</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view v-if="dbReady" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import _ar from "@/_ar";

export default Vue.extend({
  name: "App",

  data: () => ({ section: "" }),
  computed: {
    dbReady() {
      return this.$store.getters["dbReady"];
    },
    currentSection() {
      return this.$store.getters["account/currentSection"];
    },
  },
  watch: {
    currentSection: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.section = _ar[val];
          const section = `/${val}`;
          if (this.$route.path != section) {
            this.$router.replace(section);
          }
        } else {
          if (this.$route.path != "/") {
            this.$router.replace("/");
          }
        }
      },
    },
  },
  methods: {
    leave() {
      this.section = "";
      this.$store.dispatch("account/leave");
    },
  },
  mounted() {
    this.$store.dispatch("initial");
  },
});
</script>

<style>
.v-main {
  transition: none !important;
}
.input-center input {
  text-align: center;
}
.large-text .v-label {
  font-size: 1.2rem;
}
.input-thin .v-input__slot::after {
  border-width: 0 !important;
}
.v-application .error--text {
  padding: 4px;
}
.v-card.item {
  cursor: pointer;
  color: #7166b3 !important;
  background-color: #ffffff !important;
}
.v-card.item.selected {
  background-color: #258e28 !important;
}
.scroll-y {
  height: 75vh;
  overflow-y: scroll;
}
#receipt .v-text-field {
  direction: ltr !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.v-text-field input,
.v-select__selection {
  padding-right: 4px !important;
  padding-left: 4px !important;
}
.pointer {
  cursor: pointer !important;
}
.table .v-virtual-scroll__item:nth-of-type(odd) .v-card {
  background-color: #fdfdfd !important;
}
</style>
