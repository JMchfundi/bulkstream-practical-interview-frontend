<template>
  <div>
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
      <h2 class="text-primary m-0">
        <i class="bi bi-table me-2"></i> Client List
      </h2>
      <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
        <input v-model="searchTerm" type="text" class="form-control me-md-2" placeholder="Search clients..." style="max-width: 250px;" />
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

    <div v-if="loading" class="text-center py-3">
      <b-spinner small />
    </div>
    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">{{ error }}</b-alert>

    <b-table
      v-if="!loading"
      :items="paginatedAndFilteredClients"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :empty-text="error || 'No clients found.'"
      responsive
      hover
      striped
      small
    >
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <template #cell(fullName)="data">
        <div class="d-flex align-items-center">
          <img
            v-if="data.item.passportPhotoDisplayUrl"
            :src="`${apiBaseUrl}${data.item.passportPhotoDisplayUrl}`"
            class="rounded-circle me-2 client-photo-sm"
          />
          <span>{{ data.item.fullName }}</span>
        </div>
      </template>

      <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary" @click="viewClient(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="filteredClients.length"
      :per-page="perPage"
      :align="center"
      class="mt-3"
    />

    <ClientDetailsModal v-model="showModal" :client="selectedClient" />
  </div>
</template>

<script>
import clientApi from '@/api/clientApi';
import groupApi from '@/api/groupApi';
import officerApi from '@/api/officerApi';
import stationApi from '@/api/stationApi';
import ClientDetailsModal from '@/components/modals/ClientDetailsModal.vue';

export default {
  components: { ClientDetailsModal },
  data() {
    return {
      clients: [],
      augmentedClients: [],
      groupsData: [],
      officersData: [],
      stationsData: [],
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
        { key: 'idNumber', label: 'Client ID', sortable: true },
        { key: 'stationName', label: 'Station', sortable: true },
        { key: 'officerName', label: 'Officer', sortable: true },
        { key: 'groupName', label: 'Group', sortable: true },
        { key: 'actions', label: 'Actions' }
      ]
    };
  },
  computed: {
    filteredClients() {
      const term = this.searchTerm.toLowerCase();
      if (!term) return this.augmentedClients;

      return this.augmentedClients.filter(client =>
        (client.fullName && client.fullName.toLowerCase().includes(term)) ||
        (client.idNumber && client.idNumber.toLowerCase().includes(term)) ||
        (client.stationName && client.stationName.toLowerCase().includes(term)) ||
        (client.officerName && client.officerName.toLowerCase().includes(term)) ||
        (client.groupName && client.groupName.toLowerCase().includes(term))
      );
    },
    paginatedAndFilteredClients() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredClients.slice(start, start + this.perPage);
    }
  },
  methods: {
    async fetchClients() {
      this.loading = true;
      this.error = '';
      try {
        const [clientRes, groupRes, officerRes, stationRes] = await Promise.all([
          clientApi.getAll(),
          groupApi.getAll(),
          officerApi.getAll(),
          stationApi.getAll(),
        ]);

        this.clients = clientRes.data || [];
        this.groupsData = groupRes.data || [];
        this.officersData = officerRes.data || [];
        this.stationsData = stationRes.data || [];

        this.augmentedClients = this.clients.map(client => {
          const group = this.groupsData.find(g => g.id === client.groupId);
          const officer = group ? this.officersData.find(o => o.id === group.officerId) : null;
          const station = officer ? this.stationsData.find(s => s.id === officer.stationId) : null;

          return {
            ...client,
            groupName: group ? group.groupName : 'N/A',
            officerName: officer ? officer.fullName : 'N/A',
            stationName: station ? station.stationName : 'N/A',
            passportPhotoDisplayUrl: client.documents?.[0]?.fileUrl || null,
          };
        });

      } catch (e) {
        this.error = `Failed to load data: ${e.message || 'Unknown error'}`;
        console.error("Error fetching data:", e);
      } finally {
        this.loading = false;
      }
    },
    viewClient(client) {
      this.selectedClient = client;
      this.showModal = true;
    },
    exportCSV() {
      if (!this.filteredClients.length) {
        alert("No data to export.");
        return;
      }

      const visibleFields = this.fields.filter(f => f.key !== 'actions' && f.key !== 'index');
      let csvContent = visibleFields.map(field => field.label).join(',') + "\r\n";

      this.filteredClients.forEach(item => {
        const row = visibleFields.map(field => {
          return `"${String(item[field.key] ?? '').replace(/"/g, '""')}"`;
        }).join(',');
        csvContent += row + "\r\n";
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'clients_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  mounted() {
    this.fetchClients();
  }
};
</script>

<style scoped>
.client-photo-sm {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border: 1px solid #ccc;
}
</style>
