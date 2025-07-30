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
              <a class="dropdown-item" href="#" @click.prevent="fetchLoansPendingApproval"
                :class="{ disabled: loading }">
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
      :sort-by.sync="sortKey" :sort-desc.sync="sortDesc" :empty-text="error || 'No pending loans found.'" responsive
      hover striped small>

      <!-- Numeric index -->
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <!-- ID Number -->
      <template #cell(idNumber)="data">
        {{ data.item.idNumber }}
      </template>

      <!-- Principal Amount -->
      <template #cell(principalAmount)="data">
        {{ formatCurrency(data.item.principalAmount) }}
      </template>

      <!-- Approval Status Badge -->
      <template #cell(approvalStatus)="data">
        <span :class="{
          'badge bg-warning text-dark': data.item.approvalStatus === 'PENDING',
          'badge bg-success': data.item.approvalStatus === 'APPROVED',
          'badge bg-danger': data.item.approvalStatus === 'REJECTED'
        }">
          {{ data.item.approvalStatus }}
        </span>
      </template>

      <!-- Update Status Dropdown -->
      <template #cell(updateStatus)="data">
        <select class="form-select form-select-sm custom-status-dropdown" v-model="data.item.approvalStatus"
          @change="updateApprovalStatus(data.item)">
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </template>


      <!-- Actions -->
      <!-- <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary" @click="viewLoan(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template> -->

    </b-table>

    <!-- Loan Details Modal -->
    <LoanDetailsModal v-model="showModal" :loan="selectedLoan" />

    <!-- Pagination -->
    <b-pagination v-model="currentPage" :total-rows="filteredLoans.length" :per-page="perPage" align="center"
      class="mt-3" />
  </div>
</template>

<script>
import loanApi from '@/api/loanApi';
import userApi from '@/api/userApi';
import LoanDetailsModal from '@/components/modals/LoanDetailsModal.vue';

export default {
  components: {
    LoanDetailsModal
  },
  data() {
    return {
      loans: [],
      approverId: null,
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
        { key: 'actions', label: 'Loan Details' },
        { key: 'updateStatus', label: 'Update Status' },  // Styled dropdown
        { key: 'approvalStatus', label: 'Status', sortable: true }
      ],
      showModal: false,
      selectedLoan: null,
      statusColors: {
        PENDING: '#FFC107',   // yellow
        APPROVED: '#198754',  // green
        REJECTED: '#DC3545'   // red
      }
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
    fetchLoansPendingApproval() {
      if (!this.approverId) {
        this.error = 'Approver ID is not available.';
        return;
      }

      this.loading = true;
      this.error = '';
      loanApi
        .getPendingApprovalByApprover(this.approverId)
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
    exportCSV() {
      const headers = [
        ['#', 'ID Number', 'Principal', 'Status']
      ];
      const rows = this.filteredLoans.map((loan, idx) => [
        idx + 1,
        loan.idNumber,
        this.formatCurrency(loan.principalAmount),
        loan.approvalStatus
      ]);
      const csvContent = [...headers, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'pending_loans.csv';
      link.click();
    },
    updateApprovalStatus(loan) {
      loanApi.updateApprovalStatus(loan.id, loan)
        .then(() => {
          // Optional: Add success notification
          alert(`Loan ${loan.id} status updated to ${loan.approvalStatus}`);
        })
        .catch(() => {
          this.error = 'Failed to update loan status.';
        });
    },

  },
  mounted() {
    this.loading = true;
    userApi.getCurrentUser()
      .then(res => {
        this.approverId = parseInt(res.data?.id, 10);
        if (!this.approverId) throw new Error("User ID not found");
        return this.fetchLoansPendingApproval();
      })
      .catch(() => {
        this.error = 'Failed to load user info or loans.';
      })
      .finally(() => {
        this.loading = false;
      });
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
