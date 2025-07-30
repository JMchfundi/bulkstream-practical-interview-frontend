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
  <!-- Family and residence section container-->
  <div class="mt-5">
    <div class="d-flex align-items-center justify-content-center mt-3 border-bottom">
      <h4 class="text-capitalize font-weight-light d-flex"> 
        <span class="d-flex"><i
            class="ri-team-fill mr-1"></i></span>Family and residence</h4>
    </div>
    <!-- family and residence details -->
    <div class="mt-2">
      <ul class="list-unstyled p-details">
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">number of dependants:</span>
          <span class="text-capitalize text-muted">{{ formdetails.residence.children }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">current residence:</span>
          <span class="text-capitalize text-muted">{{ formdetails.residence.current_residence }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">living with family?:</span>
          <span class="text-capitalize text-muted">{{ formdetails.residence.live_with_family }}</span>
        </li>
        <li class="d-flex align-items-center justify-content-start">
          <span class="mr-1 text-inf">current rent amount:</span>
          <span class="text-capitalize text-muted">{{ formdetails.residence.rental }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>