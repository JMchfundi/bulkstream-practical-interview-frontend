<template>
  <div class="card">
    <div class="card-body">

      <div class="text-center mb-4">
        <button class="btn btn-warning" @click="autoPopulate">
          <i class="bi bi-lightning-fill me-2"></i>Auto-Populate for Demo
        </button>
      </div>

      <form @submit.prevent="submitForm" novalidate>
        <div class="row g-3">
          <div class="col-md-6">
            <label for="clientSearch" class="form-label">Client Name or ID <span class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input type="text" id="clientSearch" list="client-suggestions" class="form-control"
                v-model="clientSearchTerm" @input="filterClients" @change="selectClientFromSearch"
                :class="{ 'is-invalid': formTouched && errors.idNumber }" placeholder="Search by name or ID"
                autocomplete="off" />
              <datalist id="client-suggestions">
                <option v-for="client in filteredClients" :key="client.id"
                  :value="`${client.fullName} (${client.idNumber})`"></option>
              </datalist>
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.idNumber">{{ errors.idNumber }}</div>
          </div>

          <div class="col-md-6">
            <label for="loanClassification" class="form-label">Loan Classification <span
                class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-tag"></i></span>
              <select id="loanClassification" v-model="selectedLoanClassification" class="form-control"
                :class="{ 'is-invalid': formTouched && errors.loanClassification }">
                <option disabled value="">Select Classification</option>
                <option value="Cash">Cash</option>
                <option value="Product">Product</option>
              </select>
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.loanClassification">{{
              errors.loanClassification }}</div>
          </div>

          <div class="col-md-6">
            <label for="loanType" class="form-label">Loan Type <span class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-bank"></i></span>
              <select id="loanType" v-model.number="loan.loanTypeId" class="form-control"
                :class="{ 'is-invalid': formTouched && errors.loanTypeId }" :disabled="!selectedLoanClassification">
                <option disabled value="">Select Loan Type</option>
                <option v-for="type in filteredLoanTypes" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.loanTypeId">{{ errors.loanTypeId }}
            </div>
          </div>

          <div v-if="selectedLoanType?.classification === 'Cash'" class="col-md-6">
            <label for="principalAmount" class="form-label">Principal Amount <span class="text-danger">*</span></label>
            <div class="principal-amount-control">
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-cash-coin"></i></span>
                <input type="number" id="principalAmount" class="form-control"
                  v-model.number="loan.principalAmount"
                  :min="currentMinLoanAmount" :max="currentMaxLoanAmount" :step="principalStep"
                  :class="{ 'is-invalid': formTouched && errors.principalAmount }"
                  @input="handlePrincipalAmountInput"
                  @blur="handlePrincipalAmountBlur" /> </div>
              <input type="range" class="form-range principal-range-slider" v-model.number="loan.principalAmount"
                :min="currentMinLoanAmount" :max="currentMaxLoanAmount" :step="principalStep"
                :class="{ 'is-invalid': formTouched && errors.principalAmount }" />
              <div class="d-flex justify-content-between range-labels">
                <span>{{ formatKES(currentMinLoanAmount) }}</span>
                <span>{{ formatKES(currentMaxLoanAmount) }}</span>
              </div>
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.principalAmount">{{
              errors.principalAmount }}
            </div>
          </div>

          <div v-else-if="selectedLoanType?.classification === 'Product'" class="col-md-6">
            <label for="productSearch" class="form-label">Select Product <span class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-box"></i></span>
              <input type="text" id="productSearch" list="product-suggestions" class="form-control"
                v-model="productSearchTerm" @input="filterProducts" @change="selectProductFromSearch"
                :class="{ 'is-invalid': formTouched && errors.selectedProductId }" placeholder="Search product"
                autocomplete="off" />
              <datalist id="product-suggestions">
                <option v-for="product in filteredProducts" :key="product.id"
                  :value="`${product.name} (KES ${product.sellingPrice})`"></option>
              </datalist>

            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.selectedProductId">{{
              errors.selectedProductId
              }}</div>
            <div class="form-text">Price will be auto-filled as principal amount.</div>
          </div>

          <div class="col-md-6" v-if="selectedLoanType?.classification === 'Product'">
            <label class="form-label">Principal (Auto-set from Product)</label>
            <div class="input-group">
              <span class="input-group-text">KES</span>
              <input type="text" class="form-control bg-light" :value="formatKES(loan.principalAmount)" readonly />
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <label class="form-label">Loan Attributes/Fees</label>
            <div v-if="loanAttributes.length > 0" class="border p-3 rounded">
              <div v-for="attr in loanAttributes" :key="attr.name" class="d-flex justify-content-between mb-2">
                <span>{{ attr.name }} ({{ attr.isPercentage ? attr.value + '%' : formatKES(attr.value) }}):</span>
                <strong>{{ formatKES(attr.calculated) }}</strong>
              </div>
            </div>
            <div v-else class="alert alert-info">No specific fees/attributes configured for this loan type.</div>
          </div>

          <div class="col-md-6">
            <label for="loanTerm" class="form-label">Loan Term <span class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-clock"></i></span>
              <input type="number" id="loanTerm" min="1" class="form-control" v-model.number="loan.loanTerm"
                :class="{ 'is-invalid': formTouched && errors.loanTerm }" />
              <span class="input-group-text">{{ loan.termUnit }}</span>
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.loanTerm">{{ errors.loanTerm }}</div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Repayment Frequency</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-calendar-range"></i></span>
              <input type="text" class="form-control bg-light" value="Monthly" readonly />
            </div>
          </div>

          <div class="col-md-12">
            <label for="loanPurpose" class="form-label">Loan Purpose</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-pencil-square"></i></span>
              <textarea id="loanPurpose" v-model="loan.purpose" class="form-control"></textarea>
            </div>
          </div>

          <div class="col-md-6 mt-3">
            <label class="form-label">Total Payable Amount</label>
            <div class="input-group">
              <span class="input-group-text">KES</span>
              <input type="text" class="form-control bg-light" :value="formatKES(totalPayable)" readonly />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <button type="submit" class="btn btn-success" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            <i v-else class="bi bi-check-circle me-2"></i>{{ isSubmitting ? 'Submitting...' : 'Submit Loan' }}
          </button>
        </div>
      </form>

      <Loans class="col-12 mt-5" />
    </div>
  </div>
