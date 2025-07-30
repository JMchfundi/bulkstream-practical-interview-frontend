<template>
  <b-card title="Disbursement History">
    <div
      class="chart-container"
      style="position: relative; height: 250px; margin: auto;"
    >
      <canvas ref="disbursementChart"></canvas>
    </div>
  </b-card>
</template>

<script>
import Chart from 'chart.js';

export default {
  mounted() {
    const ctx = this.$refs.disbursementChart.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2025-06-01', '2025-06-02', '2025-06-03'],
        datasets: [
          {
            label: 'Total Disbursed ($)',
            data: [5000, 6200, 7100],
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            borderColor: '#28a745',
            fill: true,
            lineTension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
};
</script>
