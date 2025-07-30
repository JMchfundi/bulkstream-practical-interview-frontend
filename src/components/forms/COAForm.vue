<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitForm" novalidate>
          <div class="row g-3">

            <!-- Account Name -->
            <div class="col-md-6">
              <label class="form-label">Account Name</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-book"></i></span>
                <input v-model="form.name" type="text" class="form-control" placeholder="Enter account name"
                  :class="{ 'is-invalid': errors.name }">
              </div>
              <div v-if="errors.name" class="invalid-feedback d-block">{{ errors.name }}</div>
            </div>

            <!-- Account Code -->
            <div class="col-md-6">
              <label class="form-label">Account Code</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-code-slash"></i></span>
                <input v-model="form.code" type="text" class="form-control" placeholder="Enter account code"
                  :class="{ 'is-invalid': errors.code }">
              </div>
              <div v-if="errors.code" class="invalid-feedback d-block">{{ errors.code }}</div>
            </div>

            <!-- Account Type -->
            <div class="col-md-6">
              <label class="form-label">Account Type</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-tag-fill"></i></span>
                <select v-model="form.type" class="form-control" :class="{ 'is-invalid': errors.type }">
                  <option value="">Select type</option>
                  <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
                </select>
              </div>
              <div v-if="errors.type" class="invalid-feedback d-block">{{ errors.type }}</div>
            </div>

            <!-- Parent Account -->
            <div class="col-md-6">
              <label class="form-label">Parent Account</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-diagram-3"></i></span>
                <select v-model="form.parentAccount" class="form-control">
                  <option value="">None</option>
                  <option v-for="account in parentAccounts" :key="account.id" :value="account.name">{{ account.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Opening Balance -->
            <div class="col-md-6">
              <label class="form-label">Opening Balance</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                <input v-model="form.openingBalance" type="number" class="form-control" placeholder="0.00"
                  :class="{ 'is-invalid': errors.openingBalance }">
              </div>
              <div v-if="errors.openingBalance" class="invalid-feedback d-block">{{ errors.openingBalance }}</div>
            </div>

            <!-- Currency -->
            <div class="col-md-6">
              <label class="form-label">Currency</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-cash-coin"></i></span>
                <select v-model="form.currency" class="form-control" :class="{ 'is-invalid': errors.currency }">
                  <option value="">Select currency</option>
                  <option v-for="cur in currencies" :key="cur" :value="cur">{{ cur }}</option>
                </select>
              </div>
              <div v-if="errors.currency" class="invalid-feedback d-block">{{ errors.currency }}</div>
            </div>

            <!-- Status -->
            <div class="col-md-6">
              <label class="form-label">Status</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-toggle-on"></i></span>
                <select v-model="form.status" class="form-control">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary px-5 rounded-pill" :disabled="loading">
              <i class="bi bi-save me-2" v-if="!loading"></i>
              <div class="spinner-border spinner-border-sm me-2" v-else></div>
              {{ loading ? 'Saving...' : 'Save Account' }}
            </button>
          </div>

          <div v-if="errors.general" class="alert alert-danger mt-3 text-center">
            {{ errors.general }}
          </div>

        </form>

        <COA></COA>
      </div>
    </div>
  </div>
</template>

<script>
import accountApi from '@/api/accountApi';
import swal from '@/utils/swal';
import COA from "../../components/tables/coa.vue";

export default {
  name: 'NewChartOfAccountForm',
  components: {
    COA,
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        type: '',
        parentAccount: '',
        openingBalance: '',
        currency: '',
        status: 'Active',
      },
      errors: {},
      types: ['ASSET',
        'LIABILITY',
        'INCOME',
        'EXPENSE',
        'EQUITY'],
      currencies: ['KES', 'USD', 'EUR'],
      parentAccounts: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchParentAccounts();
  },
  methods: {
    fetchParentAccounts() {
      accountApi.getAll() // Assume this fetches existing accounts
        .then(res => {
          this.parentAccounts = res.data;
        })
        .catch(err => {
          console.error('Failed to load parent accounts', err);
        });
    },
    validateForm() {
      const errors = {};
      if (!this.form.name) errors.name = 'Account name is required.';
      if (!this.form.code) errors.code = 'Account code is required.';
      if (!this.form.type) errors.type = 'Please select account type.';
      if (!this.form.openingBalance && this.form.openingBalance !== 0) errors.openingBalance = 'Enter opening balance.';
      if (!this.form.currency) errors.currency = 'Please select a currency.';
      return errors;
    },
    async submitForm() {
      this.errors = this.validateForm();
      if (Object.keys(this.errors).length > 0) return;

      this.loading = true;

      try {
        await accountApi.create(this.form);
        swal.success('Chart of Account created successfully!');
        this.resetForm();
      } catch (err) {
        this.errors.general = 'Failed to create account.';
        swal.error('Account creation failed');
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        name: '',
        code: '',
        type: '',
        parentAccount: '',
        openingBalance: '',
        currency: '',
        status: 'Active',
      };
    }
  }
};
</script>
