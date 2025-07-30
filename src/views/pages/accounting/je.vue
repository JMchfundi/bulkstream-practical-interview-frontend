<style>

</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
// import B_table from "../admin-dashboard/b_table.vue";
import Buyers_Table from "@/views/pages/dev-dashboard/sys_users.vue"


export default {
  components: {
    PageHeader,
    Layout,
    // B_table,
    Buyers_Table

  },
  data() {
    return {
      title: 'Accounting',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Accounting',
          active: true
        },

      ],

    }
  }
}
</script>
<template>
  <Layout>
    <div class="main-container">
      <PageHeader :title="title" :items="items" />
      <hr class="mt-0">
      <div class="card">
        <div class="card-body">
          <hr class="mt-0">
          <div class="row no-gutters sup-docs d-flex align-items-center" style="background-color: rgb(220, 236, 241); height: 
          5em;">
            <div class="col-lg-8">
              <div class="d-flex justify-content-start">
                <div class="">
                  <h3 class="font-weight-bold d-flex align-items-center ml-2">
                    <span class="font-size-24 d-flex">
                      <i class="ri-file-list-line mr-1"></i>
                    </span>Journal Entries
                  </h3>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-for-button">
              <div class="d-flex justify-content-end mr-3">
                  <button @click="$router.push('/Xingzheng/addProject')" class="btn text-uppercase btn-sm btn-primary d-flex btn-upld"><i class="ri-add-circle-fill d-flex align-items-center mr-1 "></i>Add JE</button>
              </div>
              
            </div>
          </div>
          <div class="row">
            <div class="col">
              <Buyers_Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout></template>