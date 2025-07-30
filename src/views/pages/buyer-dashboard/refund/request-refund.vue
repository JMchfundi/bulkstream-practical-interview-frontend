<style>
* {
  box-sizing: border-box;
}

/* .choose-file {
  line-height: 1.2em;
} */

/* select,
input {
  outline: 1px solid rgb(238, 232, 232);
  outline: none;
} */

/* label {
  color: #000;
  font-weight: lighter;
} */

/* .div-details,
select,
option,
.choose-file {
  font-weight: lighter;
  color: #000;
  font-size: smaller;
} */

.div-details,
select {
  padding: 0.3em 0 0.3em 0.8em;
}

.accordionTitle:before,
.accordion__Heading:before {
  content: "+";
  font-size: 1.5em;
  line-height: 1.3em;
  float: left;
  -webkit-transition: -webkit-transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
}

.p-icon {
  font-size: 25px;
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "../../../layouts/main";
// import Personal_Details from "../refund/personal-details";
import Personal_Details from "../../buyer-dashboard/refund/personal-details";
// import Bank_Details from "../refund/bank-details";
import Bank_Details from "../../buyer-dashboard/refund/bank-details";
// import Signed_Doc from "../refund/sign-document"
import Signed_Doc from "../../buyer-dashboard/refund/sign-document"
export default {
  components: {
    PageHeader,
    Layout,
    Personal_Details,
    Bank_Details,
    Signed_Doc

    // Form
  },
  data() {
    return {
      title: 'Refunds',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Apply refund',
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
      <div class="row ">
        <div class="col">
          <div class="card accord-cont">
            <div class="card-body">
              <hr class="mt-0">
              <div class="row card-title text-uppercase title-page d-flex align-items-center"
                style="background-color: rgb(220, 236, 241); height: 4em;">
                <div class="col-lg-8">
                  <div class="d-flex justify-content-start">
                    <h4 class="text-uppercase font-weight-bold d-flex align-items-center">
                      <span class="d-flex font-size-24"><i class="ri-refund-line mr-1"></i></span>
                      Savings refund request
                    </h4>
                  </div>
                </div>
              </div>
              <div role="tablist">
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                    <h6 class="m-0 text-uppercase d-flex">
                      <a v-b-toggle.accordion-1
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Personal details
                        <span class="text-right"><i class="ri-account-pin-box-fill p-icon"></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                    <b-card-body>
                      <!-- Personal details imported -->
                      <Personal_Details></Personal_Details>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                    <h6 class="m-0 text-uppercase d-flex">
                      <a v-b-toggle.accordion-2
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Bank account details
                        <span class="text-right"><i class="ri-booklet-fill p-icon"></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                    <b-card-body>
                      <!-- Bank Details imported -->
                      <Bank_Details></Bank_Details>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                    <h6 class="m-0 text-uppercase d-flex">
                      <a v-b-toggle.accordion-3
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Signed document upload
                        <span class="text-right"><i class="ri-login-circle-fill p-icon"></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                    <b-card-body>
                      <!-- Bank Details imported -->
                      <Signed_Doc></Signed_Doc>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-end">
                <a class="text-uppercase btn btn-warning btn-sm d-flex align-items-center mb-3 mr-5"><i
                    class="ri-send-plane-fill pr-1"></i>submit request</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>