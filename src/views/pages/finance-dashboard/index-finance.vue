<style>
.card-circle {
  height: 15em;
  width: 15em;
}
.sub{
  border-bottom-right-radius: 25rem;
  border-bottom-left-radius: 25rem;
}

@media screen and (max-width: 800px) {
  .dashboard_col {
    display: flex;
    align-items: center;
    justify-content: center;

  }
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";

export default {
  components: {
    PageHeader,
    Layout,

  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Finance Dashboard',
          active: true
        },

      ],
      statData: [
        {
          title: "Registered customers",
          icon: "ri-group-line",
          value: "200",
          subtitle: "View report",
          sub_icon: "ri-check-double-line",
          colors: "#43707D",
        },
        {
          title: "Running active loans",
          icon: "ri-timer-line",
          value: "1400",
          subtitle: "View report",
          sub_icon: "ri-eye-line",

        },
        {
          title: "Total over dues",
          icon: "ri-funds-line",
          value: "54",
          subtitle: "View report",
          sub_icon: "ri-check-double-line"
        },
        {
          title: "Total disbursed loans",
          icon: "ri-exchange-funds-line",
          value: "1,109",
          subtitle: "View report",
          sub_icon: "ri-eye-line"
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
      <div class="row">
        <!-- <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0 rounded-circle card-circle">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-4 pb-2 d-flex align-items-center">
                  <div class="col-md-4 no-gutters mt-3">
                    <i class="ri-group-line user_icon" style="font-size: 4em; color: #4A2A6B;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0">
                    <div class="float-right">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">200</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">Registered customers </h6>
                    </div>
                  </div>
                </div>
                <div class="border-top">
                  <p class="mt-1" style="color: #ADEFD1;">View Report<span><i class="ri-check-double-line float-right"></i></span></p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0 rounded-circle card-circle">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-4 pb-2 d-flex align-items-center">
                  <div class="col-md-4 mt-3 no-gutters">
                    <i class="ri-timer-line user_icon" style="font-size: 4em; color: #FFD662;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0 ">
                    <div class="float-right">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">1400</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">Running active loans</h6>
                    </div>
                  </div>
                </div>
                <div class="border-top">
                  <p class="mt-1 text-primary">View Report<span><i class="ri-eye-line float-right"></i></span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0 rounded-circle card-circle">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-4 pb-2 d-flex align-items-center">
                  <div class="col-md-4 mt-3 no-gutters">
                    <i class="ri-funds-line user_icon" style="font-size: 4em; color: #004481;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0">
                    <div class="float-right">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">54</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">No. of loans in Arrears</h6>
                    </div>
                  </div>
                </div>
                <div class="border-top">
                  <p class="mt-1 text-warning">View Report<span><i
                        class="ri-check-double-line float-right"></i></span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col">
          <a href="#">
            <div class="card pt-0 pb-0 rounded-circle card-circle">
              <div class="card-body pt-0 pb-0">
                <div class="row pt-4 pb-2 d-flex align-items-center">
                  <div class="col-md-4 mt-3 no-gutters">
                    <i class="ri-exchange-funds-line user_icon" style="font-size: 4em; color: #4A2A6B;"></i>
                  </div>
                  <div class="col-md-8 no-gutters pl-0 pr-0">
                    <div class="float-right">
                      <p class="text-truncate mb-0 pb-1 font-size-24" style="color: #43707D;">1,109</p>
                      <h6 class="mb-0 font-weight-lighter font-size-12">No. of disbursed loans</h6>
                    </div>
                  </div>
                </div>
                <div class="border-top">
                  <p class="mt-1 text-success">Vew Report<span>
                    <i class="ri-eye-line float-right"></i></span>
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div> -->
        <div class="col dashboard_col" v-for="(data, index) in statData" :key="index">
          <div class="card rounded-circle card-circle">
            <div class="card-body mt-4 mb-0">
              <div class="media rounded-top mt-1">
                <!-- <div class="mr-2" :color="`${data.colors}`">
                  <i :class="`${data.icon} `"  style="font-size: 4em"></i>
                </div> -->
                <div class="media-body overflow-hidden">
                  <p class=" font-size-14">{{ data.title }}</p>
                  <h4 class="">{{ data.value }}</h4>
                </div>
                <div class="mr-2" :color="`${data.colors}`">
                  <i :class="`${data.icon} `"  style="font-size: 4em"></i>
                </div>
              </div>
            </div>
            <div class="card-body border-top d-flex justify-content-center mb-3 sub mr-3 ml-3">
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