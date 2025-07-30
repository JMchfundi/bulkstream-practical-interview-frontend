<template>
  <b-modal
    :id="modalId"
    :title="modalTitle"
    :visible="value"
    @hide="$emit('input', false)"
    size="xl"
    hide-footer
    centered
  >
    <div v-if="loading || !group" class="text-center my-3">
      <b-spinner label="Loading Group Details..."></b-spinner>
      <p class="mt-2 text-muted">Loading group details...</p>
    </div>

    <div v-else>
      <!-- Group Details Section -->
      <section class="mb-4 pb-3 border-bottom border-primary">
        <h5 class="text-primary font-weight-bold mb-3">Group Details & Membership</h5>
        <b-row>
          <b-col md="6" class="mb-2" v-for="(label, key) in groupDetailFields" :key="key">
            <dl class="mb-0">
              <dt class="d-inline-block font-weight-bold mr-1">{{ label }}:</dt>
              <dd class="d-inline-block text-muted mb-0">{{ processedGroup[key] }}</dd>
            </dl>
          </b-col>
        </b-row>
      </section>

      <!-- Financial Overview Section -->
      <section class="mb-4 pb-3 border-bottom border-primary">
        <h5 class="text-primary font-weight-bold mb-3">Financial Overview & Loan Portfolio</h5>
        <b-row>
          <b-col md="6" class="mb-2" v-for="(label, key) in financialFields" :key="key">
            <dl class="mb-0">
              <dt class="d-inline-block font-weight-bold mr-1">{{ label }}:</dt>
              <dd :class="['d-inline-block', highlightClass(key), 'mb-0']">{{ processedGroup[key] }}</dd>
            </dl>
          </b-col>
        </b-row>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'GroupDetailsModal',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    group: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    modalId: {
      type: String,
      default: 'group-details-modal',
    },
    modalTitle: {
      type: String,
      default: 'Group Overview',
    },
  },
  computed: {
    groupDetailFields() {
      return {
        groupName: 'Group Name',
        groupId: 'Group ID',
        groupType: 'Group Type',
        status: 'Status',
        creationDate: 'Created On',
        groupOfficer: 'Group Officer',
        memberCount: 'Total Members',
        activeMembers: 'Active Members',
      };
    },
    financialFields() {
      return {
        totalSavings: 'Total Group Savings',
        avgMemberSavings: 'Average Savings per Member',
        totalLoansIssued: 'Total Loans Issued',
        loansInArrears: 'Loans in Arrears',
        totalOLBs: 'Total Outstanding Loan Balances (OLBs)',
        avgLoanSize: 'Average Loan Size',
      };
    },
    processedGroup() {
      if (!this.group) return {};

      const totalSavings = this.group.savingbalance ?? 0;
      const totalMembers = this.group.totalClients ?? 1;

      return {
        groupName: this.group.groupName || 'N/A',
        groupId: this.group.id || 'N/A',
        groupType: this.group.groupType || 'N/A',
        status: this.group.status || 'Active',
        creationDate: this.formatDate(this.group.creationDate),
        groupOfficer: this.group.officerName || 'N/A',
        memberCount: totalMembers || 'N/A',
        activeMembers: this.group.activeMembers ?? 'N/A',

        // Financials
        totalSavings: this.formatCurrency(totalSavings),
        avgMemberSavings: this.formatCurrency(totalSavings / totalMembers),
        totalLoansIssued: this.formatCurrency(totalSavings),
        loansInArrears: this.formatCurrency(totalSavings),
        totalOLBs: this.formatCurrency(totalSavings),
        avgLoanSize: this.formatCurrency(totalSavings / totalMembers),
      };
    },
  },
  methods: {
    formatCurrency(value) {
      if (value == null || isNaN(value)) return 'N/A';
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 2,
      }).format(value);
    },
    formatDate(dateStr) {
      if (!dateStr) return 'N/A';
      try {
        return new Date(dateStr).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } catch (error) {
        console.error("Error formatting date:", error);
        return 'Invalid Date';
      }
    },
    highlightClass(key) {
      if (key === 'totalSavings') return 'text-success font-weight-bold';
      if (key === 'totalOLBs') return 'text-danger font-weight-bold';
      if (key === 'loansInArrears') return 'text-warning font-weight-bold';
      return 'text-muted';
    },
  },
};
</script>

<style scoped>
dl.mb-0 dt {
  min-width: 120px;
}
</style>
