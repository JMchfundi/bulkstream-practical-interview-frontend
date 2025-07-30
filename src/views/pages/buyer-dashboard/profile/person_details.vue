
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
  <!-- Container for personal details section-->
  <div class="">
    <div class="d-flex align-items-center justify-content-center mt-4  border-bottom">
      <h4 class="text-capitalize font-weight-light d-flex">
        <span class="d-flex"><i
            class="ri-account-pin-circle-fill mr-1"></i></span>Personal details</h4>
    </div>
    <!-- Personal details -->
    <div class="mt-2">
      <ul class="list-unstyled p-details">
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">first name:</span>
          <span class="text-capitalize text-muted">{{ formdetails.username }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">date of birth:</span>
          <span class="text-capitalize text-muted">{{ formdetails.personal_Info.dob | luxon}}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">id Number:</span>
          <span class="text-capitalize text-muted">{{ formdetails.personal_Info.id_number }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">marital status:</span>
          <span class="text-capitalize text-muted">{{ formdetails.personal_Info.marital_status }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">kra pin #:</span>
          <span class="text-capitalize text-muted"> {{ formdetails.personal_Info.kra_pin }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">phone number:</span>
          <span class="text-capitalize text-muted">{{ formdetails.personal_Info.phone_number }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">email address:</span>
          <span class="text-lower text-muted">{{ formdetails.personal_Info.email }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">residence:</span>
          <span class="text-capitalize text-muted">{{ formdetails.personal_Info.residence }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>