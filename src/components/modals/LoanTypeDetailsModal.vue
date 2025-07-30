<template>
  <b-modal
    :visible="value"
    @hide="$emit('input', false)"
    title="Product Details"
    size="lg"
    centered
  >
    <b-container fluid>
      <b-row>
        <b-col md="6"><strong>Name:</strong> {{ loanType.name }}</b-col>
        <b-col md="6"><strong>Max Term:</strong> {{ loanType.maxTerm }} {{ loanType.termUnit }}</b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <strong>Description:</strong> {{ loanType.description || '—' }}
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col md="6">
          <strong>Classification:</strong> {{ loanType.classification || '—' }}
        </b-col>
        <b-col md="6">
          <strong>Category ID:</strong> {{ loanType.productCategoryId || '—' }}
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col md="6"><strong>Min Amount:</strong> {{ formatAmount(loanType.minAmount) }}</b-col>
        <b-col md="6"><strong>Max Amount:</strong> {{ formatAmount(loanType.maxAmount) }}</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col>
          <h5 class="text-primary mb-2">Custom Charges / Attributes</h5>
          <b-table
            small
            hover
            :items="formattedCustomAttributes" :fields="attributeFields"
            :empty-text="'No custom attributes found.'"
          >
            <template #cell(value)="data">
              {{ formatAmount(data.item.value) }}<span v-if="data.item.valueType === '%'">%</span>
            </template>
            <template #cell(chargeType)="data">
              {{ data.item.chargeType }}
              <span v-if="data.item.chargeType === 'One-Time' && data.item.oneTimeTiming === 'Immediately'"
                    class="badge bg-info ms-1">Immediately</span>
              <span v-if="data.item.chargeType === 'One-Time' && data.item.oneTimeTiming === 'After Period'"
                    class="badge bg-info ms-1">After {{ data.item.oneTimePeriodValue }} {{ data.item.oneTimePeriodUnit }}</span>
              <span v-if="data.item.chargeType === 'Periodically'"
                    class="badge bg-info ms-1">Every {{ data.item.oneTimePeriodValue }} {{ data.item.oneTimePeriodUnit }}</span>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>

    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <b-button variant="primary" @click="editLoanType">
          <i class="bi bi-pencil-square me-2"></i>Edit Product Definition
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "LoanTypeDetailsModal",
  props: {
    value: { type: Boolean, required: true },
    loanType: {
      type: Object,
      default: () => ({
        // Ensure all properties used in the template are defaulted to prevent errors
        name: '',
        maxTerm: null,
        termUnit: 'Weeks',
        description: '',
        classification: 'Cash',
        productCategoryId: null,
        minAmount: null,
        maxAmount: null,
        customAttributes: [],
        id: null // Ensure ID is part of default if it might be missing
      })
    }
  },
  data() {
    return {
      attributeFields: [
        { key: "name", label: "Attribute Name" },
        { key: "chargeType", label: "Charge Type" },
        { key: "value", label: "Value" },
        // { key: "oneTimeTiming", label: "Timing" }, // Combined into chargeType display
        // { key: "oneTimePeriodValue", label: "Period Value" }, // Combined into chargeType display
        // { key: "oneTimePeriodUnit", label: "Period Unit" } // Combined into chargeType display
      ]
    };
  },
  computed: {
    // Computed property to format custom attributes for display, especially the value
    formattedCustomAttributes() {
      return this.loanType.customAttributes.map(attr => ({
        ...attr,
        // The `value` cell template now handles the '%' sign based on `valueType`
        // We no longer need a `percentage` boolean, `valueType` is sufficient.
        // Also, ensuring 'Periodically' is displayed correctly.
      }));
    }
  },
  methods: {
    formatAmount(val) {
      if (val == null || val === '') return "—"; // Handle empty string from inputs
      return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2 });
    },
    editLoanType() {
      this.$emit('input', false); // Hide the modal first

      if (this.loanType && this.loanType.id) {
        // IMPORTANT: Change 'loanTypeId' to 'id' to match the LoanTypeForm's expected parameter
        this.$router.push({
          name: 'Entry', // Assuming 'Entry' is the route name for your form
          params: { id: this.loanType.id }, // <--- Changed from loanTypeId to id
          query: { menu: 'New Product Definition' }
        });
      } else {
        console.warn("No loan type ID provided for edit. Navigating to new form.");
        this.$router.push({ name: 'Entry', query: { menu: 'New Product Definition' } });
      }
    }
  }
};
</script>