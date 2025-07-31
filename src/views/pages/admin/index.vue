<script>
import Layout from "@/views/layouts/main";
import PageHeader from "@/components/page-header";

import Calculator from "@/components/forms/GroupForm";

/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Calculator
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Finsis"
        },
        {
          text: "",
          active: true
        }
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <hr class="mt-0">
    <div class="row">
      <div class="col-xl-12">
        <Calculator />
      </div>
    </div>
  </Layout>
</template>