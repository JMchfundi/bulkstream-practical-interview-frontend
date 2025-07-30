<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="submitLoanType" novalidate>
        <div class="row g-3">

          <div class="col-md-6">
            <label class="form-label">Loan Classification</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-box-seam"></i></span>
              <select class="form-control" v-model="loanType.classification">
                <option value="Cash">Cash</option>
                <option value="Product">Product</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Loan Product Name</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-tag"></i></span>
              <input type="text" class="form-control" v-model="loanType.name" :class="{ 'is-invalid': errors.name }" />
            </div>
            <div class="invalid-feedback d-block" v-if="errors.name">{{ errors.name }}</div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Description</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-card-text"></i></span>
              <input type="text" class="form-control" v-model="loanType.description" />
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Minimum Loan Amount</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <input type="number" step="0.01" class="form-control" v-model="loanType.minAmount"
                :class="{ 'is-invalid': errors.minAmount }" />
            </div>
            <div class="invalid-feedback d-block" v-if="errors.minAmount">{{ errors.minAmount }}</div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Maximum Loan Amount</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <input type="number" step="0.01" class="form-control" v-model="loanType.maxAmount"
                :class="{ 'is-invalid': errors.maxAmount }" />
            </div>
            <div class="invalid-feedback d-block" v-if="errors.maxAmount">{{ errors.maxAmount }}</div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Term</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-clock-history"></i></span>
              <input type="number" min="1" class="form-control" v-model="loanType.maxTerm"
                :class="{ 'is-invalid': errors.maxTerm }" />
              <select v-model="loanType.termUnit" class="form-control">
                <option>Weeks</option>
              </select>
            </div>
            <div class="invalid-feedback d-block" v-if="errors.maxTerm">{{ errors.maxTerm }}</div>
          </div>

          <div class="col-12 mt-4">
            <h4>Custom Interests & Fees</h4>
            <hr>
            <button type="button" class="btn btn-outline-primary mb-3"
              @click="showAddAttributeForm = !showAddAttributeForm">
              <i class="bi bi-plus-circle me-2"></i>
              {{ showAddAttributeForm ? 'Hide Add Form' : 'Add New Interest/Fee' }}
            </button>

            <div class="card p-3 mb-4" v-if="showAddAttributeForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Name</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-tag"></i></span>
                    <input type="text" class="form-control" v-model="newAttribute.name"
                      :class="{ 'is-invalid': errors.newAttributeName }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.newAttributeName">{{ errors.newAttributeName }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Value</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-coin"></i></span>
                    <input type="number" step="0.01" class="form-control" v-model.number="newAttribute.value"
                      :class="{ 'is-invalid': errors.newAttributeValue }" />
                    <select class="form-control" v-model="newAttribute.valueType">
                      <option value="%">%</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.newAttributeValue">{{ errors.newAttributeValue }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Charge Type</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-arrow-repeat"></i></span>
                    <select class="form-control" v-model="newAttribute.chargeType">
                      <option value="One-Time">One-Time</option>
                      <option value="Recurring Monthly">Recurring Monthly</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6" v-if="newAttribute.chargeType === 'One-Time'">
                  <label class="form-label">One-Time Charge Timing</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-calendar-event"></i></span>
                    <select class="form-control" v-model="newAttribute.oneTimeTiming">
                      <option value="Immediately">Immediately (Loan Disbursement)</option>
                      <option value="After Period">After a certain period</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6"
                  v-if="newAttribute.chargeType === 'One-Time' && newAttribute.oneTimeTiming === 'After Period'">
                  <label class="form-label">Period Value</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-hash"></i></span>
                    <input type="number" min="1" class="form-control" v-model.number="newAttribute.oneTimePeriodValue"
                      :class="{ 'is-invalid': errors.oneTimePeriodValue }" />
                    <select class="form-control" v-model="newAttribute.oneTimePeriodUnit">
                      <option value="Days">Days</option>
                      <option value="Weeks">Weeks</option>
                      <option value="Months">Months</option>
                    </select>
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.oneTimePeriodValue">{{ errors.oneTimePeriodValue }}
                  </div>
                </div>

                <div class="col-12 text-end">
                  <button type="button" class="btn btn-success" @click="addCustomAttribute">Add Attribute</button>
                </div>
              </div>
            </div>

            <div class="card p-3">
              <h5>Added Attributes:</h5>
              <p v-if="loanType.customAttributes.length === 0" class="text-muted text-center">No custom interests or
                fees added yet.</p>
              <ul class="list-group">
                <li v-for="(attr, index) in loanType.customAttributes" :key="index"
                  class="list-group-item d-flex justify-content-between align-items-center mb-2 bg-light rounded">
                  <div>
                    <strong>{{ attr.name }}</strong>: {{ attr.value }} {{ attr.valueType }}
                    <span class="badge bg-secondary ms-2">{{ attr.chargeType }}</span>
                    <span v-if="attr.chargeType === 'One-Time' && attr.oneTimeTiming === 'Immediately'"
                      class="badge bg-info ms-1">Immediately</span>
                    <span v-if="attr.chargeType === 'One-Time' && attr.oneTimeTiming === 'After Period'"
                      class="badge bg-info ms-1">After {{ attr.oneTimePeriodValue }} {{ attr.oneTimePeriodUnit }}</span>
                  </div>
                  <button type="button" class="btn btn-sm btn-outline-danger" @click="removeCustomAttribute(index)">
                    <i class="bi bi-trash"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Approver User(s) Hierarchy</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-people-fill"></i></span>
              <multiselect v-model="selectedUsersToAdd" :options="users" :multiple="true" :close-on-select="false"
                :clear-on-select="true" :preserve-search="true" label="name" track-by="id"
                placeholder="Select users to add" class="form-control p-0 border-0">
                <template slot="option" slot-scope="props">
                  {{ props.option.username || props.option.email || `User #${props.option.id}` }}
                </template>
              </multiselect>
              <button type="button" class="btn btn-outline-secondary" @click="addSelectedUsers">Add</button>
            </div>
            <div class="mt-3 card p-3">
              <div class="approver-list-container">
                <p v-if="loanType.approvers.length === 0" class="text-muted text-center">Drag and drop approvers here to
                  set
                  hierarchy.</p>
                <draggable class="list-group approver-draggable-list" v-model="loanType.approvers" group="approvers"
                  :options="{ handle: '.handle' }">
                  <div v-for="element in loanType.approvers" :key="element.id"
                    class="list-group-item d-flex align-items-center mb-1 bg-light border rounded">
                    <i class="bi bi-grip-vertical handle me-2" style="cursor: move;"></i>
                    <div class="flex-grow-1">
                      {{ element.name || element.username || element.email }}
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-danger" @click="removeApprover(element.id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </draggable>
              </div>
            </div>
          </div>

        </div>

        <div class="d-flex justify-content-end mt-4">
          <button type="submit" class="btn btn-success" :disabled="loading">
            <i class="bi bi-check-circle me-2"></i>
            {{ loading ? 'Saving...' : 'Create Loan Type' }}
          </button>
        </div>
      </form>

      <LoanTypes class="col-12" />
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import draggable from 'vuedraggable';

import loanTypeApi from '@/api/loanTypeApi';
import userApi from '@/api/userApi';
import swal from '@/utils/swal';
import LoanTypes from '../../components/tables/loantypes.vue';

export default {
  components: {
    LoanTypes,
    Multiselect,
    draggable
  },
  data() {
    return {
      loanType: {
        name: '',
        description: '',
        maxTerm: null,
        termUnit: 'Weeks',
        classification: 'Cash',
        minAmount: null, // Still needed for Cash loans
        maxAmount: null, // Still needed for Cash loans
        approvers: [],
        customAttributes: [] // New dynamic array for custom fees/interests
      },
      newAttribute: { // State for adding a new custom attribute
        name: '',
        value: null,
        valueType: '%', // Default to percentage
        chargeType: 'Recurring', // Default to recurring monthly
        oneTimeTiming: 'Immediately', // Default for one-time charges
        oneTimePeriodValue: null, // For 'After Period'
        oneTimePeriodUnit: 'Days' // For 'After Period'
      },
      users: [],
      selectedUsersToAdd: [],
      errors: {},
      loading: false,
      productCategories: [],
      showAddAttributeForm: false // To toggle the new attribute input form visibility
    };
  },
  created() {
    this.fetchUsers();
    this.fetchCategories();
  },
  watch: {
    'loanType.classification'() {
      // Reset the new attribute form whenever classification changes
      this.showAddAttributeForm = false;
      this.resetNewAttributeForm();
      this.errors = {}; // Clear all form errors on classification change for a fresh start
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await userApi.getAll();
        this.users = response.data.map(user => ({
          id: user.id,
          name: user.name || user.username || user.email,
          ...user
        })) || [];
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    addSelectedUsers() {
      this.selectedUsersToAdd.forEach(user => {
        if (!this.loanType.approvers.some(approver => approver.id === user.id)) {
          this.loanType.approvers.push(user);
        }
      });
      this.selectedUsersToAdd = [];
    },
    removeApprover(id) {
      const index = this.loanType.approvers.findIndex(user => user.id === id);
      if (index > -1) {
        this.loanType.approvers.splice(index, 1);
      }
    },

    // --- New Methods for Custom Attributes ---
    validateNewAttribute() {
      const attributeErrors = {};
      if (!this.newAttribute.name) {
        attributeErrors.newAttributeName = 'Attribute name is required.';
      }
      if (this.newAttribute.value === null || this.newAttribute.value === '') {
        attributeErrors.newAttributeValue = 'Value is required.';
      } else if (this.newAttribute.value < 0) {
        attributeErrors.newAttributeValue = 'Value cannot be negative.';
      }

      if (this.newAttribute.chargeType === 'One-Time' && this.newAttribute.oneTimeTiming === 'After Period') {
        if (this.newAttribute.oneTimePeriodValue === null || this.newAttribute.oneTimePeriodValue === '') {
          attributeErrors.oneTimePeriodValue = 'Period value is required for "After Period" timing.';
        } else if (this.newAttribute.oneTimePeriodValue <= 0) {
          attributeErrors.oneTimePeriodValue = 'Period value must be greater than zero.';
        }
      }
      this.errors = { ...this.errors, ...attributeErrors }; // Merge with existing errors
      return Object.keys(attributeErrors).length === 0;
    },
    addCustomAttribute() {
      if (!this.validateNewAttribute()) {
        return;
      }

      // Add a copy of the newAttribute to the customAttributes array
      const attributeToAdd = { ...this.newAttribute };

      // Clean up properties not relevant to the selected chargeType
      if (attributeToAdd.chargeType !== 'One-Time') {
        delete attributeToAdd.oneTimeTiming;
        delete attributeToAdd.oneTimePeriodValue;
        delete attributeToAdd.oneTimePeriodUnit;
      } else if (attributeToAdd.oneTimeTiming !== 'After Period') {
        delete attributeToAdd.oneTimePeriodValue;
        delete attributeToAdd.oneTimePeriodUnit;
      }

      this.loanType.customAttributes.push(attributeToAdd);
      this.resetNewAttributeForm();
      this.showAddAttributeForm = false; // Hide form after adding
    },
    removeCustomAttribute(index) {
      this.loanType.customAttributes.splice(index, 1);
    },
    resetNewAttributeForm() {
      this.newAttribute = {
        name: '',
        value: null,
        valueType: '%',
        chargeType: 'Recurring',
        oneTimeTiming: 'Immediately',
        oneTimePeriodValue: null,
        oneTimePeriodUnit: 'Days'
      };
      // Clear specific errors for the new attribute form
      delete this.errors.newAttributeName;
      delete this.errors.newAttributeValue;
      delete this.errors.oneTimePeriodValue;
    },
    // --- End New Methods for Custom Attributes ---

    validateForm() {
      this.errors = {}; // Clear all errors at the start of validation
      if (!this.loanType.name) {
        this.errors.name = 'Loan type name is required.';
      }

      if (this.loanType.minAmount === null || this.loanType.minAmount === '') {
        this.errors.minAmount = 'Minimum loan amount is required.';
      }
      if (this.loanType.maxAmount === null || this.loanType.maxAmount === '') {
        this.errors.maxAmount = 'Maximum loan amount is required.';
      }
      if (this.loanType.minAmount !== null && this.loanType.maxAmount !== null && parseFloat(this.loanType.minAmount) > parseFloat(this.loanType.maxAmount)) {
        this.errors.maxAmount = 'Maximum amount must be greater than or equal to the minimum amount.';
      }

      if (this.loanType.maxTerm === null || this.loanType.maxTerm === '') {
        this.errors.maxTerm = 'Maximum term is required.';
      } else if (this.loanType.maxTerm <= 0) {
        this.errors.maxTerm = 'Maximum term must be greater than zero.';
      }

      return Object.keys(this.errors).length === 0;
    },
    async submitLoanType() {
      if (!this.validateForm()) return;

      this.loading = true;
      try {
        const approverIds = this.loanType.approvers.map(approver => approver.id);

        const payload = {
          name: this.loanType.name,
          description: this.loanType.description,
          maxTerm: this.loanType.maxTerm,
          termUnit: this.loanType.termUnit,
          classification: this.loanType.classification,
          approverUserIds: approverIds,
          // --- Include custom attributes in the payload ---
          customAttributes: this.loanType.customAttributes.map(attr => ({
            name: attr.name,
            value: attr.value,
            isPercentage: attr.valueType === '%', // Backend typically uses boolean for percentage
            chargeType: attr.chargeType, // 'One-Time' or 'Recurring Monthly'
            // Only include timing details if chargeType is One-Time
            ...(attr.chargeType === 'One-Time' && {
              oneTimeTiming: attr.oneTimeTiming,
              // Only include period details if oneTimeTiming is After Period
              ...(attr.oneTimeTiming === 'After Period' && {
                oneTimePeriodValue: attr.oneTimePeriodValue,
                oneTimePeriodUnit: attr.oneTimePeriodUnit
              })
            })
          }))
        };

        payload.minAmount = this.loanType.minAmount;
        payload.maxAmount = this.loanType.maxAmount;

        await loanTypeApi.create(payload);
        swal.success('Loan type created successfully!');
        this.resetForm();
      } catch (error) {
        swal.error('Error creating loan type', error.message || 'Unknown error');
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.loanType = {
        name: '',
        description: '',
        maxTerm: null,
        termUnit: 'Weeks',
        classification: 'Cash', // Reset to default
        minAmount: null,
        maxAmount: null,
        approvers: [],
        customAttributes: [] // Clear all custom attributes
      };
      this.selectedUsersToAdd = [];
      this.errors = {};
      this.resetNewAttributeForm();
      this.showAddAttributeForm = false;
    }
  }
};
</script>

<style scoped>
/* Optional styling for the draggable list */
.approver-list-container {
  min-height: 100px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #f8f9fa;
}

.approver-draggable-list {
  list-style-type: none;
  padding: 0;
}

.list-group-item {
  cursor: grab;
}

.list-group-item:active {
  cursor: grabbing;
}

.approver-draggable-list .sortable-ghost {
  opacity: 0.5;
  background-color: #e9ecef;
}

.handle {
  cursor: move;
}
</style>