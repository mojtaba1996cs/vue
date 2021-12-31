<template>
  <v-container fluid>
    <v-row justify="space-between">
      <v-col class="col-12 col-md-3">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <span>التصنيفات</span>
                <v-spacer></v-spacer>
                <v-btn class="primary" @click="editCat()" icon x-small dark>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-virtual-scroll height="300" item-height="30" :items="cats">
                  <template v-slot:default="{ item }">
                    <v-row justify="space-between" no-gutters>
                      <v-col class="col-auto pr-2">{{ item.value }}</v-col>
                      <v-col class="col-auto pl-2"
                        ><v-icon
                          class="pointer warning--text"
                          @click="editCat(item)"
                          small
                        >
                          mdi-pencil
                        </v-icon></v-col
                      >
                    </v-row>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                الوحدات
                <v-spacer></v-spacer>
                <v-btn class="primary" @click="editUnit()" icon x-small dark>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-virtual-scroll height="90" item-height="30" :items="units">
                  <template v-slot:default="{ item }">
                    <v-row justify="space-between" no-gutters>
                      <v-col class="col-auto pr-2">{{ item.value }}</v-col>
                      <v-col class="col-auto pl-2"
                        ><v-icon
                          class="pointer warning--text"
                          @click="editUnit(item)"
                          small
                        >
                          mdi-pencil
                        </v-icon></v-col
                      >
                    </v-row>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="col-12 col-md-6">
        <v-card flat outlined>
          <v-card-title>
            <span>اﻷصناف</span>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click="editItem()" icon x-small dark>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-virtual-scroll
            class="table"
            height="510"
            item-height="30"
            :items="items"
          >
            <template v-slot:default="{ item }">
              <v-card class="mx-1" rounded="0" flat outlined>
                <v-row justify="space-between" no-gutters>
                  <v-col class="col-auto pr-2 subtitle-2">{{
                    item.value.name
                  }}</v-col>
                  <v-col class="col-auto px-2">
                    <span class="caption">
                      {{ unit(item.value.uid) }}
                    </span>
                    <v-icon
                      class="pointer warning--text"
                      @click="editItem(item)"
                      small
                    >
                      mdi-pencil
                    </v-icon></v-col
                  >
                </v-row>
              </v-card>
            </template>
          </v-virtual-scroll>
        </v-card>
      </v-col>

      <v-col class="col-12 col-md-3">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>نسبة الربح</v-card-title>
              <v-card-text>
                <v-list-item>
                  <span>{{ fee }}%</span>
                  <v-spacer></v-spacer>
                  <span
                    ><v-icon
                      class="pointer warning--text"
                      @click="editFee"
                      small
                    >
                      mdi-pencil
                    </v-icon></span
                  >
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>رموز الدخول</v-card-title>
              <v-card-text>
                <v-list-item v-for="pin in pins" :key="pin.key">
                  <span>{{ arPin(pin.key) }}: {{ pin.value }}</span>
                  <v-spacer></v-spacer>
                  <span
                    ><v-icon
                      class="pointer warning--text"
                      @click="editPin(pin)"
                      small
                    >
                      mdi-pencil
                    </v-icon></span
                  >
                </v-list-item>
              </v-card-text>
              <v-card-text>
                <v-checkbox
                  v-model="isShowPins"
                  label="عرض على شاشة الدخول"
                  dense
                ></v-checkbox>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <EditCat
      v-if="dialogs.isEditCat"
      :dialog="dialogs.isEditCat"
      :row="oldCat"
      @closeMe="closeMe"
    />
    <EditUnit
      v-if="dialogs.isEditUnit"
      :dialog="dialogs.isEditUnit"
      :row="oldUnit"
      @closeMe="closeMe"
    />
    <EditPin
      v-if="dialogs.isEditPin"
      :dialog="dialogs.isEditPin"
      :row="oldPin"
      @closeMe="closeMe"
    />
    <EditItem
      v-if="dialogs.isEditItem"
      :dialog="dialogs.isEditItem"
      :row="oldItem"
      @closeMe="closeMe"
    />
    <EditFee
      v-if="dialogs.isEditFee"
      :dialog="dialogs.isEditFee"
      :row="fee"
      @closeMe="closeMe"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import EditCat from "../components/admin/dialogs/EditCat.vue";
import EditUnit from "../components/admin/dialogs/EditUnit.vue";
import EditPin from "../components/admin/dialogs/EditPin.vue";
import EditItem from "../components/admin/dialogs/EditItem.vue";
import EditFee from "../components/admin/dialogs/EditFee.vue";
import _ar from "@/_ar";
import { Item } from "..";
import { deepCopy } from "@/helpers";

export default Vue.extend({
  name: "Admin",

  data: () => ({
    oldCat: undefined as Record<string, string> | undefined,
    oldUnit: undefined as Record<string, string> | undefined,
    oldPin: undefined as Record<string, string> | undefined,
    oldItem: undefined as Record<string, unknown> | undefined,
    dialogs: {
      isEditCat: false,
      isEditUnit: false,
      isEditPin: false,
      isEditItem: false,
      isEditFee: false,
    } as Record<string, boolean>,
  }),

  computed: {
    currentSection() {
      return this.$store.getters["account/currentSection"];
    },
    isEditFee() {
      return this.$store.getters["admin/dialog/editFee"];
    },
    pins() {
      return this.$store.getters["pins"];
    },
    fee() {
      return this.$store.getters["admin/fee"];
    },
    units() {
      return this.$store.getters["admin/units"];
    },
    cats() {
      return this.$store.getters["admin/cats"];
    },
    items(): Item[] {
      return this.$store.getters["admin/items"];
    },
    isShowPins: {
      set(val: boolean) {
        this.$store.dispatch("isShowPins", val);
      },
      get() {
        return this.$store.getters["isShowPins"];
      },
    },
  },
  methods: {
    editCat(cat: Record<string, string> = {}) {
      this.oldCat = deepCopy(cat);
      this.dialogs["isEditCat"] = true;
    },
    editUnit(unit: Record<string, string> = {}) {
      this.oldUnit = deepCopy(unit);
      this.dialogs["isEditUnit"] = true;
    },
    editPin(pin: Record<string, string> = {}) {
      this.oldPin = deepCopy(pin);
      this.dialogs["isEditPin"] = true;
    },
    editItem(item: Record<string, any> = { value: {} }) {
      this.oldItem = deepCopy(item);
      this.dialogs["isEditItem"] = true;
    },
    editFee() {
      this.dialogs["isEditFee"] = true;
    },
    closeMe(dialog: string) {
      this.oldItem = undefined;
      this.dialogs[dialog] = false;
    },
    unit(key: number) {
      for (const u of this.units) {
        if (u.key == key) return u.value;
      }
    },
    arPin(key: any) {
      return _ar[key.split(":")[1]];
    },
  },
  components: {
    EditCat,
    EditUnit,
    EditPin,
    EditItem,
    EditFee,
  },
  mounted() {
    this.$store.dispatch("admin/initial");
  },
  beforeDestroy() {
    this.$store.dispatch("admin/reset");
  },
});
</script>
