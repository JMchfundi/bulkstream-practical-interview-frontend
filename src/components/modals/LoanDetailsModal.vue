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
    <div v-if="loan">
      <!-- Borrower's Details -->
      <section class="mb-4 pb-3 border-bottom border-primary">
        <h5 class="text-primary font-weight-bold mb-3">Borrower's Details</h5>
        <b-row class="align-items-center">
          <b-col cols="auto">
            <b-avatar
              :src="loan.borrower?.photoUrl || defaultProfile"
              size="6rem"
              rounded
              class="shadow-sm"
            ></b-avatar>
          </b-col>
          <b-col>
            <p class="mb-1"><strong>Name:</strong> {{ loan.borrower?.fullName || '-' }}</p>
            <p class="mb-1"><strong>ID Number:</strong> {{ loan.idNumber || '-' }}</p>
            <p class="mb-1"><strong>Email:</strong> {{ loan.borrower?.email || '-' }}</p>
            <p class="mb-0"><strong>Phone:</strong> {{ loan.borrower?.phone || '-' }}</p>
          </b-col>
        </b-row>
      </section>

      <!-- Guarantors -->
      <section class="mb-4 pb-3 border-bottom border-primary">
        <h5 class="text-primary font-weight-bold mb-3">Guarantors</h5>
        <ul v-if="loan.guarantors && loan.guarantors.length" class="pl-3">
          <li v-for="(guarantor, index) in loan.guarantors" :key="index" class="mb-1">
            {{ guarantor.fullName }} — {{ guarantor.relationship }} (<a :href="`tel:${guarantor.phone}`">{{ guarantor.phone }}</a>)
          </li>
        </ul>
        <p v-else class="text-muted">No guarantors added.</p>
      </section>

      <!-- Loan Details -->
      <section class="mb-4 pb-3 border-bottom border-primary">
        <h5 class="text-primary font-weight-bold mb-3">Loan Details</h5>
        <b-row>
          <b-col md="6" class="mb-2">
            <strong>Loan ID:</strong> <span class="text-muted">{{ loan.id || '-' }}</span>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Loan Type:</strong> <span class="text-muted">{{ loan.loanTypeName || '-' }}</span>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Principal:</strong> <span class="text-success font-weight-bold">{{ formatCurrency(loan.principalAmount) }}</span>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Interest Rate:</strong> <span class="text-warning font-weight-bold">{{ loan.interestRate }}%</span>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Term:</strong> <span class="text-info font-weight-bold">{{ loan.loanTerm }} {{ loan.termUnit }}</span>
          </b-col>
          <b-col md="6" class="mb-2 d-flex align-items-center">
            <strong>Status:</strong>
            <b-badge
              :variant="approvalStatusVariant(loan.approvalStatus)"
              class="ml-2 text-uppercase px-3 py-1"
            >
              {{ loan.approvalStatus || '-' }}
            </b-badge>
          </b-col>
          <b-col md="12" class="mb-2">
            <strong>Created On:</strong> <span class="text-muted">{{ formatDate(loan.creationDate) }}</span>
          </b-col>
        </b-row>

        <div class="mt-3">
          <b-progress :max="loan.approvers?.length || 1" :value="approvedCount" height="20px" animated>
            <b-progress-bar
              :value="approvedCount"
              variant="success"
              :label="`${approvedCount} / ${loan.approvers?.length || 0} Approved`"
             />
          </b-progress>
        </div>
      </section>

      <!-- Supporting Details -->
      <section class="mb-4 pb-3 border-bottom border-primary">
        <h5 class="text-primary font-weight-bold mb-3">Supporting Details</h5>
        <p>
          <strong>Purpose:</strong>
          <span class="text-muted">{{ loan.purpose || '-' }}</span>
        </p>
        <p><strong>Attachments:</strong></p>
        <ul v-if="loan.attachments && loan.attachments.length" class="list-unstyled pl-3">
          <li v-for="(file, index) in loan.attachments" :key="index" class="mb-1">
            <a :href="file.url" target="_blank" class="text-primary">
              <b-icon icon="paperclip" class="mr-1"></b-icon>{{ file.name }}
            </a>
          </li>
        </ul>
        <p v-else class="text-muted">No attachments provided.</p>
      </section>

      <!-- Approvers -->
      <section>
        <h5 class="text-primary font-weight-bold mb-3 border-bottom border-primary pb-2">Approvers</h5>
        <b-list-group flush>
          <b-list-group-item
            v-for="(approver, index) in loan.approvers"
            :key="index"
            class="d-flex justify-content-between align-items-center"
          >
            <div>
              <b-icon
                :icon="approverIcon(approver.status)"
                :variant="approvalStatusVariant(approver.status)"
                class="mr-2"
              ></b-icon>
              {{ approver.name }}
            </div>
            <div class="text-right">
              <b-badge
                :variant="approvalStatusVariant(approver.status)"
                class="text-uppercase px-3 py-1"
              >
                {{ approver.status }}
              </b-badge>
              <div class="small text-muted">{{ formatDate(approver.date) }}</div>
            </div>
          </b-list-group-item>
          <b-list-group-item v-if="!loan.approvers || loan.approvers.length === 0" class="text-muted text-center">
            No approval data available.
          </b-list-group-item>
        </b-list-group>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'LoanDetailsModal',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    loan: {
      type: Object,
      default: () => ({}),
    },
    modalId: {
      type: String,
      default: 'loan-review-modal',
    },
    modalTitle: {
      type: String,
      default: 'Loan Review',
    },
  },
  data() {
    return {
      defaultProfile: 'https://via.placeholder.com/100?text=Photo',
    };
  },
  computed: {
    approvedCount() {
      if (!this.loan.approvers) return 0;
      return this.loan.approvers.filter(
        (a) => a.status.toLowerCase() === 'approved'
      ).length;
    },
  },
  methods: {
    formatCurrency(value) {
      if (value == null) return '-';
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
      }).format(value);
    },
    formatDate(dateStr) {
      if (!dateStr) return '-';
      return new Date(dateStr).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
    approvalStatusVariant(status) {
      if (!status) return 'secondary';
      const s = status.toLowerCase();
      if (s.includes('approved')) return 'success';
      if (s.includes('pending')) return 'warning';
      if (s.includes('rejected')) return 'danger';
      return 'info';
    },
    approverIcon(status) {
      const s = status.toLowerCase();
      if (s === 'approved') return 'check-circle-fill';
      if (s === 'pending') return 'hourglass-split';
      if (s === 'rejected') return 'x-circle-fill';
      return 'question-circle';
    },
  },
};
</script>
