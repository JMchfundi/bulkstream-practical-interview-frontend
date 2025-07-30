<template>
  <div class="">
    <div class="card">
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-4">
            <div class="logo">LOGO HERE</div>
            </div>
          <div class="col-8 text-right">
            <h2 class="font-weight-bold">TRES VOUCHER</h2>
            <p class="text-muted">
              0000-000000 <br>
              Your Mall Here <br>
              Your Business Address 0000 Main Street, Unit 0000
            </p>
            <p class="text-muted">FEL 0000</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-6">
            <span class="font-weight-bold">Voucher No:</span>
            <input type="text" v-model="voucherNo" class="form-control-sm ml-2" style="width: 150px;">
          </div>
          <div class="col-6 text-right">
            <span class="font-weight-bold">Date:</span>
            <input type="date" v-model="voucherDate" class="form-control-sm ml-2" style="width: 150px;">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12">
            <span class="font-weight-bold">Payee:</span>
            <input type="text" v-model="payee" class="form-control ml-2" style="width: 90%;">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-6">
            <span class="font-weight-bold">Amount:</span>
            <input type="text" v-model="amount" @input="convertToWords" class="form-control ml-2" style="width: 80%;">
          </div>
          <div class="col-6">
            <span class="font-weight-bold">In words:</span>
            <input type="text" v-model="amountInWords" class="form-control ml-2" style="width: 80%;">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-6">
            <span class="font-weight-bold">Purpose:</span>
            <input type="text" v-model="purpose" class="form-control ml-2" style="width: 80%;">
          </div>
          <div class="col-6">
            <span class="font-weight-bold">Account:</span>
            <input type="text" v-model="account" class="form-control ml-2" style="width: 80%;">
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-6">
            <span class="font-weight-bold">Payment Method:</span>
            <select v-model="paymentMethod" class="form-control ml-2" style="width: 80%;">
              <option disabled value="">Select</option>
              <option>Cash</option>
              <option>MPESA</option>
              <option>Bank Transfer</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
          </div>
          <div class="col-6">
            <span class="font-weight-bold">Reference No:</span>
            <input type="text" v-model="referenceNumber" class="form-control ml-2" style="width: 80%;">
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-4">
            <span class="font-weight-bold">Amount:</span>
            <span class="ml-2">KES</span>
            <input type="text" v-model="formattedAmount" class="form-control-sm ml-2" style="width: 150px;" readonly>
          </div>
          <div class="col-8 text-right">
            <button @click="saveVoucher" class="btn btn-primary">Save</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
const baseNumbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const scales = ['', 'thousand', 'million', 'billion'];

export default {
  data() {
    return {
      voucherNo: '',
      voucherDate: new Date().toISOString().substr(0, 10),
      payee: '',
      amount: '',
      amountInWords: '',
      purpose: '',
      account: '',
      paymentMethod: '',
      referenceNumber: '',
    };
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
    saveVoucher() {
      alert('Voucher saved successfully!');
      // Implement save logic here
    }
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
