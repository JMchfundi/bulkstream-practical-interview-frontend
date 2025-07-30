<template>
  <div>
    <!-- Header and Actions -->
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <input v-model="searchTerm" class="form-control" style="max-width: 250px" placeholder="Search loans..." />
      <div>
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i class="bi bi-gear"></i> Actions
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="fetchApprovedLoans" :class="{ disabled: loading }">
                <i class="bi bi-arrow-repeat me-2"></i> Refresh
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="exportCSV" :class="{ disabled: loading }">
                <i class="bi bi-download me-2"></i> Export CSV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Loading and Error States -->
    <div v-if="loading" class="text-center my-4">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">
      {{ error }}
    </b-alert>

    <!-- Loans Table -->
    <b-table v-if="!loading" :items="filteredLoans" :fields="fields" :current-page="currentPage" :per-page="perPage"
      :sort-by.sync="sortKey" :sort-desc.sync="sortDesc" :empty-text="error || 'No approved loans found.'" responsive
      hover striped small>
      <!-- Index -->
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <!-- Principal Amount -->
      <template #cell(principalAmount)="data">
        {{ formatCurrency(data.item.principalAmount) }}
      </template>

      <!-- Approval Status -->
      <template #cell(approvalStatus)="data">
        <span class="badge bg-success">{{ data.item.approvalStatus }}</span>
      </template>

      <!-- Disbursement Status -->
      <template #cell(disbursementStatus)="data">
        <span :class="{
          'badge bg-secondary': !data.item.disbursementStatus || data.item.disbursementStatus === 'PENDING',
          'badge bg-success': data.item.disbursementStatus === 'DISBURSED'
        }">
          {{ data.item.disbursementStatus || 'PENDING' }}
        </span>
      </template>

      <!-- Account Dropdown -->
      <template #cell(account)="data">
        <select class="form-select form-select-sm" v-model="selectedAccounts[data.item.id]"
          :disabled="data.item.disbursementStatus === 'DISBURSED'">
          <option disabled value="">-- Select --</option>
          <option v-for="account in disbursementAccounts" :key="account.id" :value="account.id">
            {{ account.name }}
          </option>
        </select>
      </template>

      <!-- Actions -->
      <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary me-3" @click="viewLoan(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
        <button class="btn btn-sm btn-success" @click="disburseLoan(data.item)"
          :disabled="data.item.disbursementStatus === 'DISBURSED'">
          <i class="bi bi-cash-coin"></i>
          {{ data.item.disbursementStatus === 'DISBURSED' ? 'Disbursed' : 'Disburse' }}
        </button>
      </template>
    </b-table>

    <!-- Loan Details Modal -->
    <LoanDetailsModal v-model="showModal" :loan="selectedLoan" />

    <!-- Pagination -->
    <b-pagination v-model="currentPage" :total-rows="filteredLoans.length" :per-page="perPage" :align="center"
      class="mt-3" />
  </div>
</template>

<script>
import loanApi from '@/api/loanApi';
import accountApi from '@/api/accountApi';
import LoanDetailsModal from '@/components/modals/LoanDetailsModal.vue';

export default {
  components: {
    LoanDetailsModal
  },
  data() {
    return {
      loans: [],
      accounts: [],
      selectedAccounts: {}, // Track selected account per loan
      loading: false,
      error: '',
      searchTerm: '',
      sortKey: 'creationDate',
      sortDesc: true,
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: 'index', label: '#', sortable: false },
        { key: 'idNumber', label: 'ID Number', sortable: true },
        { key: 'principalAmount', label: 'Principal', sortable: true },
        { key: 'approvalStatus', label: 'Approval Status' },
        { key: 'disbursementStatus', label: 'Disbursement' },
        { key: 'account', label: 'Account' },
        { key: 'actions', label: 'Actions' }
      ],
      showModal: false,
      selectedLoan: null
    };
  },
  computed: {
    filteredLoans() {
      const term = this.searchTerm.toLowerCase();
      return this.loans.filter(loan =>
        Object.values(loan).some(value =>
          (value ?? '').toString().toLowerCase().includes(term)
        )
      );
    },
    disbursementAccounts() {
      const allowed = ['CASH', 'BANK', 'MPESA'];
      return this.accounts.filter(a =>
        allowed.includes((a.accountCategory || '').toUpperCase())
      );
    }
  },
  methods: {
    viewLoan(loan) {
      this.selectedLoan = loan;
      this.showModal = true;
    },
    formatCurrency(value) {
      if (value == null) return '-';
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
      }).format(value);
    },
    fetchApprovedLoans() {
      this.loading = true;
      this.error = '';
      loanApi
        .getApproved()
        .then(res => {
          this.loans = res.data;
        })
        .catch(() => {
          this.error = 'Failed to load loans.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchAccounts() {
      accountApi.getAll()
        .then(res => {
          this.accounts = res.data || [];
        })
        .catch(() => {
          this.error = 'Failed to load accounts.';
        });
    },
    disburseLoan(loan) {
      if (loan.disbursementStatus === 'DISBURSED') return;

      const accountId = this.selectedAccounts[loan.id];
      if (!accountId) {
        this.error = 'Please select an account before disbursing.';
        return;
      }

      loanApi.disburseLoan(loan.id, parseInt(accountId))
        .then(() => {
          loan.disbursementStatus = 'DISBURSED';
        })
        .catch(() => {
          this.error = 'Failed to disburse loan.';
        });
    },
    exportCSV() {
      const headers = [
        ['#', 'ID Number', 'Principal', 'Approval Status', 'Disbursement']
      ];
      const rows = this.filteredLoans.map((loan, idx) => [
        idx + 1,
        loan.idNumber,
        this.formatCurrency(loan.principalAmount),
        loan.approvalStatus,
        loan.disbursementStatus || 'PENDING'
      ]);
      const csvContent = [...headers, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'approved_loans.csv';
      link.click();
    }
  },
  mounted() {
    this.fetchApprovedLoans();
    this.fetchAccounts();
  }
};
</script>

<style scoped>
.custom-status-dropdown {
  min-width: 140px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-weight: 500;
  color: #333;
  padding: 2px 6px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.custom-status-dropdown:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  outline: none;
}
</style>
