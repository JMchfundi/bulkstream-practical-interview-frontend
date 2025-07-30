<style scoped>
.sup-docs {
  background-color: rgba(182, 174, 174, 0.1);
  height: 5em;
}

.buttons {
  width: 12em;
  font-size: smaller;
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

thead {
  line-height: 0.8em;
}
</style>

<script>
import PageHeader from "@/components/page-header";
import Layout from "../../../layouts/main";
import Deposits_tab from "../contribution/b_table"
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import swal from "sweetalert";

export default {
  components: {
    PageHeader,
    Layout,
    Deposits_tab,
    StripeCheckout
  },
  data() {
    this.publishableKey = "pk_test_51MPP4uCJhYR3kRWiw9RtHMj6qTfQtaWAK99TMZPAz3bgV9Cz6JbE5l8SXOyqN0CE294RmWwtZD0MscCMLA4eudxr00TybHdlqR";
    return {
      title: 'Contribution',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'My Contribution',
          active: true
        },

      ],

      loading: false,
      lineItems: [
        {
          price: 'price_1MWyGGCJhYR3kRWiij6JtNKw', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'https://ug-africana.azurewebsites.net/kaufer/contribution',
      cancelURL: 'https://ug-africana.azurewebsites.net/kaufer/contribution'
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
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
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
            <div class="col-lg-4">
              <div class="d-flex align-items-center justify-content-start ml-1 mr-4">
                <h4 class="text-uppercase font-weight-bold d-flex align-items-center ml-2">
                  <span class="font-size-24 d-flex">
                    <i class="ri-wallet-3-line mr-1"></i>
                  </span>my contribution
                </h4>
              </div>
            </div>
            <div class="col-lg-8 d-flex align-items-center justify-content-end col-for-buttons ">
              <div class="row no-gutters ">
                <div class="col">
                  <div>
                    <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
                      :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
                    <button @click="linkedhere" class="btn btn-sm text-uppercase btn-success mr-1 d-flex">
                      <span class="d-flex">
                        <i class="ri-add-circle-fill mr-1"></i></span>
                      Save Now!</button>
                  </div>

                </div>
              </div>
              <div class="row no-gutters mr-3">
                <div class="col">
                  <button class="btn btn-sm buttons text-uppercase btn-secondary mr-1 d-flex">
                    <span class="d-flex">
                      <i class="ri-printer-fill mr-1"></i></span>
                    print statement</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <Deposits_tab></Deposits_tab>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>