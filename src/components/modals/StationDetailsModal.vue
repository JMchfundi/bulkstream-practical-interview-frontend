<template>
  <b-modal
    :id="modalId"
    :title="modalTitle"
    :visible="value"
    @hide="$emit('input', false)"
    size="lg"
    centered
    scrollable
  >
    <div v-if="station" class="station-details-content">
      <section class="mb-4">
        <h5 class="text-primary fw-bold pb-2 border-bottom mb-3">
          <i class="bi bi-building me-2"></i>General Station Information
        </h5>
        <b-row class="g-3">
          <b-col md="6">
            <div class="detail-item">
              <strong>Station Name:</strong>
              <span>{{ station.stationName || 'N/A' }}</span>
            </div>
          </b-col>
          <b-col md="6">
            <div class="detail-item">
              <strong>Level Type:</strong>
              <span>{{ station.levelType || 'N/A' }}</span>
            </div>
          </b-col>
          <b-col md="6">
            <div class="detail-item">
              <strong>Office Linked To:</strong>
              <span>{{ getOfficeLinkedToName(station.parentId) }}</span>
            </div>
          </b-col>
        </b-row>
      </section>

      <hr class="my-4" />

      <section class="mb-4">
        <h5 class="text-primary fw-bold pb-2 border-bottom mb-3">
          <i class="bi bi-geo-alt me-2"></i>Location Details
        </h5>
        <b-row class="g-3">
          <b-col md="6">
            <div class="detail-item">
              <strong>County:</strong>
              <span>{{ station.location?.county || 'N/A' }}</span>
            </div>
          </b-col>
          <b-col md="6">
            <div class="detail-item">
              <strong>Sub-County:</strong>
              <span>{{ station.location?.subCounty || 'N/A' }}</span>
            </div>
          </b-col>
          <b-col md="6">
            <div class="detail-item">
              <strong>Ward:</strong>
              <span>{{ station.location?.ward || 'N/A' }}</span>
            </div>
          </b-col>
          <b-col md="6">
            <div class="detail-item">
              <strong>GPS Coordinates:</strong>
              <span>{{ station.location?.gps || 'N/A' }}</span>
            </div>
          </b-col>
        </b-row>
      </section>

      <hr class="my-4" v-if="station.document" />

      <section v-if="station.document">
        <h5 class="text-primary fw-bold pb-2 border-bottom mb-3">
          <i class="bi bi-file-earmark-text me-2"></i>Supporting Document
        </h5>
        <b-row class="g-3">
          <b-col md="6">
            <div class="detail-item">
              <strong>File Name:</strong>
              <span>{{ station.document.fileName || 'N/A' }}</span>
            </div>
          </b-col>
          <b-col md="6">
            <div class="detail-item">
              <strong>File Type:</strong>
              <span>{{ station.document.contentType || 'N/A' }}</span>
            </div>
          </b-col>
          <b-col md="12">
            <div class="detail-item">
              <strong>Document Link:</strong>
              <a v-if="station.document.fileUrl" :href="station.document.fileUrl" target="_blank"
                 class="btn btn-sm btn-outline-primary mt-2">
                <i class="bi bi-box-arrow-up-right me-1"></i> View Document
              </a>
              <span v-else>N/A</span>
            </div>
          </b-col>
        </b-row>
      </section>
    </div>
    <div v-else class="text-center py-5 text-muted">
        <i class="bi bi-info-circle fs-3 mb-2"></i>
        <p>No station data available for display.</p>
    </div>

    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <b-button variant="primary" @click="editStation">
          <i class="bi bi-pencil-square me-2"></i>Edit Station
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import stationApi from '@/api/stationApi';

export default {
  name: 'StationDetailsModal',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    station: {
      type: Object,
      default: () => ({}), // Ensure default is an empty object
    },
    modalId: {
      type: String,
      default: 'station-details-modal',
    },
    modalTitle: {
      type: String,
      default: 'Station Overview',
    },
  },
  data() {
    return {
      allStationsMap: new Map(),
    };
  },
  watch: {
    value(newVal) {
      if (newVal && this.allStationsMap.size === 0) {
        this.fetchAllStationsForLookup();
      }
    },
  },
  methods: {
    async fetchAllStationsForLookup() {
      try {
        const res = await stationApi.getAll();
        this.allStationsMap = new Map(res.data.map(station => [station.id, station.stationName]));
      } catch (error) {
        console.error("Failed to fetch all stations for parent name lookup:", error);
      }
    },
    getOfficeLinkedToName(parentId) {
      if (!parentId) {
        return 'N/A';
      }
      return this.allStationsMap.get(parentId) || 'Unknown Office';
    },
    editStation() {
      // Hide the current details modal
      this.$emit('input', false);
      
      // Navigate to the 'New Station' route, passing the station ID as a parameter
      // Make sure your router has a route defined like:
      // { path: '/entry/new-station/:id?', name: 'New Station', component: EntryComponent }
      if (this.station && this.station.id) {
        this.$router.push({ name: 'Entry', params: { stationId: this.station.id }, query: { menu: 'New Station' } });
      } else {
        console.warn("No station ID available to navigate for edit.");
        // Optionally, navigate to the new station form without pre-filling
        this.$router.push({ name: 'Entry', query: { menu: 'New Station' } });
      }
    }
  },
};
</script>

<style scoped>
/* Keep existing styles */
.station-details-content {
  padding: 1rem 0.5rem;
}

.detail-item {
  margin-bottom: 1rem;
}

.detail-item strong {
  display: block;
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 0.2rem;
  text-transform: uppercase;
}

.detail-item span {
  font-size: 1rem;
  color: #343a40;
  font-weight: 500;
  display: block;
}

.b-row.g-3 > .b-col {
  padding-left: calc(var(--bs-gutter-x) * .5);
  padding-right: calc(var(--bs-gutter-x) * .5);
}

hr.my-4 {
  border-top: 1px dashed #e0e0e0;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}
.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}
</style>