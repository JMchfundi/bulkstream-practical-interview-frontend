<template>
  <div>
    <b-card title="Today's Updates" class="py-3">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
      >
        <div
          v-for="(item, index) in updates"
          :key="index"
          class="d-flex flex-column text-center m-2"
          style="min-width: 110px; max-width: 150px; cursor: default;"
        >
          <small class="text-muted text-uppercase mb-1" style="letter-spacing: 0.05em;">
            {{ item.label }}
          </small>
          <span class="font-weight-bold h5 mb-0 text-dark">{{ item.value }}</span>
        </div>
      </div>
    </b-card>

    <b-card title="System Summary" class="py-3 mt-4">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
      >
        <div
          v-for="(item, index) in summary"
          :key="index"
          class="d-flex flex-column text-center m-2"
          style="min-width: 110px; max-width: 150px; cursor: default;"
        >
          <small class="text-muted text-uppercase mb-1" style="letter-spacing: 0.05em;">
            {{ item.label }}
          </small>
          <span class="font-weight-bold h5 mb-0 text-dark">{{ item.value }}</span>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updates: [
        { label: 'New Centers', value: 4 },
        { label: 'New Clients', value: 28 },
        { label: 'Closed Clients', value: 3 },
        { label: 'Closed Loans', value: 5 },
        { label: 'Disbursements Today', value: '$5,200' },
        { label: 'Deposits Today', value: '$2,500' },
        { label: 'Withdrawals Today', value: '$1,000' }
      ],
      summary: [
        { label: 'Total Centers', value: 50 },
        { label: 'Total Branches', value: 12 },
        { label: 'Total Clients', value: 2450 },
        { label: 'Closed Clients', value: 230 },
        { label: 'Deposit Balance', value: '$240,000' },
        { label: 'Loan Principal', value: '$370,000' },
        { label: 'Principal + Interest', value: '$450,000' }
      ]
    };
  }
};
</script>

<style scoped>
/* Subtle hover effect */
div[d-flex][flex-column]:hover {
  background-color: #f8f9fa;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out;
}

/* Responsive font scaling */
@media (max-width: 576px) {
  span.h5 {
    font-size: 1.25rem;
  }
  small {
    font-size: 0.65rem;
  }
}
</style>
