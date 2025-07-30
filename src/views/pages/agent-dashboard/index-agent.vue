<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";

export default {
  components: { Layout, PageHeader },
  data() {
    return {
      title: 'Agent',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Agent dashboard',
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
        <!-- <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-2 pb-2 d-flex align-items-center">
                  <div class="col-md-4 no-gutters">
                    <i class="ri-building-4-line user_icon" style="font-size: 4em; color: #ff9900;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0">
                    <div class="float-right mr-3">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">379</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">Running Projects</h6>
                    </div>
                  </div>
                </div>
                <div class="border-top">
                  <p class="mt-1 text-info">Add New<span><i class="ri-add-circle-line float-right"></i>
                    </span></p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-2 pb-2 d-flex align-items-center">
                  <div class="col-md-4 no-gutters">
                    <i class="ri-medal-line user_icon" style="font-size: 4em; color: #00ff00;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0 ">
                    <div class="float-right mr-3">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">343</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">New Added projects</h6>
                    </div>
                  </div>
                </div>
                <div class="border-top">
                  <p class="mt-1 text-info">Go View <span><i class="ri-arrow-right-circle-line  float-right"></i></span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-2 pb-2 d-flex align-items-center">
                  <div class="col-md-4 no-gutters">
                    <i class="ri-list-ordered user_icon" style="font-size: 4em; color: #FFD662;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0">
                    <div class="float-right mr-3">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">100</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">Number of Orders</h6>
                    </div>
                  </div>
                </div>
                <div class="border-top">
                  <p class="mt-1 text-info">Filter By Most Rated <span><i
                        class="ri-filter-2-line float-right"></i></span></p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-2 pb-2 d-flex align-items-center">
                  <div class="col-md-4 no-gutters">
                    <i class="ri-sort-asc user_icon" style="font-size: 4em; color: #996633;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0">
                    <div class="float-right mr-3">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">75%</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">Target Achieved</h6>
                    </div>
                  </div>
                </div>
                <div class="border-top ">
                  <p class="mt-1 text-info">Set New Target <span><i
                        class="ri-calendar-check-line float-right"></i></span></p>
                </div>
              </div>
            </div>
          </a>
        </div> -->
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