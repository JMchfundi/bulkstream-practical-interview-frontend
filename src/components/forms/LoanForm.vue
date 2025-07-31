<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Historical Calculations</h2>

        <div class="mb-4 row g-3 align-items-center">
          <div class="col-md-8">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Search by any field..."
                class="form-control"
              />
            </div>
          </div>
          <div class="col-md-4">
            <select v-model.number="pageSize" @change="fetchCalculations" class="form-select">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Loading calculations...</p>
        </div>
        <div v-else-if="errorMessage" class="alert alert-danger mt-4" role="alert">
          {{ errorMessage }}
        </div>
        <div v-else-if="calculations.length === 0" class="alert alert-info mt-4" role="alert">
          No historical calculations found.
        </div>
        <div v-else class="table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead class="table-light">
              <tr>
                <th @click="changeSort('volume')" class="cursor-pointer">
                  Volume (L)
                  <i v-if="sortBy === 'volume'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                </th>
                <th @click="changeSort('density')" class="cursor-pointer">
                  Density (kg/m³)
                  <i v-if="sortBy === 'density'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                </th>
                <th @click="changeSort('temperature')" class="cursor-pointer">
                  Temp (°C)
                  <i v-if="sortBy === 'temperature'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                </th>
                <th @click="changeSort('vcf')" class="cursor-pointer">
                  VCF
                  <i v-if="sortBy === 'vcf'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                </th>
                <th @click="changeSort('tonnage')" class="cursor-pointer">
                  Tonnage (MT)
                  <i v-if="sortBy === 'tonnage'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                </th>
                <th @click="changeSort('calculationDate')" class="cursor-pointer">
                  Date
                  <i v-if="sortBy === 'calculationDate'" :class="sortDirection === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="calc in calculations" :key="calc.id">
                <td>{{ calc.volume }}</td>
                <td>{{ calc.density }}</td>
                <td>{{ calc.temperature }}</td>
                <td>{{ calc.vcf }}</td>
                <td>{{ calc.tonnage ? calc.tonnage.toFixed(4) : 'N/A' }}</td>
                <td>{{ new Date(calc.calculationDate).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav v-if="totalPages > 1 && !loading && calculations.length > 0" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ 'disabled': currentPage === 0 }">
              <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page - 1 }">
              <button class="page-link" @click="changePage(page - 1)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage >= totalPages - 1 }">
              <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_BASE_URL = 'http://localhost/api/oil-tonnages'; // Adjust as needed

export default {
  name: 'HistoryView',
  data() {
    return {
      calculations: [],
      loading: false,
      currentPage: 0,
      pageSize: 10,
      totalPages: 0,
      sortBy: 'calculationDate',
      sortDirection: 'desc',
      searchTerm: '',
      errorMessage: '',
      searchTimeout: null,
    };
  },
  mounted() {
    this.fetchCalculations();
  },
  watch: {
    searchTerm: function() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 0; // Reset to first page on new search
        this.fetchCalculations();
      }, 300); // Debounce search
    }
  },
  methods: {
    async fetchCalculations() {
      this.loading = true;
      this.errorMessage = '';
      try {
        let url = `${API_BASE_URL}?page=${this.currentPage}&size=${this.pageSize}&sort=${this.sortBy},${this.sortDirection}`;
        if (this.searchTerm) {
          url = `${API_BASE_URL}/search?searchTerm=${this.searchTerm}&page=${this.currentPage}&size=${this.pageSize}&sort=${this.sortBy},${this.sortDirection}`;
        }
        const response = await axios.get(url);
        this.calculations = response.data.content;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error('Error fetching calculations:', error);
        this.errorMessage = 'Failed to load historical calculations.';
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.currentPage = page;
        this.fetchCalculations();
      }
    },
    changeSort(column) {
      if (this.sortBy === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = column;
        this.sortDirection = 'asc'; // Default to ascending when changing column
      }
      this.fetchCalculations();
    }
  }
};
</script>

<style scoped>
/* Add any specific styles for this component if needed */
.cursor-pointer {
  cursor: pointer;
}
/* Ensure Bootstrap's display utilities work as expected */
.invalid-feedback.d-block {
  display: block !important;
}
</style>