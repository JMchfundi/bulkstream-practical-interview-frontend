<template>
  <div>
    <b-button type="button submit"  class="btn btn-sm btn-success d-flex align-items-center" 
      v-on:click="API">
      <i class="ri-save-fill mr-1"></i>
      <span v-show="!loading"> SAVE & CONTINUE </span>
      <!-- IF YOU ARE USING VUE BOOTSTRAP USE <b-spinner label="Loading..."></b-spinner> -->

      <div v-show="loading" role="status">
        <b-spinner small type="grow"></b-spinner>
        <span class="sr-only">Loading...</span>
      </div>
    </b-button>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      data: null,
    };
  },
  methods: {
    API() {
      //PREVENT MULTIPLE CLICKS FROM TRIGGERING MULTIPLE TIMES WHILE LOADING IS ALREADY IN PROGRESS
      // if (this.clicked && !this.status)
      //   return

      // this.clicked = true

      if (this.loading) return;
      this.loading = true;
      //USE SET TIME OUT TO SET DRAMATIC DELAY - NOT NEEDED
      setTimeout(() => {
        //MAKE REQUEST
        axios
          .get("")
          .then(({ data }) => {
            //WHEN LOADING IS COMPLETE STOP LOADING ANIMATION
            this.loading = false;
            this.data = data;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }, 5000);
    },
  },
};
</script>
  
<style >
</style>