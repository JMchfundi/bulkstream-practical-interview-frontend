<template>
  <div class="card">
    <div class="card-body">
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 class="text-primary m-0">
          <i class="bi bi-person-lines-fill me-2"></i>
        </h2>
        <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
          <input v-model="searchTerm" type="text" class="form-control me-md-2" placeholder="Search loans..."
            style="max-width: 250px;" />
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-gear"></i> Actions
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#" @click.prevent="fetchloans">
                  <i class="bi bi-arrow-repeat me-2"></i> Refresh
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="exportCSV">
                  <i class="bi bi-download me-2"></i> Export CSV
                </a>
              </li>
              <li>
                <button class="dropdown-item" :disabled="Object.keys(editedloans).length === 0" @click="saveAllEdits">
                  <i class="bi bi-upload me-2"></i> Update
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Loading loans...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="alert alert-danger text-center">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ error }}
      </div>

      <!-- No Results -->
      <div v-else-if="!loading && paginatedloans.length === 0" class="text-center py-4 text-muted">
        <i class="bi bi-info-circle me-2"></i>No loans found.
      </div>

      <!-- Table -->
      <div v-else class="table-responsive">
  <table class="table table-striped table-hover align-middle">
    <thead class="table-primary text-center">
      <tr>
        <th @click="sortBy('index')">#</th>
        <th @click="sortBy('idNumber')">ID Number</th>
        <th @click="sortBy('loanType')">Loan Type</th>
        <th @click="sortBy('loanTerm')">Loan Term</th>
        <th @click="sortBy('termUnit')">Term Unit</th>
        <th @click="sortBy('paymentMethods')">Payment Methods</th>
        <th @click="sortBy('repaymentAccount')">Repayment Account</th>
        <th @click="sortBy('principalAmount')">Principal Amount</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(loan, index) in paginatedloans" :key="loan.id" class="text-center">
        <td>{{ index + 1 + (currentPage - 1) * perPage }}</td>

        <!-- ID Number -->
        <td v-if="editingRows[loan.id]">
          <input v-model="editedloans[loan.id].idNumber" class="form-control form-control-sm" />
        </td>
        <td v-else>{{ loan.idNumber }}</td>

        <!-- Loan Type -->
        <td v-if="editingRows[loan.id]">
          <input v-model="editedloans[loan.id].loanType" class="form-control form-control-sm" />
        </td>
        <td v-else>{{ loan.loanType }}</td>

        <!-- Loan Term -->
        <td v-if="editingRows[loan.id]">
          <input v-model="editedloans[loan.id].loanTerm" class="form-control form-control-sm" type="number" />
        </td>
        <td v-else>{{ loan.loanTerm }}</td>

        <!-- Term Unit -->
        <td v-if="editingRows[loan.id]">
          <input v-model="editedloans[loan.id].termUnit" class="form-control form-control-sm" />
        </td>
        <td v-else>{{ loan.termUnit }}</td>

        <!-- Payment Methods -->
        <td v-if="editingRows[loan.id]">
          <input v-model="editedloans[loan.id].paymentMethods" class="form-control form-control-sm" />
        </td>
        <td v-else>{{ loan.paymentMethods.join(', ') }}</td>

        <!-- Repayment Account -->
        <td v-if="editingRows[loan.id]">
          <input v-model="editedloans[loan.id].repaymentAccount" class="form-control form-control-sm" />
        </td>
        <td v-else>{{ loan.repaymentAccount }}</td>

        <!-- Principal Amount -->
        <td v-if="editingRows[loan.id]">
          <input v-model="editedloans[loan.id].principalAmount" class="form-control form-control-sm" type="number" />
        </td>
        <td v-else>{{ loan.principalAmount }}</td>

        <!-- Actions -->
        <td>
          <div class="btn-group btn-group-sm" role="group">
            <button v-if="!editingRows[loan.id]" class="btn btn-warning" @click="enableEdit(loan)">
              <i class="bi bi-pencil"></i>
            </button>
            <template v-else>
              <button class="btn btn-secondary" @click="cancelEdit(loan.id)">
                <i class="bi bi-x"></i>
              </button>
            </template>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Pagination -->
  <nav aria-label="Page navigation" class="mt-3">
    <ul class="pagination justify-content-center flex-wrap">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" @click.prevent="currentPage--">Previous</a>
      </li>
      <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
        <a class="page-link" @click.prevent="currentPage = page">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" @click.prevent="currentPage++">Next</a>
      </li>
    </ul>
  </nav>
