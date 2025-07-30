<template>
  <div class="ledger-wrapper p-4">
    <!-- Header -->
    <div class="d-flex justify-content-between flex-wrap mb-4">
      <div class="logo">LOGO HERE</div>
      <div class="text-right">
        <h2 class="font-weight-bold">JOURNAL ENTRY (Batch)</h2>
        <p class="text-muted mb-0">JE No: Auto-generated</p>
      </div>
    </div>

    <!-- Shared Fields + Auto-Add Button -->
    <div class="row mb-4 align-items-end">
      <!-- Receipt Date -->
      <div class="col-md-4 mb-2">
        <label>Receipt Date</label>
        <input type="date" v-model="sharedReceiptDate" class="form-control" />
      </div>

      <!-- Credit Account Dropdown -->
      <div class="col-md-4 mb-2">
        <label>Credit Account (Payment Method)</label>
        <select v-model="sharedAccount" class="form-control">
          <option disabled value="">Select Credit Account</option>
          <option v-for="acc in paymentMethodAccounts" :key="acc.id" :value="acc.id">
            {{ acc.name }}
          </option>
        </select>

      </div>

      <!-- Group Dropdown -->
      <div class="col-md-4 mb-2 text-md-right text-left">
        <label>Select Group</label>
        <select v-model="selectedGroupId" class="form-control" @change="onGroupSelected">
          <option disabled value="">-- Select Group --</option>
          <option v-for="group in groups" :key="group.id" :value="group.id">
            {{ group.groupName }}
          </option>
        </select>
      </div>
    </div>

    <!-- Actions Dropdown -->
    <div class="d-flex justify-content-end mb-3">
      <div class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="actionsDropdown"
          data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-cog"></i> Actions
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="actionsDropdown">
          <li><a class="dropdown-item" href="#" @click.prevent="focusPaste"><i class="fas fa-paste me-2"></i> Paste from
              Excel</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="addReceipt"><i class="fas fa-plus me-2"></i> Add Another
              Receipt</a></li>
          <li><a class="dropdown-item text-primary" href="#" @click.prevent="saveBatchReceipts"><i
                class="fas fa-save me-2"></i> Save Batch</a></li>
        </ul>
      </div>
    </div>

    <!-- Hidden Paste Target -->
    <input ref="pasteArea" @paste="handlePaste" tabindex="-1" style="position:absolute; left:-9999px; top:0;" />

    <!-- Receipt Table -->
    <div class="table-responsive mb-4">
      <table class="table table-bordered table-hover">
        <thead class="thead-light">
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Account</th>
            <th>Reference No.</th>
            <th>Amount</th>
            <th v-if="receipts.length > 1" style="width: 80px;">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, i) in receipts" :key="i">
            <td>{{ i + 1 }}</td>
            <td>
              <select v-model="r.paymentFor" class="form-control" disabled>
                <option disabled value="">Select Debit Account</option>
                <option v-for="acc in accounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
              </select>
            </td>
            <td>
              <select class="form-control" disabled>
                <option disabled value="">Select Debit Account</option>
                <option v-for="acc in accounts" :key="acc.id" :value="acc.id"> {{(accounts.find(a => a.id ===
                  r.paymentFor)?.accountCategory || '').toUpperCase()}}
                </option>
              </select>
            </td>
            <td><input v-model="r.referenceNumber" class="form-control" placeholder="Ref #" /></td>
            <td><input v-model="r.amount" type="number" class="form-control" placeholder="0.00" /></td>
            <td v-if="receipts.length > 1">
              <button class="btn btn-sm btn-danger" @click="removeReceipt(i)">&times;</button>
            </td>
          </tr>
        </tbody>

      </table>
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
      receipts: [],
      accounts: [],
      groups: [],
      selectedGroupId: '',
      selectedGroup: null,
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

<style scoped>
.ledger-wrapper {
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
}

thead th {
  background-color: #f8f9fa;
  text-align: center;
  vertical-align: middle;
}

table td input,
table td select {
  height: 36px;
  padding: 4px 8px;
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
