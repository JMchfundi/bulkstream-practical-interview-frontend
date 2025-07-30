<style>
* {
  box-sizing: border-box;
}

.choose-file {
  line-height: 1.2em;
}

select,
input {
  /* outline: 1px solid rgb(238, 232, 232); */
  outline: none;
}

label {
  color: #000;
  font-weight: lighter;
}

.div-details,
select,
option,.choose-file {
  font-weight: lighter;
  color: #000;
  font-size: smaller;
}

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
import Layout from "../../../layouts/main_finance";
// import Applicant_Form from "../compliance/applicant-details";
import Applicant_Form from "../../finance-dashboard/compliance/applicant-details";
// import Residential_Form from "../compliance/residential-details";
import Residential_Form from "../../finance-dashboard/compliance/residential-details";
// import Employment_Details from "./employment-details.vue";
import Employment_Details from "../../finance-dashboard/compliance/employment-details";
// import Income_Details from "../compliance/income-details";
import Income_Details from "../../finance-dashboard/compliance/income-details";
// import Dependants from "../compliance/dependants-details"
import Dependants from "../../finance-dashboard/compliance/dependants-details"
// import Property_Details from "../compliance/property-details"
import Property_Details from "../../finance-dashboard/compliance/property-details"
// import Current_Loans from "../compliance/current-loans"
import Current_Loans from "../../finance-dashboard/compliance/current-loans.vue"

export default {
  components: {
    PageHeader,
    Layout,
    Applicant_Form,
    Residential_Form,
    Employment_Details,
    Income_Details,
    Dependants,
    Property_Details,
    Current_Loans

    // Form
  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Compliance',
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
      <div class="row no-gutters">
        <div class="col-12">
          <div class="text-center text-uppercase title-page">
            <h4 class="d-flex align-items-center justify-content-center"><span><i
                  class="ri-qr-scan-2-fill mr-1"></i></span>mortgage compliance</h4>
          </div>
        </div>
        <div class="col-12">
          <div class="card accord-cont">
            <div class="card-body">
              <div role="tablist">
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                    <h6 class="m-0 text-uppercase d-flex">
                      <a v-b-toggle.accordion-1
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Particulars of applicant
                        <span class="text-right text-info"><i class="ri-account-pin-box-fill p-icon"></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                    <b-card-body>
                      <!-- Applicant form imported -->
                      <Applicant_Form></Applicant_Form>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-2
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Residential and contact details
                        <span class="text-right text-info"><i class="ri-contacts-book-fill p-icon"></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Residential form imported -->
                      <Residential_Form></Residential_Form>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-3
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Employment details
                        <span class="text-right text-info"><i class="ri-honour-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Employment Details imported -->
                      <Employment_Details></Employment_Details>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-4
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Income details
                        <span class="text-right text-info"><i class="ri-money-pound-box-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Income Details imported -->
                      <Income_Details></Income_Details>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-5
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Dependants
                        <span class="text-right text-info"><i class="ri-group-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                     <Dependants></Dependants>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-6
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Property details
                        <span class="text-right text-info"><i class="ri-community-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Property details imported -->
                      <Property_Details></Property_Details>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-7
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Current loans
                        <span class="text-right text-info"><i class="ri-funds-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Imported current loans -->
                     <Current_Loans></Current_Loans>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-8
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Current savings
                        <span class="text-right text-info"><i class="ri-hand-coin-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-9
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Mortgage loan details
                        <span class="text-right text-info"><i class="ri-todo-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-10
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Referee details
                        <span class="text-right text-info"><i class="ri-contacts-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-10" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-11
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Applicant declarations
                        <span class="text-right"><i class="text-info ri-quill-pen-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-11" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>