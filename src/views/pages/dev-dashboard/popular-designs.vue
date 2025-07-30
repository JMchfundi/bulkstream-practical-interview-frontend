<style>
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
import B_Table from "../dev-dashboard/b_table";
// import Operations from "../buyer-dashboard/buyer-operations"

export default {
  components: {
    PageHeader,
    Layout,
    B_Table
    // Operations
  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Popular Designs',
          active: true
        },

      ],

    }
  }
}
</script>
<template>
  <Layout>
    <div class="main">
      <PageHeader :title="title" :items="items" />
    </div>
    <div class="row">
      <div class="col">
        <B_Table/>
      </div>
    </div>
  </Layout>
</template>