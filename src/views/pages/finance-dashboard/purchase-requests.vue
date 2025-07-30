<style>

</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
// import B_Table from "../finance-dashboard/b_table";
import Purchase_Requests from "../finance-dashboard/purchase-requests-table"

export default {
  components: {
    PageHeader,
    Layout,
    // B_Table,
    Purchase_Requests
    
  },
  data() {
    return {
      title: 'Requests',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Purchase Requests',
          active: true
        },

      ],

    }
  }
}
</script>
<template>
  <Layout>
    <div class="main">
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
                      <i class="ri-secure-payment-line mr-1"></i>
                    </span>Home purchase requests
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <Purchase_Requests />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>