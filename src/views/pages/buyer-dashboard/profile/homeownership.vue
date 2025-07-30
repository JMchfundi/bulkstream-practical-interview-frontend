<script>
import { userService } from '@/api/user.service';
import axios from 'axios';
/**
 * Transactions component
 */
export default {
  data() {
    return {
      formdetails:[]
    };
  },
  mounted() {
    // Set the initial number of items
    var user = JSON.parse(localStorage.getItem("user"));
     axios.get(userService.API_URL+"get_user?email="+user.email).then(response => {
       this.formdetails = response.data
     })
  },
};
</script>
<template>
  <!-- Home ownership container section -->
  <div class="mt-5">
    <div class="d-flex align-items-center justify-content-center mt-3 border-bottom">
      <h4 class="font-weight-light text-capitalize d-flex ">
        <span class="d-flex"><i class="ri-home-gear-fill mr-1"></i></span>Residential preferences
      </h4>
    </div>
    <!-- Home ownership details -->
    <div class="mt-2">
      <ul class="list-unstyled p-details">
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">reason for home ownership:</span>
          <span class="text-capitalize text-muted">{{ formdetails.ownership_Prefference.owning_reason }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">1<sup>st</sup>country of preference: </span>
          <span class="text-capitalize text-muted">{{ formdetails.ownership_Prefference.preffered_country }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">2<sup>nd</sup> county of preference:</span>
          <span class="text-capitalize text-muted">{{ formdetails.ownership_Prefference.preffered_country }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">3<sup>rd</sup> county of preference:</span>
          <span class="text-capitalize text-muted">{{ formdetails.ownership_Prefference.preffered_country }}</span><label for=""></label>
        </li>
      </ul>
    </div>
  </div>
</template>