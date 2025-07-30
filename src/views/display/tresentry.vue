<style>
.p-icon {
  font-size: 25px;
}
</style>
<script >
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
import Receipt from "../../components/entries/receipt.vue";
import ReceiptBatch from "../../components/entries/receiptbatch.vue";
import Clients from "../../components/entries/voucher.vue";

export default {
  components: {
    PageHeader,
    Layout,
    Clients,
    Receipt,
    ReceiptBatch,
    // LocationInfo,
    // ImageProject
  },

  data() {
    return {
      title: localStorage.getItem("clickedmenu"),
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Display',
          active: true
        },
      ],
      clickedmenu: "",
    };
  },
  mounted() {
    this.getClickedMenu();
  },
  methods: {
    getClickedMenu() {
      this.clickedmenu = localStorage.getItem("clickedmenu")
    },
  }
};
</script>
<template>
  <Layout>
    <div class="main">
      <PageHeader :title="title" :items="items" />
      <Receipt v-if="this.clickedmenu == 'Receipt'"></Receipt>
      <ReceiptBatch v-if="this.clickedmenu == 'Receipt Batch'"></ReceiptBatch>
      <!-- <Newgrpform v-if="this.clickedmenu == 'New Group'"></Newgrpform> -->
      <Clients v-if="this.clickedmenu == 'Voucher'"></Clients>
    </div>
  </Layout>
</template>