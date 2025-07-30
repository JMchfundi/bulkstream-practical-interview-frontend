<template>
  <b-modal id="client-details-modal" :visible="value" title="Client Details" @hide="$emit('input', false)"
    size="xl" centered>
    <div v-if="client">
      <section class="mb-4 d-flex align-items-center">
        <img :src="passportPhotoDisplayUrl ? `${apiBaseUrl}${passportPhotoDisplayUrl}` : defaultPhoto"
          class="rounded-circle border border-secondary shadow-sm me-3"
          style="width: 10rem; height: 10rem; object-fit: cover;" />

        <div>
          <h4 class="text-primary font-weight-bold">{{ client.fullName || 'N/A' }}</h4>
          <p class="text-muted mb-0"><i class="bi bi-envelope me-1"></i>{{ client.email || 'No email' }}</p>
          <p class="text-muted mb-0"><i class="bi bi-phone me-1"></i>{{ client.phoneNumber || 'No phone' }}</p>
          <p class="text-muted mb-0"><i class="bi bi-briefcase me-1"></i>Officer: <span class="font-weight-bold ms-1">{{
            client.officerName || 'N/A' }}</span></p>
          <p class="text-muted mb-0"><i class="bi bi-building me-1"></i>Station: <span class="font-weight-bold ms-1">{{
            client.stationName || 'N/A' }}</span></p>
          <p class="text-muted"><i class="bi bi-people me-1"></i>Member of:
            <button v-if="client.groupId" class="btn btn-sm btn-outline-primary ms-2"
              @click="viewGroup(client.groupId)">
              {{ client.groupName || 'N/A' }} <i class="bi bi-eye"></i>
            </button>
            <span v-else>N/A</span>
          </p>
        </div>
      </section>

      <section class="mb-4">
        <h5 class="text-primary border-bottom pb-2 mb-3">Personal Details</h5>
        <b-row class="g-3">
          <b-col md="4"><strong>ID Number:</strong>
            <div class="text-muted">{{ client.idNumber || 'N/A' }}</div>
          </b-col>
          <b-col md="4"><strong>Date of Birth:</strong>
            <div class="text-muted">{{ formatDob(client.dob) }}</div>
          </b-col>
          <b-col md="4"><strong>Gender:</strong>
            <div class="text-muted">{{ client.gender || 'N/A' }}</div>
          </b-col>
        </b-row>
      </section>

      <section class="mb-4">
        <h5 class="text-primary border-bottom pb-2 mb-3">Location Details</h5>
        <b-table :items="client.locations" :fields="locationFields" small responsive bordered striped show-empty
          empty-text="No location details found.">
          <template #cell(type)="data">
            <span v-if="data.index === 0">Residential Address</span>
            <span v-else-if="data.index === 1">Home Address</span>
            <span v-else>Other Location ({{ data.index + 1 }})</span>
          </template>
          <template #cell(gps)="data">
            <span v-if="data.item.gps">{{ data.item.gps }}</span>
            <span v-else class="text-muted">N/A</span>
          </template>
        </b-table>
      </section>

      <section class="mb-4">
        <h5 class="text-primary border-bottom pb-2 mb-3">Documents</h5>
        <b-row>
          <b-col md="6">
            <strong>Passport Photo:</strong>
            <div>
              <a v-if="passportPhotoDisplayUrl" :href="`${apiBaseUrl}${passportPhotoDisplayUrl}`" target="_blank">View
                Photo</a>
              <span v-else class="text-muted">Not uploaded</span>
            </div>
          </b-col>
          <b-col md="6">
            <strong>ID Document:</strong>
            <div>
              <a v-if="idDocumentDisplayUrl" :href="`${apiBaseUrl}${idDocumentDisplayUrl}`" target="_blank">View
                Document</a>
              <span v-else class="text-muted">Not uploaded</span>
            </div>
          </b-col>
        </b-row>
        <div v-if="otherDocuments.length > 0" class="mt-3">
          <h6>Other Documents:</h6>
          <b-table :items="otherDocuments" :fields="[
            { key: 'fileName', label: 'File Name' },
            { key: 'contentType', label: 'Type' },
            { key: 'fileUrl', label: 'Action' }
          ]" small responsive striped>
            <template #cell(fileUrl)="data">
              <a :href="`${apiBaseUrl}${data.item.fileUrl}`" target="_blank">View</a>
            </template>
          </b-table>
        </div>
      </section>

      <section class="mb-4">
        <h5 class="text-primary border-bottom pb-2 mb-3">Financial Accounts</h5>
        <b-row>
          <b-col md="6">
            <b-card no-body class="h-100">
              <b-card-header class="bg-light font-weight-bold">💰 Savings & Current Accounts</b-card-header>
              <b-table :items="savingsAndCurrentAccounts" :fields="accountFields" small responsive bordered striped
                show-empty empty-text="No savings or current accounts found.">
                <template #cell(balance)="data"><span class="text-success">{{ formatCurrency(data.item.balance)
                    }}</span></template>
                <template #cell(name)="data"><span :title="data.item.name">{{ formatAccountName(data.item.name)
                    }}</span></template>
              </b-table>
            </b-card>
          </b-col>
          <b-col md="6">
            <b-card no-body class="h-100">
              <b-card-header class="bg-light font-weight-bold">🧾 Loan Accounts</b-card-header>
              <b-table :items="loanAccounts" :fields="accountFields" small responsive bordered striped show-empty
                empty-text="No loan accounts found.">
                <template #cell(balance)="data"><span class="text-danger">{{ formatCurrency(data.item.balance)
                    }}</span></template>
                <template #cell(name)="data"><span :title="data.item.name">{{ formatAccountName(data.item.name)
                    }}</span></template>
              </b-table>
            </b-card>
          </b-col>
        </b-row>
      </section>

      <section class="mb-4">
        <h5 class="text-primary border-bottom pb-2 mb-3">Next of Kin</h5>
        <b-table :items="client.nextOfKins" :fields="kinFields" small responsive bordered striped show-empty
          empty-text="No next of kin details found." />
      </section>

      <GroupDetailsModal v-model="showGroupModal" :group="selectedGroup" :loading="groupLoading" />
    </div>

    <div v-else class="text-center py-5 text-muted">
      <b-spinner small class="me-2" /> Loading client details...
    </div>

    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <b-button variant="primary" @click="editClient">
          <i class="bi bi-pencil-square me-2"></i>Edit Client
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import GroupDetailsModal from '@/components/modals/GroupDetailsModal.vue';
import groupApi from '@/api/groupApi';

