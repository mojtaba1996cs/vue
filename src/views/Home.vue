<template>
  <v-container fluid fill-height class="pa-0 ma-0">
    <v-row class="justify-center">
      <v-col class="col-auto">
        <v-card class="pa-4">
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="enter"
            lazy-validation
          >
            <v-row class="justify-center">
              <v-col class="col-auto">
                <v-text-field
                  class="input-center input-thin"
                  prepend-inner-icon="mdi-key"
                  color="gray"
                  v-model="pin"
                  :rules="pinRules"
                  autofocus
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center" no-gutters>
              <v-col class="col-auto">
                <v-btn
                  type="submit"
                  class="font-weight-bold"
                  :disabled="!valid"
                  dark
                >
                  دخول
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col class="col-auto">
        <p
          class="text-right ma-0 grey--text caption"
          v-for="pin in pins"
          :key="pin.key"
        >
          {{ pin.key }}: {{ pin.value }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import _ar from "../_ar";

export default Vue.extend({
  name: "Home",

  data: () => ({
    valid: true,
    pin: "",
    pinRules: [(v: any) => !!v || "رمز الدخول مطلوب"],
  }),

  computed: {
    currentSection() {
      return this.$store.getters["account/currentSection"];
    },
    pins() {
      const arr = [];
      if (this.isShowPins) {
        const rows = this.$store.getters["pins"];
        for (const row of rows) {
          arr.push({ key: _ar[row.key.split(":")[1]], value: row.value });
        }
      }
      return arr;
    },
    isShowPins() {
      return this.$store.getters["isShowPins"];
    },
  },

  methods: {
    enter() {
      if ((this.$refs.form as HTMLFormElement)!.validate()) {
        this.$store.dispatch("account/enter", this.pin);
      }
    },
  },

  mounted() {
    this.$store.dispatch("initial");
  },
});
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
.container.fill-height {
  background: url("../assets/bg-01.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.v-card {
  opacity: 0.95;
}
button {
  background-image: linear-gradient(to left, #a445b2, #d41872, #fa4299);
}
</style>
