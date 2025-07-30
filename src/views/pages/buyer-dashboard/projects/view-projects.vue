<style scoped>
.sup-docs {
  height: 5em;
}

.btn-upld {
  width: 13em;
}

thead {
  line-height: 0.8em;
}
@media all and (max-width:30em) {
  .main-container {
    max-height: fit-content;
  }

  .col-for-button {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3em;
   

  }

  /* .table-responsive {
    z-index: 1;
    margin-top: 1.4em;
  } */
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "../../../layouts/main";
import P_table from "../../../../components/tables/projects_table"

export default {
  components: {
    PageHeader,
    Layout,
    P_table

  },
  data() {
    return {
      title: 'View Projects',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Projects',
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
                  <h4 class="text-uppercase font-weight-bold d-flex align-items-center ml-2">
                    <span class="font-size-24 d-flex">
                      <i class="ri-file-list-line mr-1"></i>
                    </span>All projects
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <P_table/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>