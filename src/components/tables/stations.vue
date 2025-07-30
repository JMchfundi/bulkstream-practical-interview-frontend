<template>
  <div>
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
      <h2 class="text-primary m-0">
        <i class="bi bi-building me-2"></i>
      </h2>
      <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
        <input v-model="searchTerm" type="text" class="form-control me-md-2" placeholder="Search stations..." style="max-width: 250px;" />
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-gear"></i> Actions
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#" @click.prevent="fetchStations"><i class="bi bi-arrow-repeat me-2"></i> Refresh</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="exportCSV"><i class="bi bi-download me-2"></i> Export CSV</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-3">
      <b-spinner small />
      <p class="mt-2">Loading stations...</p>
    </div>
    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">{{ error }}</b-alert>

    <b-table
      v-if="!loading"
      :items="paginatedStations"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :empty-text="error || 'No stations found.'"
      responsive
      hover
      striped
      small
    >
      <template #cell(index)="data">
        {{ (currentPage - 1) * perPage + data.index + 1 }}
      </template>

      <template #cell(groups)="data">
        <span class="text-primary fw-bold" role="button" @click="openGroupsModal(data.item.groups)" style="cursor: pointer;">
          {{ data.item.groups?.length || 0 }}
        </span>
      </template>

      <template #cell(officeLinkedToName)="data">
        {{ getOfficeLinkedToName(data.item.parentId) }}
      </template>

      <template #cell(actions)="data">
        <button class="btn btn-sm btn-outline-primary" @click="viewStation(data.item)">
          <i class="bi bi-eye"></i> View
        </button>
      </template>
    </b-table>

    <b-pagination v-model="currentPage" :total-rows="sortedStations.length" :per-page="perPage" class="mt-3" />

    <StationDetailsModal v-model="showModal" :station="selectedStation" />
    <StationGroupsModal v-model="showGroupsModal" :groups="selectedGroups" />
  </div>
</template>

<script>
import stationApi from '@/api/stationApi';
import StationDetailsModal from '@/components/modals/StationDetailsModal.vue';
import StationGroupsModal from '@/components/modals/StationGroupsModal.vue';

export default {
  components: {
    StationDetailsModal,
    StationGroupsModal
  },
  data() {
    return {
      stations: [],
      allStationsMap: new Map(), // Stores ID -> Name for all stations
      searchTerm: '',
      loading: false,
      error: '',
      currentPage: 1,
      perPage: 10,
      selectedStation: null,
      selectedGroups: [],
      showModal: false,
      showGroupsModal: false,
      fields: [
        { key: 'index', label: '#', sortable: false },
        { key: 'stationName', label: 'Station Name', sortable: true },
        { key: 'levelType', label: 'Level Type', sortable: true },
        { key: 'officeLinkedToName', label: 'Office Linked To', sortable: true }, // Field for the resolved name
        { key: 'groups', label: 'Groups' },
        { key: 'actions', label: 'Actions' }
      ]
    };
  },
  computed: {
    filteredStations() {
      const term = this.searchTerm.toLowerCase();
      return this.stations.filter(station =>
        Object.values(station).some(val => (val ?? '').toString().toLowerCase().includes(term)) ||
        // Include search by the resolved parent name
        this.getOfficeLinkedToName(station.parentId).toLowerCase().includes(term)
      );
    },
    sortedStations() {
      return this.filteredStations;
    },
    paginatedStations() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.sortedStations.slice(start, start + this.perPage);
    }
  },
  methods: {
    fetchStations() {
      this.loading = true;
      this.error = '';
      stationApi.getAll()
        .then(res => {
          this.stations = res.data || [];
          // Crucial step: Populate the map with ID -> Name for all stations
          this.allStationsMap = new Map(this.stations.map(station => [station.id, station.stationName]));
        })
        .catch(() => {
          this.error = 'Failed to load stations.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // Method to get the name of the linked office from its ID
    getOfficeLinkedToName(parentId) {
      if (!parentId) {
        return 'N/A'; // No parent ID
      }
      // Use the map to look up the name; fallback if ID not found (shouldn't happen if data is consistent)
      return this.allStationsMap.get(parentId) || 'Unknown Office';
    },
    viewStation(station) {
      this.selectedStation = station;
      this.showModal = true;
    },
    openGroupsModal(groups = []) {
      this.selectedGroups = groups;
      this.showGroupsModal = true;
    },
    exportCSV() {
      const csvContent = [
        ['Station Name', 'Level Type', 'Office Linked To', 'Groups'],
        ...this.sortedStations.map(s => [
          s.stationName,
          s.levelType,
          this.getOfficeLinkedToName(s.parentId), // Use the method to get the name for CSV
          s.groups?.length || 0
        ])
      ].map(e => e.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'stations.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  mounted() {
    this.fetchStations();
  }
};
</script>

<style scoped>
/* Your existing styles here */
.progress-container {
  position: relative;
  height: 20px;
}

.progress-line {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
}

.progress {
  background-color: #3c8dbc;
  height: 100%;
  border-radius: 5px;
}

.step-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
}

.step-labels .active {
  font-weight: bold;
}
</style>