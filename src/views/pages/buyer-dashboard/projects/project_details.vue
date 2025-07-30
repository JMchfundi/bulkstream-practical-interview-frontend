<script>
import PageHeader from "@/components/page-header";
import Layout from "../../../layouts/main";
import Details from "../../buyer-dashboard/projects/details"

export default {
  components: {
    PageHeader,
    Layout,
    Details
  },
  data() {
    return {
      title: 'Project details',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Project Details',
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
      <div class="row no-gutters">
        <div class="col-12">
          <Details></Details>
        </div>
      </div>
    </div>
  </Layout>
</template>