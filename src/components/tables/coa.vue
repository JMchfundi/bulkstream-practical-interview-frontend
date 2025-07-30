<template>
  <div>
    <!-- Header and Actions -->
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <input v-model="searchTerm" class="form-control" style="max-width: 250px" placeholder="Search accounts..." />
      <div>
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i class="bi bi-gear"></i> Actions
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="fetchGroups" :class="{ disabled: loading }">
                <i class="bi bi-arrow-repeat me-2"></i> Refresh
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="exportCSV" :class="{ disabled: loading }">
                <i class="bi bi-download me-2"></i> Export CSV
              </a>
            </li>
            <li>
              <button class="dropdown-item" :disabled="Object.keys(editedGroups).length === 0 || loading"
                @click="saveAllEdits">
                <i class="bi bi-upload me-2"></i> Update
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Error and Loading -->
    <div v-if="loading" class="text-center my-4">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">
      {{ error }}
    </b-alert>

    <!-- Grouped Display -->
    <!-- Group Navigation Buttons -->
    <div class="mb-3 d-flex flex-wrap gap-2">
      <button v-for="(accounts, category) in groupedGroups" :key="category" class="btn"
        :class="selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'"
        @click="selectedCategory = category">
        {{ category }} ({{ accounts.length }})
      </button>
    </div>

    <!-- Table for Selected Group -->
    <div v-if="selectedCategory && groupedGroups[selectedCategory]">
      <div class="bg-primary text-white p-2 fw-bold">{{ selectedCategory }}</div>
      <b-table :items="groupedGroups[selectedCategory]" :fields="fields" small hover responsive striped class="mb-2">
        <!-- all cell templates remain the same -->
        <template #cell(name)="data">
          <div v-if="isEditing(data.item)">
            <input v-model="editedGroups[data.item.id].name" class="form-control form-control-sm" />
          </div>
          <div v-else>{{ data.item.name }}</div>
        </template>
        <template #cell(code)="data">
          <div v-if="isEditing(data.item)">
            <input v-model="editedGroups[data.item.id].code" class="form-control form-control-sm" />
          </div>
          <div v-else>{{ data.item.code }}</div>
        </template>
        <template #cell(balance)="data">
          <a href="#" @click.prevent="viewLedger(data.item)">{{ formatCurrency(data.item.balance) }}</a>
        </template>
        <template #cell(type)="data">
          <div v-if="isEditing(data.item)">
            <input v-model="editedGroups[data.item.id].type" class="form-control form-control-sm" />
          </div>
          <div v-else>{{ data.item.type }}</div>
        </template>
        <template #cell(actions)="data">
          <div class="btn-group btn-group-sm">
            <b-button v-if="!isEditing(data.item)" variant="warning" @click="enableEdit(data.item)">
              <i class="bi bi-pencil"></i>
            </b-button>
            <b-button v-else variant="secondary" @click="cancelEdit(data.item.id)">
              <i class="bi bi-x"></i>
            </b-button>
          </div>
        </template>
      </b-table>
      <div class="text-end pe-3 fw-bold">
        Subtotal: {{ formatCurrency(getSubtotal(groupedGroups[selectedCategory])) }}
      </div>
    </div>


    <!-- Ledger Modal -->
    <b-modal v-model="showLedgerModal" title="Account Ledger" size="xl">
      <div v-if="ledgerEntries.length === 0">
        <p>No ledger entries found.</p>
      </div>
      <b-table :items="ledgerEntries" :fields="ledgerFields" striped hover small />
    </b-modal>
  </div>
</template>

<script>
import accountApi from '@/api/accountApi';
import swal from '@/utils/swal';

export default {
  data() {
    return {
      groups: [],
      editedGroups: {},
      editingRows: {},
      loading: false,
      error: '',
      searchTerm: '',
      showLedgerModal: false,
      ledgerEntries: [],
      selectedCategory: null,
      ledgerFields: [
        { key: 'date', label: 'Date' },
        { key: 'description', label: 'Description' },
        { key: 'debit', label: 'Debit' },
        { key: 'credit', label: 'Credit' },
        { key: 'entryAmount', label: 'Debit / Credit' },
        { key: 'balance', label: 'Cumulative Balance' }
      ],
      fields: [
        { key: 'name', sortable: true },
        { key: 'code', sortable: true },
        { key: 'type', sortable: true },
        { key: 'accountCategory', sortable: true },
        { key: 'balance', label: 'Balance', sortable: true },
      ]
    };
  },
  computed: {
    filteredGroups() {
      const term = this.searchTerm.toLowerCase();
      return this.groups.filter(g => Object.values(g).some(v => (v ?? '').toString().toLowerCase().includes(term)));
    },
    groupedGroups() {
      const grouped = {};
      this.filteredGroups.forEach(account => {
        const cat = account.type || 'Uncategorized';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(account);
      });
      return grouped;
    },
    hasEdits() {
      return Object.keys(this.editedGroups).length > 0;
    }
  },
  methods: {
    formatCurrency(value) {
      if (value == null) return '-';
      return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
    },
    getSubtotal(accounts) {
      return accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    },
    viewLedger(account) {
      this.$router.push({ name: 'LedgerSummary', params: { accountId: account.id } });
    },
    fetchGroups() {
      this.loading = true;
      this.error = '';
      accountApi.getAll()
        .then(res => {
          this.groups = res.data;
          const firstCategory = this.groupedGroups && Object.keys(this.groupedGroups)[0];
          this.selectedCategory = firstCategory || null;
        })
        .catch(() => (this.error = 'Failed to load groups.'))
        .finally(() => (this.loading = false));
    },
    exportCSV() {
      const headers = ['Name', 'Code', 'Type', 'Account Category', 'Balance'];
      const rows = this.filteredGroups.map(group => [
        group.name || '',
        group.code || '',
        group.type || '',
        group.accountCategory || '',
        this.formatCurrency(group.balance)
      ]);
      const csvContent = [headers, ...rows].map(row => row.map(val => `"${val}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const today = new Date().toISOString().split('T')[0];
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `accounts_export_${today}.csv`;
      link.click();
    },
    isEditing(item) {
      return !!this.editingRows[item.id];
    },
    enableEdit(item) {
      this.$set(this.editingRows, item.id, true);
      this.$set(this.editedGroups, item.id, { ...item });
    },
    cancelEdit(id) {
      this.$delete(this.editingRows, id);
      this.$delete(this.editedGroups, id);
    },
    async saveAllEdits() {
      if (!this.hasEdits) return;
      this.loading = true;
      try {
        const updatedGroups = Object.values(this.editedGroups);
        await accountApi.batchUpdate(updatedGroups);
        updatedGroups.forEach(updated => {
          const index = this.groups.findIndex(g => g.id === updated.id);
          if (index !== -1) this.$set(this.groups, index, updated);
        });
        this.editingRows = {};
        this.editedGroups = {};
        swal.success('Accounts updated successfully');
      } catch (err) {
        swal.error('Update failed');
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchGroups();
  }
};
</script>
