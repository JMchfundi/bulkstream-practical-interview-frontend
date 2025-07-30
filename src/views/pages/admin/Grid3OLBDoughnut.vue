<template>
  <b-card title="OLB Status">
    <b-form-group label="Filter by Region">
      <b-form-select :options="regions" v-model="selectedRegion" />
    </b-form-group>
    <div class="chart-container" style="position: relative; height: 250px; width: 250px; margin: auto;">
      <canvas ref="olbChart"></canvas>
    </div>
  </b-card>
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      selectedRegion: null,
      regions: ['All', 'Head Office', 'Kwale Region', 'Kinango Branch'],
      chart: null
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.olbChart.getContext('2d');
      if (this.chart) this.chart.destroy(); // clean up if re-render
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Active Loans', 'Loans in Arrears'],
          datasets: [{
            data: [350000, 45000],
            backgroundColor: ['#28a745', '#dc3545']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 70,
          legend: {
            position: 'bottom'
          }
        }
      });
    }
  }
};
</script>
