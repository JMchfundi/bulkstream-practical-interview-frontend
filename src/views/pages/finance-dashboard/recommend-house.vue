<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";
export default {
  components: {
    PageHeader,
    Layout
  },
  data() {
    return {
      title: 'Dashboard',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Recommend house',
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
          
        </div>
      </div>
    </div>
  </Layout>
</template>