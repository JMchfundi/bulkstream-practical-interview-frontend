<style>

</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "../../layouts/main";
import Stat from "../admin/widget";
import RevenueAnalytics from "../admin/revenue";
import SalesAnalytics from "../admin/sales-analytics";
import EarningReport from "../admin/earning";
// import Sources from "./sources";
// import RecentActivity from "./recent-activity";
// import RevenueLocation from "./revenue-location";
// import Chat from "./chat";
// import Transaction from '../admin/transaction';



export default {
  components: {
    PageHeader,
    Layout,
    Stat,
    RevenueAnalytics,
    SalesAnalytics,
    EarningReport,
    // Sources,
    // RecentActivity,
    // RevenueLocation,
    // Chat,
    // Transaction
  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Buyer dashboard',
          active: true
        },

      ],

      statData: [
        {
          title: "Completed your",
          icon: "ri-profile-line",
          value: "User Profile?",
          subtitle: "Finish now",
          sub_icon: "ri-edit-2-line",
          // colors: "#43707D",
          link: "/kaufer/edit_profile"
        },
        {
          title: "My savings funds",
          icon: "ri-money-dollar-circle-line",
          value: "0.00",
          subtitle: "Last activity",
          sub_icon: "ri-history-line",
          link: ""
        },
        {
          title: "Monthly contribution",
          icon: "ri-calendar-check-line",
          value: "0.00",
          subtitle: "Last day",
          sub_icon: "ri-calendar-check-line",
          link: ""
        },
        {
          title: "Deposit to account",
          icon: "ri-add-box-line",
          value: "Cash",
          subtitle: "Choose payment option",
          sub_icon: "ri-list-check",
          link: "/kaufer/contribution" //this should be a function that opens the modal for choosing payment options
        }

      ]

    }
  },
}
</script>
<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <hr class="mt-0">
    <div class="row">
      <div class="col-xl-8">
        <Stat />
        <RevenueAnalytics />
      </div>
      <div class="col-xl-4">
        <SalesAnalytics />
        <EarningReport />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <Sources />
      </div>
      <div class="col-lg-4">
        <RecentActivity />
      </div>
      <div class="col-lg-4">
        <RevenueLocation />
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-lg-4">
        <Chat />
      </div> -->
      <!-- <div class="col">
        <Transaction />
      </div> -->
    </div>
  </Layout>
</template>