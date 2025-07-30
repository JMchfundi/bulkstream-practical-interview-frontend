<style>
.p-icon {
  font-size: 25px;
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
import BasicInfo from "../../admin-dashboard/activities/basicInfo";

export default {
  components: {
    PageHeader,
    Layout,
    BasicInfo
    // LocationInfo,
    // ImageProject
  },

  data() {
    return {
      title: 'Activities',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Project',
          active: true
        },

      ],
    };
  },
};
</script>
<template>
  <Layout>
    <div class="main">
      <PageHeader :title="title" :items="items" />
      <hr class="mt-0">
      <div class="row">
        <div class="col">
          <div class="card ">
            <div class="card-body">
              <hr class="mt-0">
              <div class="card-title text-uppercase d-flex align-items-center"
                style="background-color: rgb(220, 236, 241); height: 4em;">
                <h4 class="text-uppercase font-weight-bold d-flex pl-3">
                  <span class="d-flex">
                    <i class="ri-shape-2-fill mr-1"></i></span>add project
                </h4>
              </div>
              <div role="tablist">
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                    <h6 class="m-0 text-uppercase d-flex">
                      <a v-b-toggle.accordion-1
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Basic Information
                        <span class="text-right"><i class="ri-information-fill p-icon"></i></span>
                      </a>
                    </h6>
                    <BasicInfo></BasicInfo>
                  </b-card-header>
                </b-card>

              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 col-for-button">
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>