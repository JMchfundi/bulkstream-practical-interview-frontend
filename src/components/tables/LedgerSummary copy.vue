<template>
  <div class="card-body">
    <h4>Ledger for {{ account?.name }}</h4>

    <div class="row my-3">
      <div class="col-md-4">
        <label>Start Date</label>
        <input type="date" v-model="startDate" @change="onDateChange" class="form-control" />
      </div>
      <div class="col-md-4">
        <label>End Date</label>
        <input type="date" v-model="endDate" @change="onDateChange" class="form-control" />
      </div>
      <div class="col-md-4 d-flex align-items-end justify-content-end">
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
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
            <li>
    <a class="dropdown-item" href="#" @click.prevent="previewLedgerPdf">
      <i class="bi bi-file-earmark-pdf me-2"></i> Download PDF
    </a>
  </li>
          </ul>
        </div>
      </div>
    </div>

    <b-alert v-if="error" variant="danger" dismissible @dismissed="error = ''">{{ error }}</b-alert>
    <div class="table-responsive">
  <b-table
    :items="paginatedEntries"
    :fields="ledgerFields"
    striped
    hover
    small
    :per-page="perPage"
    :current-page="currentPage"
  />
</div>


    <b-pagination
      v-model="currentPage"
      :total-rows="ledgerEntries.length"
      :per-page="perPage"
      :align="center"
      class="my-3"
    />
  </div>
</template>

<script>
import accountApi from '@/api/accountApi';

export default {
  data() {
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);

    const formatDate = date => date.toISOString().split('T')[0];

    return {
      account: null,
      startDate: formatDate(twoWeeksAgo),
      endDate: formatDate(today),
      ledgerEntries: [],
      error: '',
      currentPage: 1,
      perPage: 10,
      ledgerFields: [
        { key: 'date', label: 'Date', sortable: true },
        { key: 'description', label: 'Description' },
        { key: 'debit', label: 'Debit' },
        { key: 'credit', label: 'Credit' },
        { key: 'entryAmount', label: 'Debit / Credit' },
        { key: 'balance', label: 'Cumulative Balance' }
      ]
    };
  },
  computed: {
    paginatedEntries() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.ledgerEntries.slice(start, start + this.perPage);
    }
  },
  created() {
    this.fetchAccount();
  },
  methods: {
async previewLedgerPdf() {
  // Open a new tab immediately to avoid popup blockers
  const pdfWindow = window.open('', '_blank');

  if (!pdfWindow) {
    this.error = 'Popup blocked. Please allow popups for this site.';
    return;
  }

  try {
    const response = await accountApi.downloadLedgerReport(this.account.id, {
      startDate: this.startDate,
      endDate: this.endDate
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Now set the new tab's location to the PDF
    pdfWindow.location.href = url;

    // Optionally revoke the URL after a short delay
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (error) {
    pdfWindow.close(); // Clean up if there's an error
    console.error('Failed to preview PDF:', error);
    this.error = 'Failed to preview ledger PDF.';
  }
},

    async fetchAccount() {
      try {
        const id = this.$route.params.accountId;
        const response = await accountApi.getById(id);
        this.account = response.data;
        await this.fetchLedger(); // Load immediately with default dates
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load account details.';
      }
    },
    async fetchLedger() {
      if (!this.startDate || !this.endDate) {
        this.error = 'Please select both start and end dates.';
        return;
      }

      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.error = 'Start date must be before end date.';
        return;
      }

      this.error = '';
      try {
        const res = await accountApi.getStatement(this.account.id, {
          params: { startDate: this.startDate, endDate: this.endDate }
        });

        this.ledgerEntries = res.data.map(entry => ({
          ...entry,
          entryAmount: this.formatEntry(entry),
          debit: this.formatCurrency(entry.debit),
          credit: this.formatCurrency(entry.credit),
          balance: this.formatCurrency(entry.balance),
          date: new Date(entry.date).toLocaleDateString()
        }));

        this.currentPage = 1; // Reset page after load
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load ledger.';
      }
    },
    onDateChange() {
      this.fetchLedger();
    },
    formatCurrency(value) {
      if (value == null) return '-';
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
      }).format(value);
    },
    formatEntry(entry) {
      if (entry.debit && entry.debit !== 0) {
        return `${this.formatCurrency(entry.debit)} Dr`;
      } else if (entry.credit && entry.credit !== 0) {
        return `${this.formatCurrency(entry.credit)} Cr`;
      } else {
        return '-';
      }
    },
    fetchGroups() {
      // Placeholder for the real refresh logic
      this.fetchLedger();
    },
    exportCSV() {
  const headers = [
    'Date',
    'Description',
    'Debit',
    'Credit',
    'Debit / Credit',
    'Cumulative Balance'
  ];

  const rows = this.ledgerEntries.map(entry => {
    const debit = this.toRawNumber(entry.debit);
    const credit = this.toRawNumber(entry.credit);
    const balance = this.toRawNumber(entry.balance);
    const entryAmount = this.getRawEntryAmount(entry);

    return [
      entry.date,
      entry.description,
      debit,
      credit,
      entryAmount,
      balance
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `ledger_${this.account?.name || 'account'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
},
toRawNumber(formattedValue) {
  if (!formattedValue || typeof formattedValue !== 'string') return '';
  return formattedValue.replace(/[^\d.-]/g, '');
},

getRawEntryAmount(entry) {
  const debit = this.toRawNumber(entry.debit);
  const credit = this.toRawNumber(entry.credit);

  if (debit && parseFloat(debit) !== 0) {
    return `${debit} Dr`;
  } else if (credit && parseFloat(credit) !== 0) {
    return `${credit} Cr`;
  } else {
    return '';
  }
}
  }
};
</script>
