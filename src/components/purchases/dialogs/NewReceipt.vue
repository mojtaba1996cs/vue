<template>
  <v-dialog v-model="dialog" max-width="700px" persistent>
    <v-card>
      <v-container>
        <v-card-text>
          <v-row>
            <v-col>
              <v-card outlined>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>الصنف</th>
                      <th class="text-left">الكمية</th>
                      <th class="text-left">السعر</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in items" :key="item.key">
                      <td>{{ item.value.name }}</td>
                      <td class="text-left">
                        {{ item.value.quantity }} {{ item.value.unit }}
                      </td>
                      <td class="text-left">{{ item.value.price }} جنيه</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn class="warning" small @click="save">حفظ</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="secondary lighten-3" small @click="closeMe">رجوع</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Item } from '@/index';
import Vue from 'vue';
export default Vue.extend({
  data: () => ({}),
  computed: {
    items(): Item[] {
      return this.$store.getters['purchases/receiptItems'];
    },
    dialog() {
      return this.$store.getters['purchases/dialog/newReceipt'];
    },
  },
  methods: {
    save() {
      this.$store.dispatch('purchases/saveReceipt').then(() => this.closeMe());
    },
    closeMe() {
      this.$store.dispatch('purchases/dialog/newReceipt');
    },
  },
});
</script>

<style></style>
