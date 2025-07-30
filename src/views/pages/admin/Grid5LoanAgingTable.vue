<template>
  <b-card title="Loan Portfolio Aging">
    <b-table striped hover :items="agingData" :fields="fields" responsive="sm"></b-table>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: 'days_active', label: 'Days Active' },
        { key: 'principal_overdue', label: 'Principal Overdue ($)' },
        { key: 'principal_balance', label: 'Principal Balance ($)' },
        { key: 'principal_percent', label: 'Balance %' },
        { key: 'accounts_affected', label: 'Accounts Affected' }
      ],
      agingData: [
        { days_active: '1-30', principal_overdue: 2500, principal_balance: 5000, principal_percent: '50%', accounts_affected: 20 },
        { days_active: '31-60', principal_overdue: 1500, principal_balance: 3000, principal_percent: '50%', accounts_affected: 10 },
        { days_active: '61-90', principal_overdue: 1000, principal_balance: 2000, principal_percent: '50%', accounts_affected: 5 }
      ]
    };
  }
};
</script>
