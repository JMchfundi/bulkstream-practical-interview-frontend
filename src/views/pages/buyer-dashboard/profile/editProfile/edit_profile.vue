<style>
* {
  box-sizing: border-box;
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
option,
.choose-file {
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
import Layout from "../../../../layouts/main";
import PageHeader from "@/components/page-header";
import Citizen_info from "../editProfile/citizen_category";
import Personal_info from "../editProfile/personal_info";
import Family_and_residence from "../editProfile/family_&_residence";
import Next_of_kin from "../editProfile/next_of_kin.vue";
import Employment_and_income from "../editProfile/emp_&_income";
import Home_ownership from "../editProfile/home_ownership.vue";


/**
 * Form validation component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Citizen_info,
    Personal_info,
    Family_and_residence,
    Next_of_kin,
    Employment_and_income,
    Home_ownership
  },
  data() {
    return {
      title: "My Profile",
      items: [
        {
          text: "Africana",

        },
        {
          text: "Edit Profile",
          active: true
        }
      ],
    };
  },
};
</script>
<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <hr class="mt-0">
    <div class="row no-gutters">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <hr class="mt-0">
            <div class="card-title d-flex align-items-center"
              style="background-color: rgb(220, 236, 241); height: 4em;">
              <h4 id="d-flex profile-title" class="d-flex align-items-center pl-3 text-dark">
                <span class="d-flex">
                  <i class="ri-edit-2-fill mr-1"></i></span>
                Edit Profile
              </h4>
            </div>
            <!-- Personal Info -->
            <b-card no-body class="mb-1 border-3 border-top border-success">
              <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                <h6 class="m-0 text-uppercase d-flex">
                  <a v-b-toggle.accordion-2
                    class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                    href="javascript: void(0);">
                    Personal Information
                    <span class="text-right"><i class="ri-profile-fill p-icon"></i></span>
                  </a>
                </h6>
              </b-card-header>
              <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                <b-card-body>
                  <!-- Personal details imported -->
                  <Personal_info></Personal_info>
                </b-card-body>
              </b-collapse>
            </b-card>

            <div role="tablist">
              <b-card no-body class="mb-1 border-3 border-top border-success">
                <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                  <h6 class="m-0 text-uppercase d-flex">
                    <a v-b-toggle.accordion-1
                      class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                      href="javascript: void(0);">
                      Citizen Categorization
                      <span class="text-right"><i class="ri-file-list-fill p-icon"></i></span>
                    </a>
                  </h6>
                </b-card-header>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                  <b-card-body>
                    <!-- Citizen category details imported -->
                    <Citizen_info></Citizen_info>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <!-- End citizen categorization -->

              <!-- Family & residence -->
              <b-card no-body class="mb-1 border-3 border-top border-success">
                <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                  <h6 class="m-0 text-uppercase d-flex">
                    <a v-b-toggle.accordion-3
                      class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                      href="javascript: void(0);">
                      Family & Residence
                      <span class="text-right"><i class="ri-parent-fill p-icon"></i></span>
                    </a>
                  </h6>
                </b-card-header>
                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                  <b-card-body>
                    <!-- Family & residence details imported -->
                    <Family_and_residence></Family_and_residence>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- Next of Kins -->
              <b-card no-body class="mb-1 border-3 border-top border-success">
                <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                  <h6 class="m-0 text-uppercase d-flex">
                    <a v-b-toggle.accordion-4
                      class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                      href="javascript: void(0);">
                      Next Of Kin
                      <span class="text-right"><i class="ri-user-heart-fill p-icon"></i></span>
                    </a>
                  </h6>
                </b-card-header>
                <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                  <b-card-body>
                    <!-- Next of Kin details imported -->
                    <Next_of_kin></Next_of_kin>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- Employment And Income -->
              <b-card no-body class="mb-1 border-3 border-top border-success">
                <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                  <h6 class="m-0 text-uppercase d-flex">
                    <a v-b-toggle.accordion-5
                      class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                      href="javascript: void(0);">
                      Employment & Income
                      <span class="text-right"><i class="ri-medal-fill p-icon"></i></span>
                    </a>
                  </h6>
                </b-card-header>
                <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                  <b-card-body>
                    <!-- Employment and Income details imported -->
                    <Employment_and_income></Employment_and_income>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <!-- Home ownership preference -->
              <b-card no-body class="mb-1 border-3 border-top border-success">
                <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
                  <h6 class="m-0 text-uppercase d-flex">
                    <a v-b-toggle.accordion-6
                      class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
                      href="javascript: void(0);">
                      Home Ownership Preference
                      <span class="text-right"><i class="ri-home-heart-fill p-icon"></i></span>
                    </a>
                  </h6>
                </b-card-header>
                <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel" class="accordion-button ">
                  <b-card-body>
                    <!-- Home ownership preferences details imported -->
                    <Home_ownership></Home_ownership>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex justify-content-end">
              <router-link to="/kaufer/profile" custom v-slot="{ navigate }">
                <button @click="navigate"
                  class="text-uppercase btn btn-success btn-sm d-flex align-items-center mb-3 mr-5"><i
                    class="ri-arrow-up-fill pr-1"></i>Update info</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>