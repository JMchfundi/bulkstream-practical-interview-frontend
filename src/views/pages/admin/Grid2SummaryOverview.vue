<template>
  <b-card title="System Summary">
    <b-row
      class="flex-nowrap overflow-auto"
      no-gutters
      style="gap: 0.5rem;"
    >
      <b-col
        v-for="(item, index) in summary"
        :key="index"
        cols="auto"
        class="mb-2"
        style="min-width: 120px;"
      >
        <b-card
          bg-variant="primary"
          text-variant="white"
          class="py-2 px-3 text-center"
          style="font-size: 0.85rem;"
        >
          <h6 class="mb-1">{{ item.label }}</h6>
          <h5 class="mb-0">{{ item.value }}</h5>
        </b-card>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
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
