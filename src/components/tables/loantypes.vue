<template>
  <div>
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
      <h2 class="text-primary m-0">
        <i class="bi bi-table me-2"></i>
      </h2>

      <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control me-md-2"
          placeholder="Search loan types..."
          style="max-width: 250px;"
        />

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

    <div v-if="loading" class="text-center py-3">
      <b-spinner small />
      <p class="mt-2">Loading loan types...</p>
    </div>

    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">
      {{ error }}
    </b-alert>

    <b-table
      v-if="!loading"
      :items="filteredLoanTypes" :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :empty-text="error || 'No loan types found.'"
      responsive
      hover
      striped
      small
    >
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <template #cell(approvers)="data">
        <a href="#" @click.prevent="showApprovers(data.item)">
          {{ data.item.approverUserIds?.length || 0 }}
        </a>
      </template>

      <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary" @click="viewLoanType(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="filteredLoanTypes.length" :per-page="perPage"
      align="center"
      class="mt-3"
    />

    <LoanTypeDetailsModal v-model="showDetailsModal" :loanType="selectedLoanType" />
    <ApproversModal v-model="showApproversModal" :approvers="currentApprovers" />
  </div>
</template>

<script>
import loanTypeApi from '@/api/loanTypeApi';
import LoanTypeDetailsModal from '@/components/modals/LoanTypeDetailsModal.vue';
import ApproversModal from '@/components/modals/ApproversModal.vue';

export default {
  components: {
    LoanTypeDetailsModal,
    ApproversModal
  },
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
        { key: 'approvers', label: 'Approvers' }, // Updated key to match the slot name
        { key: 'actions', label: 'Actions' }
      ]
    };
  },
  computed: {
    filteredLoanTypes() {
      const term = this.searchTerm.toLowerCase().trim();
      return this.loanTypes.filter(l =>
        l.name.toLowerCase().includes(term) ||
        (l.description?.toLowerCase().includes(term))
      );
    },
    // The 'paginatedLoanTypes' computed property has been removed.
    // BootstrapVue's b-table will now handle the pagination internally.
  },
  watch: {
    searchTerm() {
      this.currentPage = 1; // Reset page on search
    }
  },
  mounted() {
    this.fetchLoanTypes();
  },
  methods: {
    async fetchLoanTypes() {
      this.loading = true;
      this.error = '';
      try {
        const res = await loanTypeApi.getAll();
        this.loanTypes = res.data || [];
      } catch (err) {
        this.error = 'Failed to load loan types.';
        console.error('Error fetching loan types:', err); // Added console.error for debugging
      } finally {
        this.loading = false;
      }
    },
    viewLoanType(loanType) {
      this.selectedLoanType = loanType;
      this.showDetailsModal = true;
    },
    showApprovers(loanType) {
      this.currentApprovers = loanType.approverUserIds || [];
      this.showApproversModal = true;
    },
    exportCSV() {
      const escape = (value) => {
        if (typeof value !== 'string') return value;
        return `"${value.replace(/"/g, '""')}"`;
      };

      const headers = ['Loan Type', 'Description', 'Approvers Count'];
      const rows = this.filteredLoanTypes.map(l => [
        escape(l.name),
        escape(l.description || ''),
        l.approverUserIds?.length || 0
      ]);

      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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