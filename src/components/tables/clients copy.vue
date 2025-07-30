<template>
  <div>
      <!-- Header and Actions -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 class="text-primary m-0">
          <i class="bi bi-table me-2"></i>
        </h2>
        <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
          <input v-model="searchTerm" type="text" class="form-control me-md-2" placeholder="Search groups..." style="max-width: 250px;" />
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-gear"></i> Actions
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#" @click.prevent="fetchClients">
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
    </div>
    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">{{ error }}</b-alert>

    <!-- Table -->
    <b-table
      v-if="!loading"
      :items="filteredClients"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :empty-text="error || 'No clients found.'"
      responsive
      hover
      striped
      small
    >
      <!-- Index -->
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <!-- Photo -->
      <template #cell(photo)="data">
        <a :href="`${apiBaseUrl}${data.item.passportPhotoPath}`" target="_blank" v-if="data.item.passportPhotoPath">
          <img :src="`${apiBaseUrl}${data.item.passportPhotoPath}`" alt="Photo" class="rounded-circle" width="40" height="40" />
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
        <button class="btn btn-sm btn-outline-primary" @click="viewClient(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template>
    </b-table>

    <!-- Pagination -->
    <b-pagination
      v-model="currentPage"
      :total-rows="filteredClients.length"
      :per-page="perPage"
      align="center"
      class="mt-3"
    />

    <!-- Modal -->
    <ClientDetailsModal v-model="showModal" :client="selectedClient" />
  </div>
</template>

<script>
import clientApi from '@/api/clientApi';
import ClientDetailsModal from '@/components/modals/ClientDetailsModal.vue';

export default {
  components: { ClientDetailsModal },
  data() {
    return {
      clients: [],
      loading: false,
      error: '',
      searchTerm: '',
      currentPage: 1,
      perPage: 10,
      showModal: false,
      selectedClient: null,
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
    filteredClients() {
      const term = this.searchTerm.toLowerCase();
      return this.clients.filter(client =>
        Object.values(client).some(val =>
          (val ?? '').toString().toLowerCase().includes(term)
        )
      );
    }
  },
  methods: {
    fetchClients() {
      this.loading = true;
      this.error = '';
      clientApi.getAll()
        .then(res => {
          this.clients = res.data || [];
        })
        .catch(() => {
          this.error = 'Failed to load clients.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    viewClient(client) {
      this.selectedClient = client;
      this.showModal = true;
    }
  },
  mounted() {
    this.fetchClients();
  }
};
</script>

<style scoped>
img.rounded-circle {
  object-fit: cover;
}
</style>
