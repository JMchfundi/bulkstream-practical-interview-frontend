<template>
  <div class="ledger-wrapper p-4">
    <div class="d-flex justify-content-between flex-wrap mb-4">
      <div class="logo">LOGO HERE</div>
      <div class="text-right">
        <h2 class="font-weight-bold">JOURNAL ENTRY (Batch)</h2>
        <p class="text-muted mb-0">JE No: Auto-generated</p>
      </div>
    </div>

    <div class="row mb-4 align-items-end">
      <div class="col-md-4 mb-2">
        <label>Receipt Date</label>
        <b-form-datepicker v-model="sharedReceiptDate" class="form-control" />
      </div>

      <div class="col-md-4 mb-2">
        <label>Credit Account (Payment Method)</label>
        <b-form-select v-model="sharedAccount" :options="paymentMethodAccounts" value-field="id" text-field="name"
          class="form-control">
          <template #first>
            <b-form-select-option :value="null" disabled>Select Credit Account</b-form-select-option>
          </template>
        </b-form-select>
      </div>

      <div class="col-md-4 mb-2 text-md-right text-left">
        <label>Select Group</label>
        <b-form-select v-model="selectedGroupId" :options="groups" value-field="id" text-field="groupName"
          class="form-control" @change="onGroupSelected">
          <template #first>
            <b-form-select-option :value="null" disabled>-- Select Group --</b-form-select-option>
          </template>
        </b-form-select>
      </div>
    </div>

    <div class="d-flex justify-content-end mb-3">
      <b-dropdown right text="Actions" variant="outline-secondary" class="shadow-sm">
        <template #button-content>
          <i class="fas fa-cog"></i> Actions
        </template>
        <b-dropdown-item @click.prevent="focusPaste">
          <i class="fas fa-paste me-2"></i> Paste from Excel
        </b-dropdown-item>
        <b-dropdown-item @click.prevent="addReceipt">
          <i class="fas fa-plus me-2"></i> Add Another Receipt
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click.prevent="saveBatchReceipts" variant="primary">
          <i class="fas fa-save me-2"></i> Save Batch
        </b-dropdown-item>
      </b-dropdown>
    </div>

    <input ref="pasteArea" @paste="handlePaste" tabindex="-1" style="position:absolute; left:-9999px; top:0;" />

    <div class="receipt-table mb-4">
      <b-table :items="receipts" :fields="tableFields" striped hover small responsive show-empty
        empty-text="No receipts to display. Select a group or add a new receipt.">

        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(clientName)="data">
          <b-form-select v-model="data.item.paymentFor" :options="accounts" value-field="id" text-field="name"
            disabled></b-form-select>
        </template>

        <template #cell(accountType)="data">
          <b-form-input :value="getAccountCategory(data.item.paymentFor)" disabled></b-form-input>
        </template>

        <template #cell(referenceNumber)="data">
          <b-form-input v-model="data.item.referenceNumber" placeholder="Ref #" />
        </template>

        <template #cell(amount)="data">
          <b-form-input v-model.number="data.item.amount" type="number" placeholder="0.00" />
        </template>

        <template #cell(actions)="data">
          <b-button v-if="receipts.length > 1" variant="danger" size="sm"
            @click="removeReceipt(data.index)">&times;</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import accountApi from '@/api/accountApi';
import transactionApi from '@/api/transactionApi';
import groupApi from '@/api/groupApi';

