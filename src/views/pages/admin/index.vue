<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";

import Stat from "./Grid1TodayUpdates";
// import RevenueAnalytics from "./Grid2SummaryOverview";
import SalesAnalytics from "./Grid3OLBDoughnut";
import EarningReport from "./Grid4DisbursementHistory";
// import Sources from "./sources";
// import RecentActivity from "./recent-activity";
// import RevenueLocation from "./revenue-location";
// import Chat from "./chat";
import Transaction from './Grid5LoanAgingTable';
// import Buyers_Table from "@/views/pages/dev-dashboard/sys_users.vue"

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Stat,
    // RevenueAnalytics,
    SalesAnalytics,
    EarningReport,
    // Sources,
    // RecentActivity,
    // RevenueLocation,
    // Chat,
    Transaction
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Finsis"
        },
        {
          text: "",
          active: true
        }
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <hr class="mt-0">
    <div class="row">
      <div class="col-xl-12">
        <Stat />
      </div>
      <div class="col-xl-12">
        <SalesAnalytics />
        <EarningReport />
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-lg-4">
        <Chat />
      </div> -->
        <Transaction class="col"></Transaction>
    </div>
  </Layout>
</template>