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
              <input type="text" class="form-control" v-model="loanType.name"
                :class="{ 'is-invalid': formTouched && errors.name }" @blur="validateForm(true)" />
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.name">{{ errors.name }}</div>
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
                :class="{ 'is-invalid': formTouched && errors.minAmount }" @blur="validateForm(true)" />
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.minAmount">{{ errors.minAmount }}</div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Maximum Loan Amount</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
              <input type="number" step="0.01" class="form-control" v-model="loanType.maxAmount"
                :class="{ 'is-invalid': formTouched && errors.maxAmount }" @blur="validateForm(true)" />
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.maxAmount">{{ errors.maxAmount }}</div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Term</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-clock-history"></i></span>
              <input type="number" min="1" class="form-control" v-model="loanType.maxTerm"
                :class="{ 'is-invalid': formTouched && errors.maxTerm }" @blur="validateForm(true)" />
              <select v-model="loanType.termUnit" class="form-control">
                <option>Weeks</option>
              </select>
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.maxTerm">{{ errors.maxTerm }}</div>
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
                      :class="{ 'is-invalid': errors.newAttributeName }" @blur="validateNewAttribute()" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.newAttributeName">{{ errors.newAttributeName }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Value</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-coin"></i></span>
                    <input type="number" step="0.01" class="form-control" v-model.number="newAttribute.value"
                      :class="{ 'is-invalid': errors.newAttributeValue }" @blur="validateNewAttribute()" />
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
                      <option value="Periodically">Periodically</option> </select>
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
                  v-if="(newAttribute.chargeType === 'One-Time' && newAttribute.oneTimeTiming === 'After Period') || newAttribute.chargeType === 'Periodically'">
                  <label class="form-label">Period Value</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-hash"></i></span>
                    <input type="number" min="1" class="form-control" v-model.number="newAttribute.oneTimePeriodValue"
                      :class="{ 'is-invalid': errors.oneTimePeriodValue }" @blur="validateNewAttribute()" />
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
                    <span v-if="attr.chargeType === 'Periodically'"
                      class="badge bg-info ms-1">Every {{ attr.oneTimePeriodValue }} {{ attr.oneTimePeriodUnit }}</span>
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
              <multiselect v-model="selectedUsersToAdd" :options="allUsers" :multiple="true" :close-on-select="false"
                :clear-on-select="true" :preserve-search="true" label="name" track-by="id"
                placeholder="Select users to add" class="form-control p-0 border-0">
                <template slot="option" slot-scope="props">
                  {{ props.option.name || props.option.username || props.option.email || `User #${props.option.id}` }}
                </template>
              </multiselect>
              <button type="button" class="btn btn-outline-secondary" @click="addSelectedUsers">Add</button>
            </div>
            <div class="invalid-feedback d-block" v-if="formTouched && errors.approvers">{{ errors.approvers }}</div>
            <div class="mt-3 card p-3">
              <div class="approver-list-container">
                <p v-if="loanType.approvers.length === 0" class="text-muted text-center">Drag and drop approvers here to
                  set hierarchy.</p>
                <draggable class="list-group approver-draggable-list" v-model="loanType.approvers" group="approvers"
                  :options="{ handle: '.handle' }">
                  <div v-for="element in loanType.approvers" :key="element.id"
                    class="list-group-item d-flex align-items-center mb-1 bg-light border rounded">
                    <i class="bi bi-grip-vertical handle me-2" style="cursor: move;"></i>
                    <div class="flex-grow-1">
                      {{ element.name || element.username || element.email || `User #${element.id}` }}
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
            {{ loading ? 'Saving...' : isEditMode ? 'Update Loan Type' : 'Create Loan Type' }}
          </button>
        </div>
      </form>

      <LoanTypes class="col-12" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import multiselect from 'vue-multiselect';
import draggable from 'vuedraggable';
import loanTypeApi from '@/api/loanTypeApi';
import userApi from '@/api/userApi'; // Assuming a user API for fetching users
import LoanTypes from '../../components/tables/loantypes.vue';
import alert from '@/utils/swal'; // Using the same alert utility as the first script

