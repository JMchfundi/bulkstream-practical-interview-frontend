<script>
import { userService } from '@/api/user.service';
import axios from 'axios';
/**
 * Transactions component
 */
export default {
  data() {
    return {
      formdetails: []
    };
  },
  mounted() {
    // Set the initial number of items
    var user = JSON.parse(localStorage.getItem("user"));
    axios.get(userService.API_URL+"get_user?email=" + user.email).then(response => {
      this.formdetails = response.data
    })
  },
};
</script>
<template>
  <div class="main">
    <!-- Employment and Income section -->
    <div class="d-flex align-items-center justify-content-center mt-4 border-bottom">
      <h4 class="text-capitalize font-weight-light d-flex">
        <span class="d-flex">
          <i class="ri-briefcase-4-fill mr-1"></i></span>
        employment and income
      </h4>
    </div>

    <!-- Employment & Income range details-->
    <div class="mt-1">
      <ul class="list-unstyled p-details">
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">income range:</span>
          <span class="text-capitalize text-muted">{{ formdetails.employment_Details.income_range }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">current occupation:</span>
          <span class="text-capitalize text-muted">{{ formdetails.employment_Details.occupation_qualification }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">employment status:</span>
          <span class="text-capitalize text-muted">{{ formdetails.employment_Details.employement_status }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">income stream:</span>
          <span class="text-capitalize text-muted">{{ formdetails.employment_Details.describe_income }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">time in current employment:</span>
          <span class="text-capitalize text-muted">{{ formdetails.employment_Details.employement_period }}
          </span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">employer:</span>
          <span class="text-capitalize text-muted">{{ formdetails.employment_Details.current_employer_category }}
          </span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">employer number:</span>
          <span class="text-capitalize text-muted">{{ formdetails.employment_Details.employment_number }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>