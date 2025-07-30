<template>
  <div>
    <!-- Header and Actions -->
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
      <h2 class="text-primary m-0">
        <i class="bi bi-person-lines-fill me-2"></i>
      </h2>
      <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
        <input v-model="searchTerm" type="text" class="form-control me-md-2" placeholder="Search officers..."
          style="max-width: 250px;" />
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i class="bi bi-gear"></i> Actions
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="fetchofficers">
                <i class="bi bi-arrow-repeat me-2"></i> Refresh
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="exportCSV">
                <i class="bi bi-download me-2"></i> Export CSV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Spinner & Error -->
    <div v-if="loading" class="text-center py-3">
      <b-spinner small />
      <p class="mt-2">Loading officers...</p>
    </div>
    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">{{ error }}</b-alert>

    <!-- Table -->
    <b-table v-if="!loading" :items="paginatedofficers" :fields="fields" :current-page="currentPage" :per-page="perPage"
      :empty-text="error || 'No officers found.'" responsive hover striped small>
      <!-- Index -->
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <!-- Photo -->
      <template #cell(photo)="data">
        <a :href="`${apiBaseUrl}${data.item.passportPhotoPath}`" target="_blank" v-if="data.item.passportPhotoPath">
          <img :src="`${apiBaseUrl}${data.item.passportPhotoPath}`" alt="Photo" class="rounded-circle" width="40"
            height="40" />
        </a>
        <span v-else class="text-muted">N/A</span>
      </template>

      <!-- ID Document -->
      <template #cell(idDocument)="data">
        <a :href="`${apiBaseUrl}${data.item.idDocumentPath}`" target="_blank" v-if="data.item.idDocumentPath">
          <i class="bi bi-file-earmark-text fs-5 text-primary"></i>
        </a>
        <span v-else class="text-muted">N/A</span>
      </template>

      <!-- Actions -->
      <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary" @click="viewOfficer(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template>
    </b-table>

    <!-- Pagination -->
    <b-pagination v-model="currentPage" :total-rows="sortedofficers.length" :per-page="perPage" :align="center"
      class="mt-3" />

    <!-- Modal -->
    <OfficerDetailsModal v-model="showModal" :officer="selectedOfficer" />
  </div>
</template>

<script>
import officerApi from '@/api/officerApi';
import OfficerDetailsModal from '@/components/modals/OfficerDetailsModal.vue';

export default {
  components: {
    OfficerDetailsModal
  },
  data() {
    return {
      officers: [],
      searchTerm: '',
      loading: false,
      error: '',
      currentPage: 1,
      perPage: 10,
      selectedOfficer: null,
      showModal: false,
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
      fields: [
        { key: 'index', label: '#', sortable: false },
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'idNumber', label: 'ID Number', sortable: true },
        { key: 'photo', label: 'Photo' },
        { key: 'idDocument', label: 'ID Document' },
        { key: 'actions', label: 'Actions' }
      ]
    };
  },
  computed: {
    filteredofficers() {
      const term = this.searchTerm.toLowerCase();
      return this.officers.filter(officer =>
        Object.values(officer).some(val =>
          (val ?? '').toString().toLowerCase().includes(term)
        )
      );
    },
    sortedofficers() {
      return this.filteredofficers;
    },
    paginatedofficers() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.sortedofficers.slice(start, start + this.perPage);
    }
  },
  methods: {
    fetchofficers() {
      this.loading = true;
      this.error = '';
      officerApi.getAll()
        .then(res => {
          this.officers = res.data || [];
        })
        .catch(() => {
          this.error = 'Failed to load officers.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    exportCSV() {
      const csvContent = [
        ['Full Name', 'ID Number'],
        ...this.sortedofficers.map(o => [o.fullName, o.idNumber])
      ].map(e => e.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'officers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    viewOfficer(officer) {
      this.selectedOfficer = officer;
      this.showModal = true;
    }
  },
  mounted() {
    this.fetchofficers();
  }
};

</script>

<style scoped>
img.rounded-circle {
  object-fit: cover;
}
</style>
