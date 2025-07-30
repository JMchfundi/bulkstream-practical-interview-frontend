<template>
  <div class="card">
    <div class="card-body">
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
                <a class="dropdown-item" href="#" @click.prevent="fetchGroups">
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

      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center py-4">
        <b-spinner label="Loading..."></b-spinner>
      </div>

      <!-- Error -->
      <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">
        {{ error }}
      </b-alert>

      <!-- Group Table -->
      <b-table
        v-if="!loading"
        :items="filteredGroups"
        :fields="tableFields"
        striped
        hover
        responsive
        class="text-center"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template #cell(index)="row">
          {{ (currentPage - 1) * perPage + row.index + 1 }}
        </template>

        <template #cell(actions)="row">
          <button class="btn btn-sm btn-outline-primary" @click="viewGroup(row.item)">
            <i class="bi bi-eye"></i> View
          </button>
        </template>
      </b-table>

      <!-- Group Details Modal -->
      <GroupDetailsModal v-model="showModal" :group="selectedGroup" />

      <!-- Pagination -->
      <b-pagination
        v-model="currentPage"
        :total-rows="filteredGroups.length"
        :per-page="perPage"
        :align="center"
        class="mt-3"
      ></b-pagination>
    </div>
  </div>
</template>


<script>
import groupApi from '@/api/groupApi';
import debounce from 'lodash/debounce';
import GroupDetailsModal from '@/components/modals/GroupDetailsModal.vue';

export default {
  components: {
    GroupDetailsModal
  },
  data() {
    return {
      groups: [],
      loading: false,
      error: '',
      searchTerm: '',
      currentPage: 1,
      perPage: 5,
      showModal: false,
      selectedGroup: null,
      tableFields: [
        { key: 'index', label: '#', sortable: false },
        { key: 'groupName', label: 'Name', sortable: true },
        { key: 'totalClients', label: 'Members', sortable: true },
        { key: 'savingbalance', label: 'Savings', sortable: true },
        { key: 'actions', label: 'Actions' }
      ]
    };
  },
  computed: {
    filteredGroups() {
      const term = this.searchTerm.toLowerCase();
      return this.groups.filter(group =>
        group.groupName?.toLowerCase().includes(term)
      );
    }
  },
  watch: {
    searchTerm: debounce(function () {
      this.currentPage = 1;
    }, 300)
  },
  mounted() {
    this.fetchGroups();
  },
  methods: {
    fetchGroups() {
      this.loading = true;
      this.error = '';
      groupApi.getAll()
        .then(response => {
          this.groups = response.data.map(group => ({
            ...group,
            totalSavings: group.totalSavings || 0
          }));
        })
        .catch(() => {
          this.error = 'Failed to load groups.';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    viewGroup(group) {
      this.selectedGroup = group;
      this.showModal = true;
    },
    exportCSV() {
      const csvContent = [
        ['Group Name', 'Total Savings'],
        ...this.filteredGroups.map(g => [g.groupName, g.totalSavings])
      ]
        .map(e => e.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'group_summary.csv');
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
</style>
