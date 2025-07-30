<style>
.profile-title{
  background-color: rgba(0, 0, 0, 0.1);
  
}
h5{
  color: #FFA500;
}


h6 {
  font-weight: lighter;
  color: rgb(128, 124, 124);
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "../../../layouts/main";
import VCreditCard from "v-credit-card";
import 'v-credit-card/dist/VCreditCard.css';

export default {
  components: {
    PageHeader,
    Layout,
    VCreditCard
  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Contribute',
          active: true
        },

      ],

    }
  }
}
</script>
<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="d-flex align-items-center justify-content-center">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-center mb-0 profile-title p-2">
            <h5 class="mb-0 text-uppercase">Proceed to make deposit</h5>
          </div>
          <hr class="mt-1 mb-0 pb-1">
          <VCreditCard/>
          <div class="d-flex align-items-center">
            <div class="row">
              <div class="col mr-1">
                <div class="d-flex justify-content-end mr-3">
                <button @click="$router.push('/kaufer/contribute')"
                  class="btn btn-sm w-100 btn-secondary"><i></i>Pay Now</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>