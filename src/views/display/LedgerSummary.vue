<style>
.p-icon {
  font-size: 25px;
}
</style>
<script >
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
import LedgerSummary from "@/components/tables/LedgerSummary.vue";

export default {
  components: {
    PageHeader,
    Layout,
    LedgerSummary,
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
      <!-- <Group v-if="this.clickedmenu == 'Groups / Centres'"></Group> -->
       <LedgerSummary></LedgerSummary>
    </div>
  </Layout>
</template>