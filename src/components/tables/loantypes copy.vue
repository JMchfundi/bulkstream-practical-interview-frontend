<template>
  <div>
    <!-- Header and Actions -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
      <h2 class="text-primary m-0">
        <i class="bi bi-table me-2"></i>
      </h2>
      <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
        <input v-model="searchTerm" type="text" class="form-control me-md-2" placeholder="Search loan types..." style="max-width: 250px;" />
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-gear"></i> Actions
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#" @click.prevent="fetchLoanTypes"><i class="bi bi-arrow-repeat me-2"></i> Refresh</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="exportCSV"><i class="bi bi-download me-2"></i> Export CSV</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Spinner & Error -->
    <div v-if="loading" class="text-center py-3">
      <b-spinner small />
      <p class="mt-2">Loading loan types...</p>
    </div>
    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">{{ error }}</b-alert>

    <!-- Table -->
    <b-table v-if="!loading" :items="paginatedLoanTypes" :fields="fields" :current-page="currentPage" :per-page="perPage"
      :empty-text="error || 'No loan types found.'" responsive hover striped small>

      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <template #cell(approvers)="data">
        <a href="#" @click.prevent="showApprovers(data.item)">{{ data.item.approvers?.length || 0 }}</a>
      </template>

      <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary" @click="viewLoanType(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template>
    </b-table>

    <!-- Pagination -->
    <b-pagination v-model="currentPage" :total-rows="filteredLoanTypes.length" :per-page="perPage" :align="center" class="mt-3" />

    <!-- Modals -->
    <LoanTypeDetailsModal v-model="showDetailsModal" :loanType="selectedLoanType" />
    <ApproversModal v-model="showApproversModal" :approvers="currentApprovers" />
  </div>
</template>

<script>
import loanTypeApi from '@/api/loanTypeApi';
import LoanTypeDetailsModal from '@/components/modals/LoanTypeDetailsModal.vue';
import ApproversModal from '@/components/modals/ApproversModal.vue';

export default {
  components: { LoanTypeDetailsModal, ApproversModal },
  data() {
    return {
      loanTypes: [],
      searchTerm: '',
      loading: false,
      error: '',
      currentPage: 1,
      perPage: 10,
      selectedLoanType: null,
      showDetailsModal: false,
      showApproversModal: false,
      currentApprovers: [],
      fields: [
        { key: 'index', label: '#' },
        { key: 'name', label: 'Loan Type' },
        { key: 'description', label: 'Description' },
        { key: 'approvers', label: 'Approvers' },
        { key: 'actions', label: 'Actions' }
      ]
    };
  },
  computed: {
    filteredLoanTypes() {
      const term = this.searchTerm.toLowerCase();
      return this.loanTypes.filter(l =>
        l.name.toLowerCase().includes(term) || (l.description?.toLowerCase().includes(term))
      );
    },
    paginatedLoanTypes() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredLoanTypes.slice(start, start + this.perPage);
    }
  },
  mounted() {
    this.fetchLoanTypes();
  },
  methods: {
    fetchLoanTypes() {
      this.loading = true;
      this.error = '';
      loanTypeApi.getAll()
        .then(res => {
          this.loanTypes = res.data || [];
        })
        .catch(() => {
          this.error = 'Failed to load loan types.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    viewLoanType(loanType) {
      this.selectedLoanType = loanType;
      this.showDetailsModal = true;
    },
    showApprovers(loanType) {
      this.currentApprovers = loanType.approvers || [];
      this.showApproversModal = true;
    },
    exportCSV() {
      const csvContent = [
        ['Name', 'Description', 'Approvers Count'],
        ...this.filteredLoanTypes.map(l => [l.name, l.description, l.approvers?.length || 0])
      ].map(e => e.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'loan_types.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>
