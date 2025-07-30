<style>
.p-icon {
  font-size: 25px;
}
</style>
<script >
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
import Group from "../../components/tables/group.vue";
import Clients from "../../components/tables/clients.vue";
import Loans from "../../components/tables/loans.vue";
import Officers from "../../components/tables/officers.vue";
import Stations from "../../components/tables/stations.vue";
import ApprovalBenchmark from "../../components/tables/approvalbenchmark.vue";
import Approvedloans from "../../components/tables/approvedloans.vue";
import ActivityLogsView from "../../components/tables/ActivityLogsView.vue";
import UnassignedUnitsForm from "../../components/tables/UnassignedUnitsForm.vue";
import ItemList from "../../components/tables/ItemList.vue";


export default {
  components: {
    PageHeader,
    Layout,
    Group,
    Clients,
    Loans,
    Officers,
    Stations,
    ApprovalBenchmark,
    Approvedloans,
    ActivityLogsView,
    UnassignedUnitsForm,
    ItemList
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
      <Group v-if="this.clickedmenu == 'Groups / Centres'"></Group>
      <!-- <Newgrpform v-if="this.clickedmenu == 'New Group'"></Newgrpform> -->
      <Clients v-if="this.clickedmenu == 'Clients'"></Clients>
      <Loans v-if="this.clickedmenu == 'Loans'"></Loans>
      <Officers v-if="this.clickedmenu == 'Officers'"></Officers>
      <Stations v-if="this.clickedmenu == 'Stations'"></Stations>
      <ApprovalBenchmark v-if="this.clickedmenu == 'Approval Benchmark'"></ApprovalBenchmark>
      <Approvedloans v-if="this.clickedmenu == 'Disbursements'"></Approvedloans>
      <ActivityLogsView v-if="this.clickedmenu == 'Activity Logs'"></ActivityLogsView>
      <UnassignedUnitsForm v-if="this.clickedmenu == 'Update Serials'"></UnassignedUnitsForm>
      <ItemList v-if="this.clickedmenu == 'Item List'"></ItemList>
    </div>
  </Layout>
</template>