<style>
* {
  box-sizing: border-box;
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
import Layout from "../../../layouts/main";
import Applicant_Form from "../../buyer-dashboard/compliance/applicant-details";
import Residential_Form from "../../buyer-dashboard/compliance/residential-details";
import Employment_Details from "../../buyer-dashboard/compliance/employment-details";
import Income_Details from "../../buyer-dashboard/compliance/income-details";
import Dependents from "../../buyer-dashboard/compliance/dependants-details"
import Property_Details from "../../buyer-dashboard/compliance/property-details"
import Current_Loans from "../../buyer-dashboard/compliance/current-loans"

export default {
  components: {
    PageHeader,
    Layout,
    Applicant_Form,
    Residential_Form,
    Employment_Details,
    Income_Details,
    Dependents,
    Property_Details,
    Current_Loans

    // Form
  },
  data() {
    return {
      title: 'Compliance',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Check Compliance',
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
      <div class="row">
        <div class="col">
          <div class="card accord-cont">
            <div class="card-body">
              <hr class="mt-0">
              <div class="card-title text-uppercase title-page d-flex align-items-center"
                style="background-color: rgb(220, 236, 241); height: 4em;">
                <h3 class="font-weight-bold d-flex align-items-center pl-3"><span class="d-flex">
                  <i class="ri-qr-scan-2-fill mr-1"></i></span>Check mortgage compliance</h3>
              </div>
              <div role="tablist">
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                    <h6 class="m-0 text-uppercase d-flex">
                      <a v-b-toggle.accordion-1
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Particulars of applicant
                        <span class="text-right"><i class="ri-account-pin-box-fill p-icon"></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                    <b-card-body>
                      <!-- Applicant form imported -->
                      <Applicant_Form/>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-2
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Residential and contact details
                        <span class="text-right"><i class="ri-contacts-book-fill p-icon"></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Residential form imported -->
                      <Residential_Form/>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-3
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Employment details
                        <span class="text-right"><i class="ri-honour-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Employment Details imported -->
                      <Employment_Details/>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-4
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Income details
                        <span class="text-right"><i class="ri-money-pound-box-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Income Details imported -->
                      <Income_Details/>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-5
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Dependents
                        <span class="text-right"><i class="ri-group-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                     <Dependents/>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-6
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Property details
                        <span class="text-right"><i class="ri-community-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Property details imported -->
                      <Property_Details/>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-7
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Current loans
                        <span class="text-right"><i class="ri-funds-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <!-- Imported current loans -->
                     <Current_Loans/>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-8
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Current savings
                        <span class="text-right"><i class="ri-hand-coin-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-9
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Mortgage loan details
                        <span class="text-right"><i class="ri-todo-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-10
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Referee details
                        <span class="text-right"><i class="ri-contacts-fill p-icon "></i></span>
                      </a>
                    </h6>
                  </b-card-header>
                  <b-collapse id="accordion-10" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
                <b-card no-body class="mb-1 border-3 border-top border-success">
                  <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading ">
                    <h6 class="m-0 d-flex text-uppercase">
                      <a v-b-toggle.accordion-11
                        class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                        href="javascript: void(0);">
                        Applicant declarations
                        <span class="text-right"><i class="ri-quill-pen-fill p-icon "></i></span>
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