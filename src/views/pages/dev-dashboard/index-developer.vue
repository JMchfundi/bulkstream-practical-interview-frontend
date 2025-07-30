<style>
.card-radius{
  border-radius: 1em;
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
// import Operations from "../buyer-dashboard/buyer-operations"

export default {
  components: {
    PageHeader,
    Layout,
    // Operations
  },
  data() {
    return {
      title: 'Developer',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Dashboard',
          active: true
        },

      ],
      statData: [
        {
          title: "Running projects",
          icon: "ri-building-4-line",
          value: "379",
          subtitle: "Add New",
          sub_icon: "ri-add-circle-line",
          colors: "#43707D",
        },
        {
          title: "New Added Projects",
          icon: "ri-medal-line",
          value: "343",
          subtitle: "Go View",
          sub_icon: "ri-arrow-right-circle-line",

        },
        {
          title: "Number of Orders",
          icon: "ri-list-ordered",
          value: "100",
          subtitle: "Filter By Most Rated",
          sub_icon: "ri-filter-3-line"
        },
        {
          title: "Target Achieved",
          icon: "ri-sort-asc",
          value: "75%",
          subtitle: "Set New Target",
          sub_icon: "ri-calendar-check-line"
        }

      ]

    }
  }
}
</script>
<template>
  <Layout>
    <div class="main">
      <PageHeader :title="title" :items="items" />
      <hr class="mt-0">
      <div class="row ">
        <div class="col" v-for="(data, index) in statData" :key="index">
          <div class="card card-radius">
            <div class="card-body pb-0">
              <div class="media">
                <!-- <div class="mr-2" :color="`${data.colors}`">
                  <i :class="`${data.icon} `"  style="font-size: 4em"></i>
                </div> -->
                <div class="media-body overflow-hidden p-0">
                  <p class="text-truncate font-size-14">{{ data.title }}</p>
                  <h4 class="mb-0">{{ data.value }}</h4>
                </div>
                <div class="mr-2" :color="`${data.colors}`">
                  <i :class="`${data.icon} `"  style="font-size: 4em"></i>
                </div>
              </div>
            </div>
            <div class="card-body border-top py-2">
              <div class="text-truncate">
                <span class="badge badge-soft-success">
                  <i class="" :class="`${data.sub_icon}`"></i>
                  <!-- {{data.subvalue}} -->
                </span>
                <span class="text-muted ml-2">{{ data.subtitle }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>