</template>

<script>
import loanApi from "@/api/loanApi";
import loanTypeApi from "@/api/loanTypeApi";
import clientApi from "@/api/clientApi";
import userApi from "@/api/userApi";
import swal from '@/utils/swal';
import Loans from "../../components/tables/allloans.vue";
import { productApi } from "@/api/productApi";

export default {
  components: { Loans },
  data() {
    return {
      loan: {
        idNumber: '',
        loanTypeId: '',
        principalAmount: null,
        loanTerm: null,
        termUnit: 'Months',
        repaymentFrequency: 'Monthly',
        purpose: '',
        requestedByUserId: null,
      },
      selectedProductId: '',
      allProducts: [],
      filteredProducts: [],
      productSearchTerm: '',
      errors: {},
      clients: [],
      allLoanTypes: [],
      filteredLoanTypes: [],
      selectedLoanClassification: '',
      loanAttributes: [],
      clientSearchTerm: '',
      filteredClients: [],
      isSubmitting: false,
      formTouched: false,
      principalStep: 1,
    };
  },
  computed: {
    selectedLoanType() {
      return this.allLoanTypes.find(t => t.id === this.loan.loanTypeId) || null;
    },
    currentMinLoanAmount() {
      return this.selectedLoanType?.minAmount ? parseFloat(this.selectedLoanType.minAmount) : 0;
    },
    currentMaxLoanAmount() {
      return this.selectedLoanType?.maxAmount ? parseFloat(this.selectedLoanType.maxAmount) : 1000000;
    },
    totalPayable() {
      const principal = parseFloat(this.loan.principalAmount) || 0;
      const totalFees = this.loanAttributes.reduce((sum, attr) => sum + (attr.calculated || 0), 0);
      return +(principal + totalFees).toFixed(2);
    }
  },
  watch: {
    'selectedLoanClassification': {
      handler: 'handleLoanClassificationChange',
      immediate: false,
    },
    'loan.loanTypeId': {
      handler: 'handleLoanTypeChange',
      immediate: false,
    },
    // Keep this watcher; it recalculates fees whenever principalAmount changes (by typing, dragging, or blurring)
    'loan.principalAmount': 'recalculateLoanAttributes',
  },
  mounted() {
    this.fetchClients();
    this.fetchLoanTypes();
    this.getCurrentUser();
  },
  methods: {
    setSelectedProduct(product) {
      if (product) {
        this.selectedProductId = product.id;
        this.loan.principalAmount = parseFloat(product.sellingPrice);
        this.productSearchTerm = `${product.name} (KES ${product.sellingPrice})`;
        this.errors.selectedProductId = '';
        this.recalculateLoanAttributes();
      } else {
        this.selectedProductId = '';
        this.loan.principalAmount = null;
        this.errors.selectedProductId = 'Please select a valid product from the suggestions.';
      }
    },

    // New: Allows typing freely without immediate clamping
    handlePrincipalAmountInput() {
      // Ensure the v-model updates as a number, but do NOT enforce min/max here.
      // The validation message will appear if out of range, but the user can continue typing.
      let value = parseFloat(this.loan.principalAmount);
      if (isNaN(value)) {
        this.loan.principalAmount = null; // Set to null if non-numeric to avoid NaN issues
      }
      // The watcher for loan.principalAmount will handle recalculation.
      // Error messages will appear if formTouched is true and validateForm reflects the current invalid state.
      this.validateForm(); // Call validate to show real-time error message during typing
    },

    // New: Clamps the value to min/max only when the user finishes editing the field
    handlePrincipalAmountBlur() {
      let value = parseFloat(this.loan.principalAmount);

      if (isNaN(value) || value === null) {
        // If the field is left empty or with an invalid number, default to min amount
        this.loan.principalAmount = this.currentMinLoanAmount;
      } else if (value < this.currentMinLoanAmount) {
        this.loan.principalAmount = this.currentMinLoanAmount;
      } else if (value > this.currentMaxLoanAmount) {
        this.loan.principalAmount = this.currentMaxLoanAmount;
      }
      // After clamping, re-run validation to ensure error state is updated
      this.validateForm();
    },

    validateForm() {
      this.errors = {};
      let isValid = true;

      if (!this.loan.idNumber) {
        this.errors.idNumber = "Client is required.";
        isValid = false;
      }
      if (!this.selectedLoanClassification) {
        this.errors.loanClassification = "Loan Classification is required.";
        isValid = false;
      }
      if (!this.loan.loanTypeId) {
        this.errors.loanTypeId = "Loan Type is required.";
        isValid = false;
      }

      if (this.selectedLoanType?.classification === 'Cash') {
        if (this.loan.principalAmount === null || isNaN(this.loan.principalAmount) || this.loan.principalAmount <= 0) {
          this.errors.principalAmount = "Principal Amount is required and must be positive.";
          isValid = false;
        } else if (this.loan.principalAmount < this.currentMinLoanAmount || this.loan.principalAmount > this.currentMaxLoanAmount) {
          this.errors.principalAmount = `Amount must be between ${this.formatKES(this.currentMinLoanAmount)} and ${this.formatKES(this.currentMaxLoanAmount)}.`;
          isValid = false;
        }
      } else if (this.selectedLoanType?.classification === 'Product') {
        if (!this.selectedProductId) {
          this.errors.selectedProductId = "Product selection is required.";
          isValid = false;
        }
      }

      if (this.loan.loanTerm === null || this.loan.loanTerm <= 0) {
        this.errors.loanTerm = "Loan Term is required and must be positive.";
        isValid = false;
      }

      return isValid;
    },

    handleLoanClassificationChange(newClassification) {
      this.loan.loanTypeId = '';
      this.loan.principalAmount = null;
      this.selectedProductId = '';
      this.productSearchTerm = '';
      this.loanAttributes = [];
      this.allProducts = [];
      this.filteredProducts = [];

      if (newClassification) {
        this.filteredLoanTypes = this.allLoanTypes.filter(type => type.classification === newClassification);
      } else {
        this.filteredLoanTypes = [];
      }
      if (this.errors.loanTypeId) {
        delete this.errors.loanTypeId;
      }
    },

    async handleLoanTypeChange(newTypeId) {
      const selected = this.allLoanTypes.find(t => t.id === newTypeId);
      if (!selected) {
        this.allProducts = [];
        this.filteredProducts = [];
        this.loanAttributes = [];
        this.loan.principalAmount = null;
        this.selectedProductId = '';
        this.productSearchTerm = '';
        return;
      }

      if (selected.classification !== this.selectedLoanClassification) {
        this.loan.loanTypeId = '';
        return;
      }

      this.selectedProductId = '';
      this.loan.principalAmount = null;
      this.allProducts = [];
      this.filteredProducts = [];
      this.productSearchTerm = '';

      this.loan.loanTerm = selected.maxTerm;
      this.loan.termUnit = selected.termUnit;

      await this.fetchLoanAttributes(newTypeId);

      if (selected.classification === 'Product') {
        await this.fetchProductsForLoanType(selected.minAmount, selected.maxAmount);
      } else {
        // Only set default principal if it's currently null or 0, to not override user's partial input
        if (this.loan.principalAmount === null || this.loan.principalAmount === 0) {
           this.loan.principalAmount = this.currentMinLoanAmount;
        }
      }
    },
    async fetchLoanAttributes(typeId) {
      try {
        const res = await loanTypeApi.getAttributesByTypeId(typeId);
        this.loanAttributes = res.data.map(attr => ({
          name: attr.name,
          value: parseFloat(attr.value),
          isPercentage: attr.isPercentage,
          calculated: 0
        }));
        this.recalculateLoanAttributes();
      } catch (e) {
        swal.error("Failed to load loan attributes", e.message);
        this.loanAttributes = [];
      }
    },
    async fetchProductsForLoanType(minLoanAmount, maxLoanAmount) {
      try {
        const res = await productApi.getByPriceRange(minLoanAmount, maxLoanAmount);
        this.allProducts = res.data;
        this.filteredProducts = [...res.data];
      } catch (e) {
        swal.error("Failed to load products for the given loan amount range", e.message);
        this.allProducts = [];
        this.filteredProducts = [];
      }
    },
    recalculateLoanAttributes() {
      const principal = parseFloat(this.loan.principalAmount) || 0;
      this.loanAttributes = this.loanAttributes.map(attr => ({
        ...attr,
        calculated: attr.isPercentage ? +(principal * (attr.value / 100)).toFixed(2) : attr.value
      }));
    },
    async getCurrentUser() {
      try {
        const res = await userApi.getCurrentUser();
        if (res.data?.id) {
          this.loan.requestedByUserId = parseInt(res.data.id);
        } else {
          swal.error("Could not fetch user ID. Please log in again.");
        }
      } catch (e) {
        swal.error("Error fetching current user", e.message);
      }
    },
    formatKES(value) {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 2
      }).format(value || 0);
    },
    async fetchClients() {
      try {
        const res = await clientApi.getAll();
        this.clients = res.data;
        this.filteredClients = res.data;
      } catch (e) {
        swal.error("Error fetching clients", e.message);
      }
    },
    async fetchLoanTypes() {
      try {
        const res = await loanTypeApi.getAll();
        this.allLoanTypes = res.data;
      } catch (e) {
        swal.error("Error fetching loan types", e.message);
      }
    },
    async submitForm() {
      this.formTouched = true;
      // Ensure blur logic is applied one last time before final validation
      if (this.selectedLoanType?.classification === 'Cash') {
          this.handlePrincipalAmountBlur();
      }

      if (!this.validateForm()) {
        swal.error("Validation Error", "Please correct the errors in the form.");
        return;
      }

      this.isSubmitting = true;
      try {
        const loanData = {
          ...this.loan,
          loanFees: this.loanAttributes.map(attr => ({
            name: attr.name,
            amount: attr.calculated,
            isPercentage: attr.isPercentage,
            originalValue: attr.value
          })),
          totalPayableAmount: this.totalPayable,
          selectedProductId: this.selectedProductId,
          creationDate: new Date().toISOString().split('T')[0],
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          paymentMethods: ['Bank Transfer'],
          repaymentAccount: 'AUTO_GENERATED',
        };

        await loanApi.create(loanData);
        swal.success('Loan submitted successfully!');
        this.resetForm();
      } catch (e) {
        swal.error('Submission failed', e.message || 'An unexpected error occurred.');
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.loan = {
        idNumber: '',
        loanTypeId: '',
        principalAmount: null,
        loanTerm: null,
        termUnit: 'Months',
        repaymentFrequency: 'Monthly',
        purpose: '',
        requestedByUserId: this.loan.requestedByUserId,
      };
      this.selectedProductId = '';
      this.allProducts = [];
      this.filteredProducts = [];
      this.productSearchTerm = '';
      this.errors = {};
      this.loanAttributes = [];
      this.clientSearchTerm = '';
      this.filteredClients = [...this.clients];
      this.selectedLoanClassification = '';
      this.filteredLoanTypes = [];
      this.formTouched = false;
    },
    autoPopulate() {
      const demoClient = this.clients[0] || { idNumber: 'DEMO123', fullName: 'Demo Client' };

      const cashLoanType = this.allLoanTypes.find(t => t.classification === 'Cash' && t.minAmount && t.maxAmount);
      const productLoanType = this.allLoanTypes.find(t => t.classification === 'Product');

      let classificationToUse = '';
      let loanTypeIdToUse = '';
      let principalAmountToUse = null;
      let selectedProductIdToUse = '';
      let productSearchTermToUse = '';

      if (productLoanType && this.allProducts.length > 0) {
        classificationToUse = 'Product';
        loanTypeIdToUse = productLoanType.id;
        const suitableProduct = this.allProducts.find(p =>
          parseFloat(p.sellingPrice) >= parseFloat(productLoanType.minAmount) &&
          parseFloat(p.sellingPrice) <= parseFloat(productLoanType.maxAmount)
        );
        if (suitableProduct) {
          selectedProductIdToUse = suitableProduct.id;
          principalAmountToUse = parseFloat(suitableProduct.sellingPrice);
          productSearchTermToUse = `${suitableProduct.name} (KES ${suitableProduct.sellingPrice})`;
        } else {
          selectedProductIdToUse = this.allProducts[0].id;
          principalAmountToUse = parseFloat(this.allProducts[0].sellingPrice);
          productSearchTermToUse = `${this.allProducts[0].name} (KES ${this.allProducts[0].sellingPrice})`;
        }
      } else if (cashLoanType) {
        classificationToUse = 'Cash';
        loanTypeIdToUse = cashLoanType.id;
        principalAmountToUse = parseFloat(cashLoanType.minAmount);
      } else if (this.allLoanTypes.length > 0) {
        classificationToUse = this.allLoanTypes[0].classification;
        loanTypeIdToUse = this.allLoanTypes[0].id;
        if (classificationToUse === 'Cash') {
          principalAmountToUse = parseFloat(this.allLoanTypes[0].minAmount || 5000);
        } else if (classificationToUse === 'Product' && this.allProducts.length > 0) {
          selectedProductIdToUse = this.allProducts[0].id;
          principalAmountToUse = parseFloat(this.allProducts[0].sellingPrice);
          productSearchTermToUse = `${this.allProducts[0].name} (KES ${this.allProducts[0].sellingPrice})`;
        } else {
          principalAmountToUse = 5000;
        }
      }

      this.selectedLoanClassification = classificationToUse;

      this.$nextTick(async () => {
        this.loan = {
          ...this.loan,
          idNumber: demoClient.idNumber,
          loanTypeId: loanTypeIdToUse,
          principalAmount: principalAmountToUse,
          loanTerm: 12,
          termUnit: 'Months',
          repaymentFrequency: 'Monthly',
          purpose: 'General expenses and investment',
          requestedByUserId: this.loan.requestedByUserId,
        };

        this.selectedProductId = selectedProductIdToUse;
        this.clientSearchTerm = `${demoClient.fullName} (${demoClient.idNumber})`;
        this.productSearchTerm = productSearchTermToUse;

        if (loanTypeIdToUse) {
          await this.handleLoanTypeChange(loanTypeIdToUse);
        }

        this.formTouched = false;
      });
    },
    filterClients() {
      const searchTermLower = this.clientSearchTerm.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        client.fullName.toLowerCase().includes(searchTermLower) ||
        client.idNumber.toLowerCase().includes(searchTermLower)
      );
    },
    selectClientFromSearch() {
      const selectedValue = this.clientSearchTerm;
      const match = selectedValue.match(/\((\d+)\)$/);

      let selectedClient = null;
      if (match && match[1]) {
        selectedClient = this.clients.find(c => c.idNumber === match[1]);
      } else {
        selectedClient = this.clients.find(c =>
          c.fullName.toLowerCase() === selectedValue.toLowerCase() ||
          c.idNumber.toLowerCase() === selectedValue.toLowerCase()
        );
      }

      if (selectedClient) {
        this.loan.idNumber = selectedClient.idNumber;
        this.clientSearchTerm = `${selectedClient.fullName} (${selectedClient.idNumber})`;
        this.errors.idNumber = '';
      } else {
        this.loan.idNumber = '';
        this.errors.idNumber = 'Please select a valid client from the suggestions.';
      }
    },
    filterProducts() {
      const searchTermLower = this.productSearchTerm.toLowerCase();
      this.filteredProducts = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.sellingPrice.toString().includes(searchTermLower)
      );
    },
    selectProductFromSearch() {
      const selectedValue = this.productSearchTerm;
      let selectedProduct = null;

      selectedProduct = this.allProducts.find(p => `${p.name} (KES ${p.sellingPrice})` === selectedValue);

      if (!selectedProduct) {
        const match = selectedValue.match(/\(KES ([\d.]+)\)$/);
        if (match && match[1]) {
          const price = parseFloat(match[1]);
          selectedProduct = this.allProducts.find(p =>
            parseFloat(p.sellingPrice) === price && selectedValue.includes(p.name)
          );
        }
      }

      if (!selectedProduct) {
        selectedProduct = this.allProducts.find(p =>
          selectedValue.toLowerCase().includes(p.name.toLowerCase())
        );
      }

      this.setSelectedProduct(selectedProduct);
    }
  }
};
</script>

<style scoped>
/* Scoped styles for this component */

.principal-amount-control {
  display: flex;
  flex-direction: column;
}

.principal-range-slider {
  margin-top: 0;
}

.principal-amount-control .input-group {
  width: 100%;
}
</style>

<style scoped>
.principal-amount-control {
  display: flex;
  flex-direction: column;
}

.principal-range-slider {
  margin-top: 0;
}

.principal-amount-control .input-group {
  width: 100%;
}
</style>