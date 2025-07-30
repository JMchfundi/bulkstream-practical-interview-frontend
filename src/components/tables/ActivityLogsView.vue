<template>
  <div class="card">
    <div class="card-body">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 class="text-primary m-0">
          <i class="bi bi-clock-history me-2"></i> User Activity Logs
        </h2>
        <div class="d-flex flex-wrap gap-2 w-100 justify-content-md-end">
          <input v-model="searchTerm" type="text" class="form-control me-md-2" placeholder="Search..."
            style="max-width: 250px;" />
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-gear"></i> Actions
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" @click.prevent="fetchLogs"><i class="bi bi-arrow-repeat me-2"></i>
                  Refresh</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="exportCSV"><i class="bi bi-download me-2"></i>
                  Export CSV</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-4">
        <b-spinner label="Loading..."></b-spinner>
      </div>

      <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">
        {{ error }}
      </b-alert>

      <b-table v-if="!loading" :items="filteredLogs" :fields="tableFields" striped hover responsive class="text-center"
        :current-page="currentPage" :per-page="perPage">
        <template #cell(index)="row">
          {{ (currentPage - 1) * perPage + row.index + 1 }}
        </template>
        <template #cell(dateDisplay)="data">
          {{ formatDateForDisplay(data.item.clientTimestamp) }}
        </template>
        <template #cell(timeDisplay)="data">
          {{ formatTimeForDisplay(data.item.clientTimestamp) }}
        </template>
      </b-table>

      <b-pagination v-model="currentPage" :total-rows="filteredLogs.length" :per-page="perPage" :align="'center'"
        class="mt-3"></b-pagination>
    </div>
  </div>
</template>

<script>
import activityLogApi from '@/api/activityLogApi';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      logs: [],
      loading: false,
      error: '',
      searchTerm: '',
      currentPage: 1,
      perPage: 10,
      tableFields: [
        { key: 'index', label: '#', sortable: false },
        { key: 'dateDisplay', label: 'Date (Local)', sortable: true },
        { key: 'timeDisplay', label: 'Time (Local)', sortable: true },
        { key: 'username', label: 'User', sortable: true },
        { key: 'module', label: 'Module', sortable: true },
        { key: 'activity', label: 'Action', sortable: true },
        { key: 'entityType', label: 'Entity Type', sortable: true },
        { key: 'entityId', label: 'Entity ID', sortable: true },
        { key: 'details', label: 'Details', sortable: false }
      ]
    };
  },
  computed: {
    filteredLogs() {
      const term = this.searchTerm.toLowerCase();
      return this.logs.filter(log =>
        Object.values(log)
          .join(' ')
          .toLowerCase()
          .includes(term)
      );
    }
  },
  watch: {
    searchTerm: debounce(function () {
      this.currentPage = 1;
    }, 300)
  },
  mounted() {
    this.fetchLogs();
  },
  methods: {
    fetchLogs() {
      this.loading = true;
      this.error = '';
      activityLogApi.getAll()
        .then(response => {
          this.logs = response.data;
          this.logs.sort((a, b) => new Date(b.clientTimestamp) - new Date(a.clientTimestamp));
        })
        .catch(() => {
          this.error = 'Failed to load activity logs.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatDateForDisplay(utcTimestampString) {
      if (!utcTimestampString) return '';
      const date = new Date(utcTimestampString);
      return date.toLocaleDateString();
    },
    formatTimeForDisplay(utcTimestampString) {
      if (!utcTimestampString) return '';
      const date = new Date(utcTimestampString);
      return date.toLocaleTimeString();
    },
    exportCSV() {
      const csvContent = [
        ['Date (Local)', 'Time (Local)', 'User', 'Module', 'Action', 'Entity Type', 'Entity ID', 'Details'],
        ...this.filteredLogs.map(l => [
          this.formatDateForDisplay(l.clientTimestamp),
          this.formatTimeForDisplay(l.clientTimestamp),
          l.username,
          l.module,
          l.activity,
          l.entityType,
          l.entityId,
          (l.details && (l.details.includes(',') || l.details.includes('"') || l.details.includes('\n')))
            ? `"${l.details.replace(/"/g, '""').replace(/\n/g, ' ')}"`
            : (l.details || '')
        ])
      ]
        .map(row => row.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'user_activity_logs.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>