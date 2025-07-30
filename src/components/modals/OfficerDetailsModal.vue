<template>
  <b-modal
    id="officer-details-modal"
    :visible="value"
    title="Officer Details"
    @hide="$emit('input', false)"
    size="lg"
    centered
  >
    <div v-if="officer">
      <section class="mb-4 text-center">
        <img
          :src="passportPhotoDisplayUrl ? `${apiBaseUrl}${passportPhotoDisplayUrl}` : defaultPhoto"
          class="rounded-circle border border-secondary shadow-sm mb-2"
          style="width: 6rem; height: 6rem; object-fit: cover;"
        />
        <h4 class="text-primary font-weight-bold mt-2">{{ officer.fullName || 'N/A' }}</h4>
        <p class="text-muted mb-0">{{ officer.email || 'No email' }}</p>
        <p class="text-muted">{{ officer.phoneNumber || 'No phone' }}</p>
      </section>

      <section class="mb-4">
        <h5 class="text-primary border-bottom pb-2 mb-3">Personal Information</h5>
        <b-row class="mb-3">
          <b-col md="6" class="mb-2">
            <strong>ID Number:</strong>
            <div class="text-muted">{{ officer.idNumber || 'N/A' }}</div>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Date of Birth:</strong>
            <div class="text-muted">{{ formattedDob || 'N/A' }}</div>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Gender:</strong>
            <div class="text-muted">{{ officer.gender || 'N/A' }}</div>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Bank Details:</strong>
            <div class="text-muted">{{ officer.bankDetails || 'N/A' }}</div>
          </b-col>
        </b-row>
      </section>

      <section class="mb-4" v-if="officer.stationId">
        <h5 class="text-primary border-bottom pb-2 mb-3">Assignment Details</h5>
        <b-row class="mb-3">
          <b-col md="6" class="mb-2">
            <strong>Assigned Station:</strong>
            <div class="text-muted">{{ officer.stationName || 'N/A' }} (ID: {{ officer.stationId }})</div>
          </b-col>
        </b-row>
      </section>

      <section class="mb-4" v-if="officer.nextOfKins && officer.nextOfKins.length > 0">
        <h5 class="text-primary border-bottom pb-2 mb-3">Next of Kin</h5>
        <div v-for="(nok, index) in officer.nextOfKins" :key="index" class="mb-2 p-2 border rounded">
          <b-row>
            <b-col md="4">
              <strong>Name:</strong>
              <div class="text-muted">{{ nok.name || 'N/A' }}</div>
            </b-col>
            <b-col md="4">
              <strong>Phone:</strong>
              <div class="text-muted">{{ nok.phone || 'N/A' }}</div>
            </b-col>
            <b-col md="4">
              <strong>Relationship:</strong>
              <div class="text-muted">{{ nok.relationship || 'N/A' }}</div>
            </b-col>
          </b-row>
        </div>
      </section>

      <section class="mb-4" v-if="officer.locations && officer.locations.length > 0">
        <h5 class="text-primary border-bottom pb-2 mb-3">Locations</h5>
        <div v-for="(location, index) in officer.locations" :key="index" class="mb-2 p-2 border rounded">
          <b-row>
            <b-col md="4">
              <strong>County:</strong>
              <div class="text-muted">{{ location.county || 'N/A' }}</div>
            </b-col>
            <b-col md="4">
              <strong>Sub-County:</strong>
              <div class="text-muted">{{ location.subCounty || 'N/A' }}</div>
            </b-col>
            <b-col md="4">
              <strong>Ward:</strong>
              <div class="text-muted">{{ location.ward || 'N/A' }}</div>
            </b-col>
            <b-col md="12">
              <strong>GPS:</strong>
              <div class="text-muted">{{ location.gps || 'N/A' }}</div>
            </b-col>
          </b-row>
        </div>
      </section>

      <section class="mt-4">
        <h5 class="text-primary border-bottom pb-2 mb-3">Documents</h5>
        <b-row>
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
        <div v-else-if="!idDocumentDisplayUrl" class="text-muted mt-2">
          No documents uploaded.
        </div>
      </section>

      <section class="mt-4" v-if="officer.systemUserId">
        <h5 class="text-primary border-bottom pb-2 mb-3">System User Account</h5>
        <b-row class="mb-3">
          <b-col md="6" class="mb-2">
            <strong>Username:</strong>
            <div class="text-muted">{{ officer.systemUserName || 'N/A' }}</div>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>Email:</strong>
            <div class="text-muted">{{ officer.systemUserEmail || 'N/A' }}</div>
          </b-col>
          <b-col md="6" class="mb-2">
            <strong>System User ID:</strong>
            <div class="text-muted">{{ officer.systemUserId || 'N/A' }}</div>
          </b-col>
        </b-row>
      </section>
    </div>
    <div v-else class="text-center py-5 text-muted">
      <b-spinner small class="mr-2" /> Loading officer details...
    </div>

    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <b-button variant="primary" @click="editOfficer">
          <i class="bi bi-pencil-square me-2"></i>Edit Officer
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'OfficerDetailsModal',
  props: {
    value: Boolean,
    officer: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080',
      defaultPhoto: 'https://via.placeholder.com/100?text=Photo'
    };
  },
  computed: {
    formattedDob() {
      if (this.officer.dob) {
        const date = new Date(this.officer.dob);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
      }
      return 'N/A';
    },
    // --- New Computed Properties for Documents ---
    passportPhotoDisplayUrl() {
      // Assuming 'PASSPORT_PHOTO' is a specific contentType or identifier set on the backend
      const photoDoc = (this.officer.documents || []).find(doc =>
        doc.contentType && doc.contentType.toUpperCase().includes('PASSPORT')
      );
      // Fallback to officer.passportPhotoPath if the new document structure isn't fully in place yet,
      // but prioritize the structured documents array.
      return photoDoc?.fileUrl || this.officer.passportPhotoPath || null;
    },
    idDocumentDisplayUrl() {
      // Assuming 'ID_DOCUMENT' or 'IDENTITY' is a specific contentType or identifier
      const idDoc = (this.officer.documents || []).find(doc =>
        doc.contentType && (doc.contentType.toUpperCase().includes('ID') || doc.contentType.toUpperCase().includes('IDENTITY'))
      );
      return idDoc?.fileUrl || null; // No direct fallback path for ID document
    },
    otherDocuments() {
      // Filter out passport photo and ID document from the main documents array
      const excludedUrls = new Set();
      if (this.passportPhotoDisplayUrl) excludedUrls.add(this.passportPhotoDisplayUrl);
      if (this.idDocumentDisplayUrl) excludedUrls.add(this.idDocumentDisplayUrl);

      return (this.officer.documents || []).filter(doc =>
        doc.fileUrl && !excludedUrls.has(doc.fileUrl)
      );
    }
  },
  methods: {
    editOfficer() {
      this.$emit('input', false);
      if (this.officer && this.officer.id) {
        this.$router.push({ name: 'Entry', params: { officerId: this.officer.id }, query: { menu: 'New Officer' } });
      } else {
        console.warn("No officer ID available to navigate for edit.");
        this.$router.push({ name: 'Entry', query: { menu: 'New Officer' } });
      }
    }
  }
};
</script>

<style scoped>
/* Keep existing styles */
.text-primary.border-bottom {
  border-color: #007bff !important;
}
</style>