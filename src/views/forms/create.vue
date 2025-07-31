<template>
  <Layout>
    <div class="main">
      <PageHeader :title="computedTitle" :items="computedItems" />

      <component
        :is="dynamicFormComponent"
        class="col"
        :key="dynamicFormComponentKey"
        :id="editId"
      ></component>

      <div v-if="!dynamicFormComponent" class="text-center py-5 text-muted">
        <p>Select an option from the left menu or use an edit link to get started.</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import PageHeader from "@/components/page-header";
import Layout from "@/views/layouts/main";

// Import all form components
import GroupForm from "../../components/forms/GroupForm.vue";
import ClientForm from "../../components/forms/ClientForm.vue";
import LoanForm from "../../components/forms/LoanForm.vue";
import OfficerForm from "../../components/forms/OfficerForm.vue";
import StationForm from "../../components/forms/StationForm.vue";
import COAForm from "../../components/forms/COAForm.vue";
import LoanTypeForm from "../../components/forms/LoanType.vue";
import GoodsReceiptForm from "../../components/forms/GoodsReceiptForm.vue"; // New: Import GoodsReceiptForm

export default {
  props: {
    formType: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    PageHeader,
    Layout,
    GroupForm,
    ClientForm,
    LoanForm,
    OfficerForm,
    StationForm,
    COAForm,
    LoanTypeForm,
    GoodsReceiptForm, // New: Register GoodsReceiptForm
  },

  data() {
    return {
      // These will now be handled fully by computed properties
      // No need for data properties 'title' and 'items' here directly
    };
  },
  computed: {
    // --- Existing computed properties (unchanged, for form rendering) ---
    dynamicFormComponent() {
      const formMap = {
        'group': 'GroupForm',
        'client': 'ClientForm',
        'loan': 'LoanForm',
        'officer': 'OfficerForm',
        'station': 'StationForm',
        'chart-of-accounts': 'COAForm',
        'loan-product': 'LoanTypeForm',
        'goods-receipt': 'GoodsReceiptForm', // New: Add 'goods-receipt' mapping
      };
      const menuMap = {
        'tabulate': 'GroupForm',
        'New Client': 'ClientForm',
        'history': 'LoanForm',
        'New Officer': 'OfficerForm',
        'New Station': 'StationForm',
        'Chart of Accounts': 'COAForm',
        'New Product Definition': 'LoanTypeForm',
        'Goods Receipt': 'GoodsReceiptForm', // New: Add 'Goods Receipt' mapping
      };

      let componentName = null;
      if (this.formType) {
        componentName = formMap[this.formType.toLowerCase()];
      } else if (this.$route.query.menu) {
        componentName = menuMap[this.$route.query.menu];
      } else {
        componentName = menuMap[localStorage.getItem("clickedmenu")];
      }

      if (componentName && this.$options.components[componentName]) {
        return componentName;
      }
      return null;
    },
    editId() {
      return this.id;
    },
    dynamicFormComponentKey() {
      return `${this.formType || 'new'}-${this.id || 'form'}`;
    },

    // --- NEW / REVISED COMPUTED PROPERTIES FOR HEADER TITLE/ITEMS ---
    computedTitle() {
      let baseTitle = 'Entry'; // Default title

      // 1. Prioritize formType from route params/props
      if (this.formType) {
        baseTitle = this.formType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (this.id) {
          return `Edit ${baseTitle}`;
        } else {
          return `New ${baseTitle}`;
        }
      }
      // 2. Fallback to $route.query.menu
      else if (this.$route.query.menu) {
        baseTitle = this.$route.query.menu;
      }
      // 3. Fallback to localStorage (least reliable as it's not route-driven)
      else if (localStorage.getItem("clickedmenu")) {
        baseTitle = localStorage.getItem("clickedmenu");
      }

      return baseTitle;
    },
    computedItems() {
      // You can make these dynamic too if needed, based on the current context
      return [
        { text: 'Finsis' },
        { text: this.computedTitle, active: true }, // Use the computed title here
      ];
    }
  },
  watch: {
    computedTitle: {
      immediate: true,
      handler(newTitle) {
        // This watches the *output* of the computed title.
        // Only update localStorage if it's derived from menu query or local storage itself,
        // not when it's derived from formType/id which are more specific.
        if (this.$route.query.menu) {
              localStorage.setItem("clickedmenu", this.$route.query.menu);
        } else if (!this.formType && !this.id && newTitle !== 'Entry') { // If no specific type/id and title isn't default
              // This might happen if 'clickedmenu' was the source for the title
              // Re-saving it ensures it's up-to-date
              localStorage.setItem("clickedmenu", newTitle);
        }
      }
    }
  },
  methods: {
    // Removed updateTitle and updateTitleFromMenu methods as their logic is now in computed properties
  },
  created() {
    // No explicit title/item updates needed here anymore, computed properties handle it
  }
};
</script>

<style>
.p-icon {
  font-size: 25px;
}
</style>