export default {
  data() {
    return {
      sharedReceiptDate: new Date().toISOString().substr(0, 10),
      sharedAccount: null,
      receipts: [],
      accounts: [],
      groups: [],
      selectedGroupId: null,
      selectedGroup: null,
      tableFields: [
        { key: 'index', label: '#', formatter: (value, key, item, index) => index + 1 },
        { key: 'clientName', label: 'Client Name' },
        { key: 'accountType', label: 'Account' },
        { key: 'referenceNumber', label: 'Reference No.' },
        { key: 'amount', label: 'Amount' },
        { key: 'actions', label: 'Actions', thStyle: { width: '80px' } }
      ]
    };
  },
  mounted() {
    this.loadAccounts();
    this.loadGroups();
  },
  computed: {
    paymentMethodAccounts() {
      const allowedCategories = ['BANK', 'MPESA', 'CASH'];
      return this.accounts.filter(acc =>
        allowedCategories.includes((acc.accountCategory || '').toUpperCase())
      );
    }
  },
  methods: {
  getAccountCategory(accountId) {
    const account = this.accounts.find(a => a.id === accountId);
    if (account && account.accountCategory) {
      const category = account.accountCategory.trim();
      if (category.length > 0) {
        // Capitalize the first letter and make the rest lowercase
        return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      }
    }
    // Return an empty string if the account or category is not found
    return '';
  },
    createEmptyReceipt() {
      return {
        referenceNumber: '',
        amount: '',
        paymentFor: ''
      };
    },
    async loadAccounts() {
      try {
        const response = await accountApi.getAll();
        this.accounts = response.data;
      } catch (error) {
        console.error("Failed to load accounts:", error);
      }
    },
    async loadGroups() {
      try {
        const res = await groupApi.getAll();
        this.groups = res.data;
      } catch (err) {
        console.error("Error loading groups", err);
      }
    },
    onGroupSelected() {
      this.selectedGroup = this.groups.find(g => g.id === this.selectedGroupId);
      this.autoAddReceipts();
    },
    autoAddReceipts() {
      if (!this.selectedGroup || !this.selectedGroup.clients?.length) {
        alert("No clients found in the selected group.");
        return;
      }

      const newReceipts = [];
      const allowedCategories = ['CURRENT', 'SAVING'];

      this.selectedGroup.clients.forEach(client => {
        client.accountSummaries?.forEach(account => {
          const category = (account.accountCategory || '').toUpperCase();
          if (allowedCategories.includes(category)) {
            newReceipts.push({
              referenceNumber: '',
              amount: '',
              paymentFor: account.id
            });
          }
        });
      });

      this.receipts = newReceipts;
    },
    addReceipt() {
      this.receipts.push(this.createEmptyReceipt());
    },
    removeReceipt(index) {
      this.receipts.splice(index, 1);
    },
    focusPaste() {
      alert('Kindly Press Ctrl + V to paste data from Excel.');
      const el = this.$refs.pasteArea;
      if (el) {
        el.focus();
        el.select?.();
      }
    },
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData('Text');
      const rows = pastedData.trim().split('\n');
      const newReceipts = [];

      for (let row of rows) {
        const columns = row.split('\t');
        if (columns.length < 3) continue;

        const [referenceNumber, amountStr, accountName] = columns;

        const matchedAccount = this.accounts.find(acc =>
          acc.name.toLowerCase().trim() === accountName.toLowerCase().trim()
        );

        newReceipts.push({
          referenceNumber: referenceNumber || '',
          amount: parseFloat(amountStr) || '',
          paymentFor: matchedAccount ? matchedAccount.id : ''
        });
      }

      if (newReceipts.length) {
        this.receipts = this.receipts.concat(newReceipts);
      } else {
        alert('No valid data found in pasted content.');
      }
    },
    async saveBatchReceipts() {
      if (!this.sharedReceiptDate) {
        alert("Please select receipt date.");
        return;
      }

      try {
        const payload = this.receipts.map(r => ({
          receiptDate: this.sharedReceiptDate,
          referenceNumber: r.referenceNumber,
          amount: parseFloat(r.amount),
          paymentFor: r.paymentFor,
          account: this.sharedAccount // Assuming paymentFor is the account ID
        }));

        const response = await transactionApi.saveBatchReceipts(payload);

        if (response.status === 200 || response.status === 201) {
          alert('Batch receipts saved successfully!');
          this.receipts = [];
        } else {
          alert(`Failed to save batch. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error saving receipts:', error);
        alert('An error occurred while saving.');
      }
    }
  }
};
</script>