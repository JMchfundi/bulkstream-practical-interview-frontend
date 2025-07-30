<template>
  <div>
    <!-- Header and Actions -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
      <h2 class="text-primary m-0">
        <i class="bi bi-table me-2"></i>
      </h2>
      <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control me-md-2"
          placeholder="Search loans..."
          style="max-width: 250px;"
        />
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
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
    <b-table
      v-if="!loading"
      :items="filteredLoans"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortKey"
      :sort-desc.sync="sortDesc"
      :empty-text="error || 'No approved loans found.'"
      responsive
      hover
      striped
      small
    >
      <!-- Index -->
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <!-- Principal Amount -->
      <template #cell(principalAmount)="data">
        {{ formatCurrency(data.item.principalAmount) }}
      </template>

      <!-- Status Column (approvalStatus) -->
      <template #cell(approvalStatus)="data">
        <span
          :class="{
            'badge bg-success': data.item.approvalStatus === 'APPROVED',
            'badge bg-warning text-dark': data.item.approvalStatus === 'PENDING',
            'badge bg-primary': data.item.approvalStatus === 'DISBURSED'
          }"
        >
          {{ data.item.approvalStatus }}
        </span>
      </template>

      <!-- Actions -->
      <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary" @click="viewLoan(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template>
    </b-table>

    <!-- Loan Details Modal -->
    <LoanDetailsModal v-model="showModal" :loan="selectedLoan" />

    <!-- Pagination -->
    <b-pagination
      v-model="currentPage"
      :total-rows="filteredLoans.length"
      :per-page="perPage"
      :align="center"
      class="mt-3"
    />
  </div>
</template>


<script>
import loanApi from '@/api/loanApi';
import LoanDetailsModal from '@/components/modals/LoanDetailsModal.vue';

export default {
  components: {
    LoanDetailsModal
  },
  data() {
    return {
      loans: [],
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
        { key: 'approvalStatus', label: 'Status' },
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
        .getAll()
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
      const headers = [['#', 'ID Number', 'Principal', 'Status']];
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
      link.download = 'approved_loans.csv';
      link.click();
    }
  },
  mounted() {
    this.fetchApprovedLoans();
  }
};
</script>
