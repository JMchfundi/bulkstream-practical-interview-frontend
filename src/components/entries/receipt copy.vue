<template>
  <div class="">
    <div class="card">
      <div class="card-body">
        <!-- Header Section -->
        <div class="row mb-4">
          <div class="col-4">
            <div class="logo">LOGO HERE</div>
          </div>
          <div class="col-8 text-right">
            <h2 class="font-weight-bold">JOURNAL ENTRY</h2>
            <p class="text-muted">
              JE No: 0000-000000 <br>
              Your Mall Here <br>
              Your Business Address 0000 Main Street, Unit 0000
            </p>
            <p class="text-muted">FEL 0000</p>
          </div>
        </div>

        <!-- Entry Info -->
        <div class="row mb-3">
          <div class="col-6">
            <span class="font-weight-bold">Entry No:</span>
            <input type="text" v-model="receiptNo" class="form-control-sm ml-2" style="width: 150px;">
          </div>
          <div class="col-6 text-right">
            <span class="font-weight-bold">Date:</span>
            <input type="date" v-model="receiptDate" class="form-control-sm ml-2" style="width: 150px;">
          </div>
        </div>

        <!-- Account Affected -->
        <div class="row mb-3">
          <div class="col-12">
            <span class="font-weight-bold">Account: (Value Goes goes as Debit)</span>
            <select v-model="paymentFor" class="form-control ml-2" style="width: 90%;">
              <option disabled value="">Select account</option>
              <option v-for="acc in accounts" :key="acc.id" :value="acc.id">
                {{ acc.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Debit/Credit -->
        <div class="row mb-3">
          <div class="col-6">
            <span class="font-weight-bold">Amount (DR/CR):</span>
            <input type="text" v-model="amount" @input="convertToWords" class="form-control ml-2" style="width: 80%;">
          </div>
          <div class="col-6">
            <span class="font-weight-bold">Amount in words:</span>
            <input type="text" v-model="amountInWords" class="form-control ml-2" style="width: 80%;">
          </div>
        </div>

        <!-- Contra Account & Ref -->
        <div class="row mb-3">
          <div class="col-6">
            <span class="font-weight-bold">Contra Account: (Value Goes goes as Credit)</span>
            <select v-model="account" class="form-control ml-2" style="width: 80%;">
              <option disabled value="">Select account</option>
              <option v-for="acc in accounts" :key="acc.id" :value="acc.id">
                {{ acc.name }}
              </option>
            </select>
          </div>
          <div class="col-6">
            <span class="font-weight-bold">Reference No:</span>
            <input type="text" v-model="referenceNumber" class="form-control ml-2" style="width: 80%;">
          </div>
        </div>

        <!-- Summary & Save -->
        <div class="row mt-4">
          <div class="col-4">
            <span class="font-weight-bold">Total =</span>
            <span class="ml-2">KES</span>
            <input type="text" v-model="formattedAmount" class="form-control-sm ml-2" style="width: 150px;" readonly>
          </div>
          <div class="col-8 text-right">
            <button @click="saveReceipt" class="btn btn-primary">Save Entry</button>
          </div>
        </div>

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
.logo {
  border: 1px solid #ddd;
  padding: 5px;
  text-align: center;
}

.form-control-sm {
  border-bottom: 1px solid #ddd;
  border-top: none;
  border-left: none;
  border-right: none;
}

.form-control {
  border-bottom: 1px solid #ddd;
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
