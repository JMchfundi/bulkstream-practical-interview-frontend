<template>
  <b-card title="Grid 4: Disbursement History (Visual Only)">
    <b-row class="font-weight-bold mb-2">
      <b-col md="4">Date</b-col>
      <b-col md="4">Amount</b-col>
      <b-col md="4">Visual</b-col>
    </b-row>

    <b-row
      v-for="(item, index) in disbursements"
      :key="index"
      class="align-items-center py-2 border-top"
    >
      <b-col md="4">{{ item.date }}</b-col>
      <b-col md="4">${{ item.amount.toLocaleString() }}</b-col>
      <b-col md="4">
        <b-progress :value="item.percent" variant="info" height="20px">
          <b-progress-bar :value="item.percent"></b-progress-bar>
        </b-progress>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      disbursements: [
        { date: '2025-06-01', amount: 5200 },
        { date: '2025-06-02', amount: 6300 },
        { date: '2025-06-03', amount: 5800 },
        { date: '2025-06-04', amount: 6700 },
        { date: '2025-06-05', amount: 7100 }
      ]
    };
  },
  computed: {
    maxAmount() {
      return Math.max(...this.disbursements.map(d => d.amount));
    }
  },
  mounted() {
    // simulate chart scale
    this.disbursements = this.disbursements.map(d => ({
      ...d,
      percent: ((d.amount / this.maxAmount) * 100).toFixed(1)
    }));
  }
};
</script>
