<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
import B_Table from "../agent-dashboard/b_table";

export default {
  components: {
    PageHeader,
    Layout,
    B_Table
  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'View Projects',
          active: true
        },

      ],

    }
  }
}
</script>
<template>
  <Layout>
    <div>
      <PageHeader :title="title" :items="items" />
      <div class="row">
        <div class="col">
          <B_Table/>
        </div>
      </div>
    </div>
  </Layout>
</template>