export default {
  name: 'LoanTypeForm',
  components: {
    LoanTypes,
    multiselect,
    draggable
  },
  data() {
    return {
      loanTypeId: null,
      loanType: {
        classification: 'Cash',
        name: '',
        description: '',
        minAmount: null,
        maxAmount: null,
        maxTerm: null,
        termUnit: 'Weeks',
        customAttributes: [], // This will hold fetched attributes
        approvers: [] // This will hold fetched approvers (user objects)
      },
      selectedUsersToAdd: [], // For selecting users from the dropdown
      allUsers: [], // All available users for selection
      showAddAttributeForm: false,
      newAttribute: { // For the new attribute being added
        name: '',
        value: null,
        valueType: '%',
        chargeType: 'One-Time',
        oneTimeTiming: 'Immediately',
        oneTimePeriodValue: null,
        oneTimePeriodUnit: 'Days'
      },
      errors: {}, // For form validation errors
      loading: false, // For loading state during API calls
      formTouched: false, // To track if the form has been interacted with
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    // Determine if the form is in edit mode
    isEditMode() {
      return this.loanTypeId !== null;
    }
  },
  watch: {
    // Watch for changes in loanType fields to trigger validation
    'loanType': {
      deep: true,
      handler() {
        if (this.formTouched) {
          this.validateForm();
        }
      }
    },
    // Watch for changes in newAttribute fields to trigger validation
    'newAttribute': {
      deep: true,
      handler() {
        if (this.showAddAttributeForm) {
          this.validateNewAttribute();
        }
      }
    },
  },
  async created() {
    // Fetch all users first, regardless of edit mode
    await this.fetchUsers();

    // Load existing loan type if an ID is present in the route params
    if (this.$route.params.id) {
      this.loanTypeId = this.$route.params.id;
      await this.fetchLoanTypeData();
    }
  },
  methods: {
    /**
     * Fetches existing loan type data for editing.
     */
    async fetchLoanTypeData() {
      this.loading = true;
      try {
        const response = await loanTypeApi.getById(this.loanTypeId);
        const loanTypeData = response.data;

        // Populate the main loanType form data
        this.loanType.classification = loanTypeData.classification || 'Cash';
        this.loanType.name = loanTypeData.name || '';
        this.loanType.description = loanTypeData.description || '';
        this.loanType.minAmount = loanTypeData.minAmount ?? null;
        this.loanType.maxAmount = loanTypeData.maxAmount ?? null;
        this.loanType.maxTerm = loanTypeData.maxTerm ?? null;
        this.loanType.termUnit = loanTypeData.termUnit || 'Weeks';

        // Assuming approvers are returned as an array of user IDs or objects
        // Filter `allUsers` to find the corresponding user objects for the fetched approver IDs
        this.loanType.approvers = loanTypeData.approvers
          ? this.allUsers.filter(user => loanTypeData.approvers.includes(user.id))
          : [];

        // Fetch custom attributes separately if they are not part of the main loan type object
        // The original script had a separate call for this, which is a good practice if attributes are a sub-resource.
        const attributesResponse = await loanTypeApi.getAttributesByTypeId(this.loanTypeId);
        this.loanType.customAttributes = attributesResponse.data || [];

      } catch (error) {
        console.error('Error fetching loan type data:', error);
        alert.error('Failed to load loan type data. Please try again.');
        // Optionally redirect or clear form on error
        this.$router.push('/loan-types');
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches all users for the approver selection dropdown.
     */
    async fetchUsers() {
      try {
        // Replace with your actual user API endpoint
        const response = await userApi.getAll(); // Assuming userApi.getAllUsers() exists
        this.allUsers = response.data.map(user => ({
          id: user.id,
          name: user.name || user.username || user.email,
          // Add any other properties needed for display in multiselect
        }));
      } catch (error) {
        console.error('Error fetching users:', error);
        alert.error('Failed to load users for approver selection.');
        this.allUsers = []; // Ensure allUsers is empty on error
      }
    },

    /**
     * Adds selected users from the multiselect to the loan type's approvers list.
     */
    addSelectedUsers() {
      this.selectedUsersToAdd.forEach(user => {
        // Ensure the user is not already in the list
        if (!this.loanType.approvers.some(approver => approver.id === user.id)) {
          this.loanType.approvers.push(user);
        }
      });
      this.selectedUsersToAdd = []; // Clear selection after adding
      this.validateForm(); // Re-validate after adding approvers
    },

    /**
     * Removes an approver from the list by their ID.
     * @param {string} userId - The ID of the user to remove.
     */
    removeApprover(userId) {
      this.loanType.approvers = this.loanType.approvers.filter(user => user.id !== userId);
      this.validateForm(); // Re-validate after removing approver
    },

    /**
     * Validates the new attribute form before adding.
     */
    validateNewAttribute() {
      const errors = {};
      if (!this.newAttribute.name) {
        errors.newAttributeName = 'Name is required.';
      }
      if (this.newAttribute.value === null || this.newAttribute.value === '') {
        errors.newAttributeValue = 'Value is required.';
      } else if (isNaN(this.newAttribute.value) || parseFloat(this.newAttribute.value) < 0) {
        errors.newAttributeValue = 'Value must be a non-negative number.';
      }

      // Specific validation for 'Periodically' charge type
      if (this.newAttribute.chargeType === 'Periodically' && (this.newAttribute.oneTimePeriodValue === null || this.newAttribute.oneTimePeriodValue === '')) {
        errors.oneTimePeriodValue = 'Period value is required for periodic charges.';
      } else if (this.newAttribute.chargeType === 'Periodically' && (isNaN(this.newAttribute.oneTimePeriodValue) || parseInt(this.newAttribute.oneTimePeriodValue) <= 0)) {
        errors.oneTimePeriodValue = 'Period value must be a positive number.';
      }

      this.errors = { ...this.errors, ...errors };

      // Clean up errors that are no longer applicable
      for (const key in this.errors) {
        if (!errors[key] && (key === 'newAttributeName' || key === 'newAttributeValue' || key === 'oneTimePeriodValue')) {
          delete this.errors[key];
        }
      }
      return Object.keys(errors).length === 0;
    },

    /**
     * Adds a new custom attribute to the loan type.
     */
    addCustomAttribute() {
      this.formTouched = true;
      if (this.validateNewAttribute()) {
        this.loanType.customAttributes.push({ ...this.newAttribute });
        // Reset the new attribute form
        this.newAttribute = {
          name: '',
          value: null,
          valueType: '%',
          chargeType: 'One-Time',
          oneTimeTiming: 'Immediately',
          oneTimePeriodValue: null,
          oneTimePeriodUnit: 'Days'
        };
        this.showAddAttributeForm = false;
        this.validateForm(); // Re-validate main form after adding attribute
      } else {
        alert.warning('Please correct the attribute validation errors.');
      }
    },

    /**
     * Removes a custom attribute by its index.
     * @param {number} index - The index of the attribute to remove.
     */
    removeCustomAttribute(index) {
      this.loanType.customAttributes.splice(index, 1);
      this.validateForm(); // Re-validate after removing attribute
    },

    /**
     * Validates the entire loan type form.
     * @param {boolean} displayErrors - Whether to update the errors object for display.
     * @returns {object} An object containing validation errors.
     */
    validateForm(displayErrors = true) {
      const errors = {};

      if (!this.loanType.name) {
        errors.name = 'Loan name is required.';
      }
      if (this.loanType.minAmount === null || this.loanType.minAmount === '') {
        errors.minAmount = 'Minimum amount is required.';
      } else if (isNaN(this.loanType.minAmount) || parseFloat(this.loanType.minAmount) < 0) {
        errors.minAmount = 'Minimum amount must be a non-negative number.';
      }
      if (this.loanType.maxAmount === null || this.loanType.maxAmount === '') {
        errors.maxAmount = 'Maximum amount is required.';
      } else if (isNaN(this.loanType.maxAmount) || parseFloat(this.loanType.maxAmount) < 0) {
        errors.maxAmount = 'Maximum amount must be a non-negative number.';
      } else if (parseFloat(this.loanType.minAmount) > parseFloat(this.loanType.maxAmount)) {
        errors.maxAmount = 'Maximum amount cannot be less than minimum amount.';
      }
      if (this.loanType.maxTerm === null || this.loanType.maxTerm === '') {
        errors.maxTerm = 'Loan term is required.';
      } else if (isNaN(this.loanType.maxTerm) || parseInt(this.loanType.maxTerm) <= 0) {
        errors.maxTerm = 'Loan term must be a positive integer.';
      }
      // if (this.loanType.approvers.length === 0) {
      //   errors.approvers = 'At least one approver is required.';
      // }

      if (displayErrors) {
        // Clear old errors that are no longer valid and add new ones
        this.errors = { ...errors };
      }
      return errors;
    },

    /**
     * Submits the loan type form to either create or update a loan type.
     */
    async submitLoanType() {
      this.formTouched = true; // Mark form as touched to show all errors
      this.loading = true;
      this.errors = {}; // Clear previous errors

      // Validate the main form
      const mainFormErrors = this.validateForm(true);

      if (Object.keys(mainFormErrors).length > 0) {
        alert.warning('Please correct the validation errors before submitting.');
        this.loading = false;
        return;
      }

      try {
        // Prepare the payload for the API call
        const payload = {
          classification: this.loanType.classification,
          name: this.loanType.name,
          description: this.loanType.description,
          minAmount: parseFloat(this.loanType.minAmount),
          maxAmount: parseFloat(this.loanType.maxAmount),
          maxTerm: parseInt(this.loanType.maxTerm),
          termUnit: this.loanType.termUnit,
          // Extract only IDs for approvers for the backend
          approverUserIds: this.loanType.approvers.map(user => user.id),
          customAttributes: this.loanType.customAttributes.map(attr => ({
            name: attr.name,
            value: parseFloat(attr.value),
            valueType: attr.valueType,
            chargeType: attr.chargeType,
            oneTimeTiming: attr.oneTimeTiming,
            oneTimePeriodValue: attr.oneTimePeriodValue ? parseInt(attr.oneTimePeriodValue) : null,
            oneTimePeriodUnit: attr.oneTimePeriodUnit,
          }))
        };

        if (this.isEditMode) {
          // Update loan type
          await loanTypeApi.update(this.loanTypeId, payload);
          alert.success('Loan Type updated successfully!');
        } else {
          // Create new loan type
          await loanTypeApi.create(payload);
          alert.success('Loan Type created successfully!');
        }

        // Redirect to the loan types list or reset form for new entry
        this.$router.push({ name: 'forms_entry', query: { menu: 'New Product Definition' } });
      } catch (error) {
        console.error('Error submitting loan type:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          // Assuming backend returns validation errors in error.response.data.errors
          this.errors = { ...this.errors, ...error.response.data.errors };
          alert.warning('Validation errors occurred. Please check the form.');
        } else {
          alert.error(`Submission failed. Please try again. ${error.message}`);
        }
      } finally {
        this.loading = false;
      }
    },

    /**
     * Resets the form to its initial state.
     */
    resetForm() {
      this.loanTypeId = null;
      this.loanType = {
        classification: 'Cash',
        name: '',
        description: '',
        minAmount: null,
        maxAmount: null,
        maxTerm: null,
        termUnit: 'Weeks',
        customAttributes: [],
        approvers: []
      };
      this.selectedUsersToAdd = [];
      this.showAddAttributeForm = false;
      this.newAttribute = {
        name: '',
        value: null,
        valueType: '%',
        chargeType: 'One-Time',
        oneTimeTiming: 'Immediately',
        oneTimePeriodValue: null,
        oneTimePeriodUnit: 'Days'
      };
      this.errors = {};
      this.loading = false;
      this.formTouched = false;
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