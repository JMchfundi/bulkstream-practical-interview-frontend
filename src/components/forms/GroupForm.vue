<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitForm" novalidate>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Group Name</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-chat-left-text"></i></span>
                <input v-model="form.groupName" type="text" class="form-control" placeholder="Enter group name"
                       :class="{'is-invalid': errors.groupName}">
              </div>
              <div v-if="errors.groupName" class="invalid-feedback d-block">{{ errors.groupName }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">County</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                <input v-model="form.county" type="text" class="form-control" readonly
                       :class="{'is-invalid': errors.county}">
              </div>
              <div v-if="errors.county" class="invalid-feedback d-block">{{ errors.county }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Sub-County</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-geo"></i></span>
                <input v-model="form.subCounty" type="text" class="form-control" readonly
                       :class="{'is-invalid': errors.subCounty}">
              </div>
              <div v-if="errors.subCounty" class="invalid-feedback d-block">{{ errors.subCounty }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Ward</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-house-door"></i></span>
                <input v-model="form.ward" type="text" class="form-control" readonly
                       :class="{'is-invalid': errors.ward}">
              </div>
              <div v-if="errors.ward" class="invalid-feedback d-block">{{ errors.ward }}</div>
            </div>

                        <div class="col-md-6">
              <label class="form-label">GPS Coordinates</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-crosshair"></i></span>
                <input v-model="form.gps" type="text" class="form-control" readonly
                       :class="{ 'is-invalid': errors.gps }" />
                <button class="btn btn-outline-primary" type="button" @click="showLocationModal = true">
                  <i class="bi bi-map-fill"></i>
                </button>
              </div>
              <div class="invalid-feedback d-block" v-if="errors.gps">{{ errors.gps }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Officer</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-person-badge-fill"></i></span>
                <select v-model.number="form.officerId" class="form-control" :class="{'is-invalid': errors.officerId}">
                  <option value="">Select officer</option>
                  <option v-for="officer in officers" :key="officer.id" :value="officer.id">
                    {{ officer.fullName }}
                  </option>
                </select>
              </div>
              <div v-if="errors.officerId" class="invalid-feedback d-block">{{ errors.officerId }}</div>
            </div>
          </div>

          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary px-5 rounded-pill" :disabled="loading">
              <i class="bi bi-save me-2"></i>{{ loading ? 'Saving...' : 'Save Group' }}
            </button>
          </div>
        </form>

        <Group class="col-12"></Group>

        <location-picker-modal :visible="showLocationModal" @close="showLocationModal = false"
                               @location-selected="handleLocationSelected" />
      </div>
    </div>
  </div>
</template>

<script>
import LocationPickerModal from "@/components/forms/LocationPickerModal.vue";
import groupApi from '@/api/groupApi';
import officerApi from '@/api/officerApi';
import swal from '@/utils/swal';
import Group from "../../components/tables/group.vue";

export default {
  name: 'NewGroupForm',
  components: {
    Group,
    LocationPickerModal,
  },
  data() {
    return {
      form: {
        groupName: '',
        county: '',
        subCounty: '',
        ward: '',
        officerId: '',
        gps: '',
      },
      errors: {},
      officers: [],
      loading: false,
      showLocationModal: false,
    };
  },
  mounted() {
    this.fetchOfficers();
    this.setUserLocation();
  },
  methods: {
    handleLocationSelected(data) {
      this.form.gps = data.gps;
      this.form.county = data.county;
      this.form.subCounty = data.subCounty;
      this.form.ward = data.ward;
      this.validateForm();
    },
    async setUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const gps = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            this.form.gps = gps;

            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`, {
                headers: { "User-Agent": "vue-group-form/1.0" }
              });

              const data = await res.json();
              const address = data.address || {};

              this.form.county = address.state || '';
              this.form.subCounty = address.county || address.city || '';
              this.form.ward = address.city || address.hamlet || '';
            } catch (err) {
              console.warn("Reverse geocoding failed:", err);
            }
          },
          (err) => {
            console.warn("Geolocation not allowed or failed. Defaulting to Mombasa, Mombasa County.", err);
            this.form.gps = "-4.0372, 39.6700";
            this.form.county = "Mombasa";
            this.form.subCounty = "Mombasa";
            this.form.ward = "Old Town";
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser. Defaulting to Mombasa, Mombasa County.");
        this.form.gps = "-4.0372, 39.6700";
        this.form.county = "Mombasa";
        this.form.subCounty = "Mombasa";
        this.form.ward = "Old Town";
      }
    },
    fetchOfficers() {
      officerApi.getAll()
        .then(response => {
          this.officers = response.data;
        })
        .catch(error => {
          console.error('Failed to load officers:', error);
        });
    },
    validateForm() {
      this.errors = {};
      const {
        groupName,
        county,
        subCounty,
        ward,
        officerId,
        gps
      } = this.form;

      if (!groupName) this.errors.groupName = 'Group name is required.';
      if (!gps) this.errors.gps = 'GPS Coordinates are required. Please select a location on the map.';
      if (!county) this.errors.county = 'County is required. Please select a location on the map.';
      if (!subCounty) this.errors.subCounty = 'Sub-County is required. Please select a location on the map.';
      if (!ward) this.errors.ward = 'Ward is required. Please select a location on the map.';
      if (!officerId) this.errors.officerId = 'Please select an officer.';

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      this.loading = true;

      if (this.validateForm()) {
        const payload = {
          groupName: this.form.groupName,
          location: { // Group location fields under a 'location' object
            county: this.form.county,
            subCounty: this.form.subCounty,
            ward: this.form.ward,
            gps: this.form.gps,
          },
          officerId: this.form.officerId
        };

        groupApi.create(payload)
          .then(() => {
            swal.success('Group created successfully!');
            this.resetForm();
          })
          .catch((err) => {
            console.error('Failed to create group:', err);
            swal.error('Failed to create group. Please try again.');
            if (err.response && err.response.data && err.response.data.errors) {
                this.errors = err.response.data.errors;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
        swal.warning('Please correct the validation errors before submitting.');
      }
    },
    resetForm() {
      this.form = {
        groupName: '',
        county: '',
        subCounty: '',
        ward: '',
        officerId: '',
        gps: '',
      };
      this.errors = {};
      this.setUserLocation();
    }
  }
};
</script>

<style scoped>
.invalid-feedback.d-block {
  display: block !important;
}
</style>