</div>
      <!-- End of Table -->

    </div>
  </div>
</template>

<script>
import loanApi from '@/api/loanApi'; // Import the loan API module
import swal from '@/utils/swal';
import debounce from 'lodash/debounce';

export default {
  name: 'loanTable',
  data() {
    return {
      loans: [],
      loading: false,
      error: '',
      searchTerm: '',
      sortKey: '',
      sortOrder: 1,
      currentPage: 1,
      perPage: 5,
      editingRows: {},
      editedloans: {},
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
    };
  },
  computed: {
    filteredloans() {
      const term = this.searchTerm.toLowerCase();
      return this.loans.filter(loan => {
        return Object.values(loan).some(val =>
          val && val.toString().toLowerCase().includes(term)
        );
      });
    },
    sortedloans() {
      if (!this.sortKey) return this.filteredloans;
      return [...this.filteredloans].sort((a, b) => {
        let x = a[this.sortKey];
        let y = b[this.sortKey];
        if (typeof x === 'string') x = x.toLowerCase();
        if (typeof y === 'string') y = y.toLowerCase();
        return (x > y ? 1 : x < y ? -1 : 0) * this.sortOrder;
      });
    },
    paginatedloans() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.sortedloans.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.sortedloans.length / this.perPage);
    }
  },
  watch: {
    sortedloans() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = 1;
      }
    },
    searchTerm: debounce(function () {
      this.currentPage = 1;
    }, 300)
  },
  mounted() {
    this.fetchloans();
  },
  methods: {
    fetchloans() {
      this.loading = true;
      this.error = '';
      loanApi.getAll()
        .then(response => {
          this.loans = response.data;
          console.log('Loans loaded:', JSON.stringify(this.loans));
        })
        .catch(err => {
          console.error(err);
          this.error = 'Failed to load loans. Please try again later.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    enableEdit(loan) {
      this.$set(this.editingRows, loan.id, true);
      this.$set(this.editedloans, loan.id, { ...loan });
    },
    cancelEdit(loanId) {
      this.$delete(this.editingRows, loanId);
      this.$delete(this.editedloans, loanId);
    },
    async saveAllEdits() {
      const updatedloans = Object.values(this.editedloans);
      if (updatedloans.length === 0) {
        swal.error("No changes to update.");
        return;
      }

      this.loading = true;
      this.error = '';
      try {
        await Promise.all(updatedloans.map(loan => loanApi.update(loan.id, loan)));
        updatedloans.forEach(updated => {
          const index = this.loans.findIndex(c => c.id === updated.id);
          if (index !== -1) {
            this.$set(this.loans, index, updated);
          }
        });
        this.editingRows = {};
        this.editedloans = {};
        swal.success("Updated successfully!");
      } catch (err) {
        console.error(err);
        swal.error("Update failed.");
        this.error = 'Update failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    exportCSV() {
      const csvContent = [
        ['Full Name', 'Email', 'Phone', 'ID Number', 'Gender', 'County', 'Sub-County'],
        ...this.sortedloans.map(c => [
          c.fullName, c.email, c.phoneNumber, c.idNumber, c.gender, c.county, c.subCounty
        ])
      ]
        .map(e => e.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'loans.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>

<style scoped>
.table th {
  cursor: pointer;
}

@media (max-width: 576px) {
  h2.text-primary {
    font-size: 1.25rem;
    text-align: center;
  }
}

img.rounded-circle {
  object-fit: cover;
}
</style>
