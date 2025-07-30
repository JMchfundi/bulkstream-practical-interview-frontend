<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
import View_Projects from "../finance-dashboard/view-projects-table"

export default {
  components: {
    PageHeader,
    Layout,
    View_Projects
  },
  data() {
    return {
      title: 'View',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Project',
          active: true
        },

      ],

    }
  }
}
</script>
<template>
  <Layout>
    <div>
      <PageHeader :title="title" :items="items" />
      <hr class="mt-0">
      <div class="card mb-1">
        <div class="card-body ">
          <hr class="mt-0">
          <div class="row no-gutters d-flex align-items-center"
            style="background-color: rgb(220, 236, 241); height: 5em;">
            <div class="col-lg-8">
              <div class="d-flex justify-content-start">
                <div class="">
                  <h3 class="font-weight-bold d-flex align-items-center ml-2">
                    <span class="d-flex font-size-24">
                      <i class="ri-eye-line mr-1"></i>
                    </span>View projects for approval
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <View_Projects />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>