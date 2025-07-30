<template>
  <div class="ledger-wrapper p-4">
    <!-- Header -->
    <div class="d-flex justify-content-between flex-wrap mb-4">
      <div class="logo">LOGO HERE</div>
      <div class="text-right">
        <h2 class="font-weight-bold">JOURNAL ENTRY</h2>
        <p class="text-muted mb-0">JE No: 0000-000000</p>
        <p class="text-muted mb-0">Your Mall Here</p>
        <p class="text-muted mb-0">Your Business Address</p>
        <p class="text-muted mb-0">FEL 0000</p>
      </div>
    </div>

    <!-- Entry Info -->
    <div class="row mb-3">
      <div class="col-sm-6">
        <strong>Date:</strong>
        <input type="date" v-model="receiptDate" class="form-control form-control-sm ml-2">
      </div>
    </div>

    <!-- Master Reference & Amount -->
    <div class="row mb-3">
      <div class="col-sm-6">
        <strong>Reference No:</strong>
        <input type="text" v-model="referenceNumber" class="form-control form-control-sm">
      </div>
      <div class="col-sm-6">
        <strong>Amount:</strong>
        <input type="text" v-model="amount" @input="convertToWords" class="form-control form-control-sm">
      </div>
    </div>

    <!-- Desktop Ledger Table -->
    <div class="d-none d-md-block">
      <table class="table table-bordered ledger-table">
        <thead class="thead-light">
          <tr>
            <th>Date</th>
            <th>Account Title & Explanation</th>
            <th>Reference No</th>
            <th>Debit (KES)</th>
            <th>Credit (KES)</th>
          </tr>
        </thead>
        <tbody>
          <!-- Debit Row -->
          <tr>
            <td>{{ receiptDate }}</td>
            <td>
              <select v-model="paymentFor" class="form-control form-control-sm">
                <option disabled value="">Select Debit Account</option>
                <option v-for="acc in accounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
              </select>
            </td>
            <td><input type="text" :value="referenceNumber" class="form-control form-control-sm" readonly></td>
            <td><input type="text" :value="amount" class="form-control form-control-sm" readonly></td>
            <td></td>
          </tr>
          <!-- Credit Row -->
          <tr>
            <td></td>
            <td>
              <select v-model="account" class="form-control form-control-sm">
                <option disabled value="">Select Credit Account</option>
                <option v-for="acc in accounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
              </select>
            </td>
            <td><input type="text" :value="referenceNumber" class="form-control form-control-sm" readonly></td>
            <td></td>
            <td><input type="text" :value="amount" class="form-control form-control-sm" readonly></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Ledger View -->
    <div class="d-block d-md-none">
      <!-- DR Line -->
      <div class="ledger-card mb-3">
        <p class="mb-1"><strong>Date:</strong> {{ receiptDate }}</p>
        <p class="mb-1"><strong>Debit Account:</strong></p>
        <select v-model="paymentFor" class="form-control form-control-sm mb-2">
          <option disabled value="">Select Debit Account</option>
          <option v-for="acc in accounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
        </select>
        <p class="mb-1"><strong>Reference No:</strong></p>
        <input type="text" :value="referenceNumber" class="form-control form-control-sm mb-2" readonly>
        <p class="mb-1"><strong>Amount (DR):</strong></p>
        <input type="text" :value="amount" class="form-control form-control-sm mb-2" readonly>
      </div>

      <!-- CR Line -->
      <div class="ledger-card mb-3">
        <p class="mb-1"><strong>Credit Account:</strong></p>
        <select v-model="account" class="form-control form-control-sm mb-2">
          <option disabled value="">Select Credit Account</option>
          <option v-for="acc in accounts" :key="acc.id" :value="acc.id">{{ acc.name }}</option>
        </select>
        <p class="mb-1"><strong>Reference No:</strong></p>
        <input type="text" :value="referenceNumber" class="form-control form-control-sm mb-2" readonly>
        <p class="mb-1"><strong>Amount (CR):</strong></p>
        <input type="text" :value="amount" class="form-control form-control-sm mb-2" readonly>
      </div>
    </div>

    <!-- Amount in Words -->
    <div class="mb-3">
      <strong>Amount in words:</strong>
      <input type="text" v-model="amountInWords" class="form-control form-control-sm mt-1">
    </div>

    <!-- Footer -->
    <div class="d-flex justify-content-between mt-4 flex-wrap">
      <div class="mb-2">
        <strong>Total:</strong>
        <input type="text" v-model="formattedAmount" class="form-control form-control-sm ml-2 d-inline-block" style="width: 150px;" readonly>
      </div>
      <div>
        <button @click="saveReceipt" class="btn btn-primary">Save Entry</button>
      </div>
    </div>
  </div>