export default {
  name: 'ClientDetailsModal',
  components: { GroupDetailsModal },
  props: {
    value: Boolean,
    client: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
      defaultPhoto: 'https://via.placeholder.com/100?text=Photo',
      showGroupModal: false,
      selectedGroup: null,
      groupLoading: false,
      accountFields: [
        { key: 'accountCategory', label: 'Account Name' },
        { key: 'balance', label: 'Balance' }
      ],
      kinFields: [
        { key: 'name', label: 'Full Name' },
        { key: 'relationship', label: 'Relationship' },
        { key: 'phone', label: 'Phone Number' }
      ],
      locationFields: [
        { key: 'type', label: 'Type' },
        { key: 'county', label: 'County' },
        { key: 'subCounty', label: 'Sub-County' },
        { key: 'ward', label: 'Ward' },
        { key: 'gps', label: 'GPS' }
      ]
    };
  },
  computed: {
    passportPhotoDisplayUrl() {
      const doc = this.client.documents?.[0];
      return doc?.fileUrl || this.client.passportPhotoDisplayUrl || null;
    },
    idDocumentDisplayUrl() {
      const doc = this.client.documents?.[1];
      return doc?.fileUrl || this.client.idDocumentDisplayUrl || null;
    },
    otherDocuments() {
      return (this.client.documents || []).slice(2);
    },
    savingsAndCurrentAccounts() {
      return (this.client.accountSummaries || []).filter(acc => {
        const cat = acc.accountCategory?.toUpperCase();
        return cat === 'SAVING' || cat === 'CURRENT';
      });
    },
    loanAccounts() {
      return (this.client.accountSummaries || []).filter(acc => {
        const cat = acc.accountCategory?.toUpperCase();
        return cat && cat !== 'SAVING' && cat !== 'CURRENT';
      });
    }
  },
  methods: {
    formatDob(dobString) {
      if (!dobString) return 'N/A';
      try {
        const date = new Date(dobString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      } catch {
        return dobString;
      }
    },
    formatAccountName(name) {
      return name || 'N/A';
    },
    formatCurrency(amount) {
      if (amount === null || amount === undefined) return 'KES 0.00';
      return `KES ${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    async viewGroup(groupId) {
      this.selectedGroup = null;
      this.groupLoading = true;
      this.showGroupModal = true;
      try {
        const response = await groupApi.getById(groupId);
        this.selectedGroup = response.data;
      } catch (error) {
        console.error('Failed to fetch group details:', error);
      } finally {
        this.groupLoading = false;
      }
    },
    // Added editClient method based on StationDetailsModal's pattern
    editClient() {
      this.$emit('input', false); // Hide the current details modal

      if (this.client && this.client.id) {
        // Navigate to the 'Entry' route, passing the client ID as a parameter
        // and 'New Client' as a query parameter for menu highlighting.
        // This mirrors the pattern used for editing stations.
        this.$router.push({ name: 'Entry', params: { clientId: this.client.id }, query: { menu: 'New Client' } });
      } else {
        console.warn("No client ID available to navigate for edit.");
        // Fallback: If no client ID, navigate to the general 'New Client' form
        this.$router.push({ name: 'Entry', query: { menu: 'New Client' } });
      }
    }
  }
};
</script>

<style scoped>
b-avatar {
  object-fit: cover;
}

section {
  padding-bottom: 1rem;
}
</style>