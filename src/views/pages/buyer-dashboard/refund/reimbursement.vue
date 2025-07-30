<style>
thead {
  line-height: 0.8em;
}

.refund-title {
  width: 25em;
}

.reimburse-btn {
  width: 12em;
}

.sup-docs {
  /* background-color: rgba(182, 174, 174, 0.1); */
  height: 5em;
}

@media all and (max-width:30em) {
  a.buttons {
    display: block;
    margin: 0.2em auto;
  }
}

@media all and (max-width:30em) {
  .main-container {
    max-height: fit-content;
  }

  .col-for-buttons {
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
import Refund_tab from "../refund/b_table"
import swal from "sweetalert";

export default {
  components: {
    PageHeader,
    Layout,
    Refund_tab
  },
  data() {
    return {
      title: 'Requests',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Refund requests',
          active: true
        },

      ],

    }
  },
  methods: {
    linkedhere(){
      swal({
          icon: "success",
          text: "Awaiting Gateway Integration",
          timer: 1500,
          buttons: false,
        });
    },
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
          <div class="row no-gutters sup-docs d-flex align-items-center justify-content-center"
            style="background-color: rgb(220, 236, 241); height: 5em;">
            <div class="col-lg-8">
              <div class="d-flex justify-content-start">
                <h4 class="text-uppercase font-weight-bold d-flex align-items-center ml-2">
                  <span class="d-flex font-size-24">
                    <i class="ri-refund-line mr-1"></i>
                  </span>refund requests
                </h4>
              </div>
            </div>
            <div class="col-lg-4 col-for-button">
              <div class="d-flex justify-content-end div-button ml-4 mr-3">
                <button @click="linkedhere"
                  class="btn btn-sm reimburse-btn text-uppercase btn-success d-flex align-items-center justify-content-center"><i
                    class="ri-add-circle-fill d-flex align-items-center mr-1"></i>request refund</button>
              </div>
            </div>
          </div>
          <div class="row no-gutters">
            <div class="col">
              <Refund_tab></Refund_tab>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>

</template>