</template>



<script>
import accountApi from '@/api/accountApi'; // or correct path
import transactionApi from '@/api/transactionApi'; // or correct path

const baseNumbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const scales = ['', 'thousand', 'million', 'billion'];

export default {
  data() {
    return {
      receiptNo: '',
      receiptDate: new Date().toISOString().substr(0, 10),
      receivedFrom: '',
      amount: '',
      amountInWords: '',
      paymentFor: '', // This will now hold selected account ID or name
      account: '',
      paymentMethod: '',
      referenceNumber: '',
      accounts: [] // List of accounts from API
    };
  },
  mounted() {
    this.loadAccounts();
  },
  computed: {
    formattedAmount() {
      const num = parseFloat(this.amount);
      if (isNaN(num)) return '';
      return num.toLocaleString('en-KE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  },
  methods: {

    async loadAccounts() {
      try {
        const response = await accountApi.getAll();
        this.accounts = response.data; // Adjust based on API response shape
      } catch (error) {
        console.error("Failed to load accounts:", error);
      }
    },
    convertToWords() {
      const num = parseFloat(this.amount);
      if (isNaN(num)) {
        this.amountInWords = '';
        return;
      }
      const [whole] = num.toString().split('.');
      this.amountInWords = this.numberToWords(parseInt(whole));
    },
    numberToWords(num) {
      if (num === 0) return 'zero';

      const chunkToWords = (n) => {
        let str = '';
        if (n >= 100) {
          str += baseNumbers[Math.floor(n / 100)] + ' hundred ';
          n %= 100;
        }
        if (n >= 10 && n < 20) {
          str += teens[n - 10] + ' ';
        } else if (n >= 20) {
          str += tens[Math.floor(n / 10)] + ' ';
          if (n % 10) str += baseNumbers[n % 10] + ' ';
        } else if (n > 0) {
          str += baseNumbers[n] + ' ';
        }
        return str.trim();
      };

      let result = '';
      let scaleIndex = 0;

      while (num > 0) {
        const chunk = num % 1000;
        if (chunk) {
          result = `${chunkToWords(chunk)} ${scales[scaleIndex]} ${result}`.trim();
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
      }

      return result.trim();
    },
    async saveReceipt() {
      try {
        const receiptData = {
          receiptNo: this.receiptNo,
          receiptDate: this.receiptDate,
          receivedFrom: (this.accounts.find(acc => acc.id === this.paymentFor) || {}).name || '',
          amount: parseFloat(this.amount),
          amountInWords: this.amountInWords,
          paymentFor: this.paymentFor,
          account: this.account,
          paymentMethod: this.paymentMethod,
          referenceNumber: this.referenceNumber
        };

        const response = await transactionApi.saveReceipt(receiptData);

        if (response.status === 201 || response.status === 200) {
          alert('Receipt saved successfully!');
          // Optionally reset form here
        } else {
          alert('Failed to save receipt. Server responded with status: ' + response.status);
        }
      } catch (error) {
        console.error('Error saving receipt:', error);
        alert('An error occurred while saving the receipt.');
      }
    },

  }
};
</script>

<style scoped>
.ledger-wrapper {
  font-family: 'Courier New', Courier, monospace;
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
}

.ledger-table th, .ledger-table td {
  font-size: 14px;
  vertical-align: middle;
}

.ledger-card {
  border: 1px solid #ccc;
  padding: 1rem;
  background: #f9f9f9;
  border-left: 5px solid #007bff;
  font-size: 14px;
}

@media (max-width: 768px) {
  .form-control-sm {
    font-size: 13px;
    padding: 3px 6px;
  }

  .ledger-wrapper {
    padding: 10px;
  }

  .ledger-card p {
    margin-bottom: 0.5rem;
  }
}
</style>
