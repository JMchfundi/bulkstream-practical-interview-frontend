<template>
  <div class="card">
    <div class="card-body">
      <div class="text-center mb-4" v-if="!isEditMode">
        <button class="btn btn-warning" @click="autoPopulate">
          <i class="bi bi-building me-2"></i>Auto-Populate for Demo
        </button>
      </div>

      <div class="progress-container mb-4">
        <div class="progress-line">
          <div class="progress" :style="{ width: `${(currentStep - 1) / 2 * 100}%` }"></div>
        </div>
        <div class="step-labels d-flex justify-content-between">
          <div class="d-none d-md-block" :class="{ active: currentStep >= 1 }">
            <i class="bi bi-geo-alt-fill me-1"></i>Step 1: Location
          </div>
          <div class="d-none d-md-block" :class="{ active: currentStep >= 2 }">
            <i class="bi bi-house-gear-fill me-1"></i>Step 2: Infrastructure
          </div>
          <div class="d-none d-md-block" :class="{ active: currentStep === 3 }">
            <i class="bi bi-upload me-1"></i>Step 3: Attachment
          </div>

          <div class="d-block d-md-none w-100 text-center font-weight-bold">
            <template v-if="currentStep === 1">Step 1: Location</template>
            <template v-else-if="currentStep === 2">Step 2: Infrastructure</template>
            <template v-else-if="currentStep === 3">Step 3: Attachment</template>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm" novalidate>
        <div v-if="currentStep === 1">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Station Name</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-building"></i></span>
                <input v-model="form.stationName" type="text" class="form-control"
                  :class="{ 'is-invalid': formTouched && errors.stationName }"
                  @blur="validateField('stationName', 1)" />
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.stationName">{{ errors.stationName }}
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Level</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-diagram-3-fill"></i></span>
                <select v-model="form.levelType" class="form-control"
                  :class="{ 'is-invalid': formTouched && errors.levelType }" @blur="validateField('levelType', 1)">
                  <option value="">Select</option>
                  <option value="Main Office">Main Office</option>
                  <option value="HQ">HQ</option>
                  <option value="Branch">Branch</option>
                  <option value="Sub-Branch">Sub-Branch</option>
                </select>
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.levelType">{{ errors.levelType }}</div>
            </div>

            <div class="col-md-6" v-if="form.levelType !== 'Main Office'">
              <label class="form-label">Office</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-diagram-3"></i></span>
                <select v-model.number="form.parentId" class="form-control" :disabled="isParentLocked"
                  :class="{ 'is-invalid': formTouched && errors.parentId }" @blur="validateField('parentId', 1)">
                  <option value="">Select Parent</option>
                  <option v-for="station in parentStations" :key="station.id" :value="station.id">
                    {{ station.stationName }} ({{ station.levelType }})
                  </option>
                </select>
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.parentId">{{ errors.parentId }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">County</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-map"></i></span>
                <input v-model="form.county" type="text" class="form-control" readonly
                  :class="{ 'is-invalid': formTouched && errors.county }" @blur="validateField('county', 1)" />
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.county">{{ errors.county }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Sub-County</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-diagram-3"></i></span>
                <input v-model="form.subCounty" type="text" class="form-control" readonly
                  :class="{ 'is-invalid': formTouched && errors.subCounty }" @blur="validateField('subCounty', 1)" />
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.subCounty">{{ errors.subCounty }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Ward</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-pin-map-fill"></i></span>
                <input v-model="form.ward" type="text" class="form-control" readonly
                  :class="{ 'is-invalid': formTouched && errors.ward }" @blur="validateField('ward', 1)" />
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.ward">{{ errors.ward }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">GPS Coordinates</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-crosshair"></i></span>
                <input v-model="form.gps" type="text" class="form-control" readonly
                  :class="{ 'is-invalid': formTouched && errors.gps }" @blur="validateField('gps', 1)" />
                <button class="btn btn-outline-primary" type="button" @click="showLocationModal = true">
                  <i class="bi bi-map-fill"></i>
                </button>
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.gps">{{ errors.gps }}</div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Primary Economic Activities</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-briefcase-fill"></i></span>
                <input v-model="form.economicActivities" type="text" class="form-control"
                  placeholder="e.g. Farming, Retail" :class="{ 'is-invalid': formTouched && errors.economicActivities }"
                  @blur="validateField('economicActivities', 2)" />
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.economicActivities">{{
                errors.economicActivities }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Electricity Available?</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lightning-fill"></i></span>
                <select v-model="form.electricity" class="form-control"
                  :class="{ 'is-invalid': formTouched && errors.electricity }" @blur="validateField('electricity', 2)">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.electricity">{{ errors.electricity }}
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Internet Access</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-wifi"></i></span>
                <select v-model="form.internet" class="form-control"
                  :class="{ 'is-invalid': formTouched && errors.internet }" @blur="validateField('internet', 2)">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.internet">{{ errors.internet }}</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">Road Access</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-signpost-split-fill"></i></span>
                <select v-model="form.roadAccess" class="form-control"
                  :class="{ 'is-invalid': formTouched && errors.roadAccess }" @blur="validateField('roadAccess', 2)">
                  <option value="">Select</option>
                  <option value="All-Weather">All-Weather</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.roadAccess">{{ errors.roadAccess }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Upload Supporting Document?</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-file-earmark-arrow-up"></i></span>
                <select v-model="form.needsUpload" class="form-control"
                  :class="{ 'is-invalid': formTouched && errors.needsUpload }" @blur="validateField('needsUpload', 3)">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div class="invalid-feedback d-block" v-if="formTouched && errors.needsUpload">{{ errors.needsUpload }}
              </div>
            </div>

            <div class="col-md-6" v-if="form.needsUpload === 'Yes'">
              <label class="form-label">Upload File</label>
              <input type="file" class="form-control" @change="handleFileUpload"
                :class="{ 'is-invalid': formTouched && errors.file }" />
              <div class="invalid-feedback d-block" v-if="formTouched && errors.file">{{ errors.file }}</div>
              <small class="text-muted" v-if="form.documentFileName">Current file: {{ form.documentFileName }}</small>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-4" v-if="currentStep === 3">
          <button type="submit" class="btn btn-success">
            {{ isEditMode ? 'Update' : 'Submit' }}
          </button>
        </div>
      </form>

      <div class="d-flex justify-content-between mt-4">
        <button type="button" class="btn btn-primary" @click="goToStep(currentStep - 1)" :disabled="currentStep === 1">
          Previous
        </button>

        <button v-if="currentStep < 3" type="button" class="btn btn-primary" @click="goToStep(currentStep + 1)">
          Next
        </button>
      </div>

      <Stations class="col-12 mt-5" />

      <location-picker-modal :visible="showLocationModal" @close="showLocationModal = false"
        @location-selected="handleLocationSelected" />
    </div>
  </div>
</template>

<script>
// (Your existing script content remains exactly the same)
import LocationPickerModal from "@/components/forms/LocationPickerModal.vue";
import Stations from "../../components/tables/stations.vue";
import stationApi from '@/api/stationApi';
import alert from '@/utils/swal';

export default {
  components: {
    LocationPickerModal,
    Stations,
  },
  data() {
    return {
      currentStep: 1,
      showLocationModal: false,
      form: {
        id: null,
        stationName: '',
        levelType: '',
        parentId: null,
        county: '',
        subCounty: '',
        ward: '',
        gps: '',
        economicActivities: '',
        electricity: '',
        internet: '',
        roadAccess: '',
        needsUpload: 'No',
        file: null,
        documentFileName: null
      },
      parentStations: [],
      errors: {},
      formTouched: false,
    };
  },
  computed: {
    isEditMode() {
      return this.form.id !== null;
    },
    isParentLocked() {
      return this.form.levelType === 'HQ' && this.parentStations.length === 1;
    },
    isCurrentStepValid() {
      switch (this.currentStep) {
        case 1: return Object.keys(this.validateStep1(false)).length === 0;
        case 2: return Object.keys(this.validateStep2(false)).length === 0;
        case 3: return Object.keys(this.validateStep3(false)).length === 0;
        default: return false;
      }
    }
  },
  watch: {
    'form.levelType'(newVal, oldVal) {
      if (newVal === 'Main Office') {
        this.form.parentId = null;
        this.parentStations = [];
      } else if (newVal !== oldVal) {
        this.fetchParentStations(newVal).then(() => {
          if (
            newVal === 'HQ' &&
            this.parentStations.length === 1 &&
            !this.isEditMode
          ) {
            this.form.parentId = this.parentStations[0].id;
          }
        });
      }
      if (this.currentStep === 1 && this.formTouched) {
        this.validateStep1(true);
      }
    },
    '$route.params.stationId': {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchStationForEdit(newId);
        } else {
          this.resetForm();
          this.setUserLocation();
        }
      }
    },
    'form': {
      deep: true,
      handler() {
        if (this.formTouched) {
          if (this.currentStep === 1) {
            this.validateStep1(true);
          } else if (this.currentStep === 2) {
            this.validateStep2(true);
          } else if (this.currentStep === 3) {
            this.validateStep3(true);
          }
        }
      }
    }
  },
  mounted() {
    if (!this.$route.params.stationId) {
      this.setUserLocation();
    }
  },
  methods: {
    validateField(fieldName, step) {
      this.formTouched = true;
      if (step === 1) {
        this.validateStep1(true);
      } else if (step === 2) {
        this.validateStep2(true);
      } else if (step === 3) {
        this.validateStep3(true);
      }
    },

    async fetchStationForEdit(stationId) {
      try {
        const response = await stationApi.getById(stationId);
        const station = response.data;
        this.populateForm(station);
      } catch (error) {
        console.error('Failed to fetch station for editing:', error);
        alert.error('Could not load station data for editing. Please try again.');
        this.resetForm();
        this.setUserLocation();
      }
    },

    populateForm(station) {
      this.form.id = station.id;
      this.form.stationName = station.stationName;
      this.form.levelType = station.levelType;
      this.form.parentId = station.parentId;
      this.form.county = station.location?.county || '';
      this.form.subCounty = station.location?.subCounty || '';
      this.form.ward = station.location?.ward || '';
      this.form.gps = station.location?.gps || '';
      this.form.economicActivities = station.economicActivities;
      this.form.electricity = station.electricity;
      this.form.internet = station.internet;
      this.form.roadAccess = station.roadAccess;
      this.form.needsUpload = station.document ? 'Yes' : 'No';
      this.form.documentFileName = station.document?.fileName || null;

      if (this.form.levelType !== 'Main Office') {
        this.fetchParentStations(this.form.levelType);
      }
      this.errors = {};
      this.currentStep = 1;
      this.formTouched = false;
    },

    async fetchParentStations(levelType) {
      try {
        let parentLevel = '';
        if (levelType === 'HQ') parentLevel = 'Main Office';
        else if (levelType === 'Branch') parentLevel = 'HQ';
        else if (levelType === 'Sub-Branch') parentLevel = 'Branch';
        else {
          this.parentStations = [];
          return;
        }

        const response = await stationApi.getAll();
        this.parentStations = response.data.filter(
          station => station.levelType === parentLevel
        );

        if (this.isEditMode && this.form.id) {
          this.parentStations = this.parentStations.filter(
            station => station.id !== this.form.id
          );
        }

      } catch (error) {
        console.error('Failed to load parent stations:', error);
        alert.error('Could not load parent stations. Please try again.');
        this.parentStations = [];
      }
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
                headers: { "User-Agent": "vue-location-autofill/1.0" }
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
            console.warn("Geolocation not allowed. Defaulting to Nairobi.", err);
            this.form.gps = "-1.2921, 36.8219";
            this.form.county = "Nairobi";
            this.form.subCounty = "Nairobi";
            this.form.ward = "Central";
          }
        );
      }
    },

    goToStep(step) {
      this.formTouched = true;

      let currentStepValidationResult = {};
      if (this.currentStep === 1) {
        currentStepValidationResult = this.validateStep1(true);
      } else if (this.currentStep === 2) {
        currentStepValidationResult = this.validateStep2(true);
      } else if (this.currentStep === 3) {
        currentStepValidationResult = this.validateStep3(true);
      }

      if (step > this.currentStep && Object.keys(currentStepValidationResult).length > 0) {
        alert.warning('Please fill in all required fields for the current step.');
        return;
      }
      this.currentStep = step;
    },

    validateStep1(displayErrors = true) {
      const errors = {};
      if (!this.form.stationName) { errors.stationName = 'Station Name is required.'; }
      if (!this.form.levelType) { errors.levelType = 'Level is required.'; }
      else if (this.form.levelType !== 'Main Office' && !this.form.parentId) { errors.parentId = 'Office is required.'; }
      if (!this.form.county) { errors.county = 'County is required.'; }
      if (!this.form.subCounty) { errors.subCounty = 'Sub-County is required.'; }
      if (!this.form.ward) { errors.ward = 'Ward is required.'; }
      if (!this.form.gps) { errors.gps = 'GPS Coordinates are required.'; }

      if (displayErrors) {
        this.errors = { ...this.errors, ...errors };
        for (const key in this.errors) {
          if (!errors[key] && (key === 'stationName' || key === 'levelType' || key === 'parentId' || key === 'county' || key === 'subCounty' || key === 'ward' || key === 'gps')) {
            delete this.errors[key];
          }
        }
      }
      return errors;
    },

    validateStep2(displayErrors = true) {
      const errors = {};
      if (!this.form.economicActivities) { errors.economicActivities = 'Primary Economic Activities are required.'; }
      if (!this.form.electricity) { errors.electricity = 'Electricity availability is required.'; }
      if (!this.form.internet) { errors.internet = 'Internet access is required.'; }
      if (!this.form.roadAccess) { errors.roadAccess = 'Road access is required.'; }

      if (displayErrors) {
        this.errors = { ...this.errors, ...errors };
        for (const key in this.errors) {
          if (!errors[key] && (key === 'economicActivities' || key === 'electricity' || key === 'internet' || key === 'roadAccess')) {
            delete this.errors[key];
          }
        }
      }
      return errors;
    },

    validateStep3(displayErrors = true) {
      const errors = {};
      if (!this.form.needsUpload) { errors.needsUpload = 'Please specify if a document needs to be uploaded.'; }
      else if (this.form.needsUpload === 'Yes' && !this.form.file && !this.form.documentFileName) {
        errors.file = 'Please upload a file.';
      }

      if (displayErrors) {
        this.errors = { ...this.errors, ...errors };
        for (const key in this.errors) {
          if (!errors[key] && (key === 'needsUpload' || key === 'file')) {
            delete this.errors[key];
          }
        }
      }
      return errors;
    },

    autoPopulate() {
      this.form = {
        id: null,
        stationName: 'Kibera Access Point',
        levelType: 'Branch',
        parentId: null,
        county: 'Nairobi',
        subCounty: 'Langata',
        ward: 'Karen',
        gps: '-1.3100, 36.7600',
        economicActivities: 'Retail, Jua Kali',
        electricity: 'Yes',
        internet: 'Yes',
        roadAccess: 'All-Weather',
        needsUpload: 'No',
        file: null,
        documentFileName: null
      };
      this.formTouched = true;
      if (this.form.levelType === 'Branch') {
        this.fetchParentStations('Branch').then(() => {
          this.validateStep1(true);
        });
      } else {
        this.validateStep1(true);
      }
    },

    handleLocationSelected(data) {
      this.form.gps = data.gps;
      this.form.county = data.county;
      this.form.subCounty = data.subCounty;
      this.form.ward = data.ward;
      this.formTouched = true;
      if (this.currentStep === 1) {
        this.validateStep1(true);
      }
    },

    handleFileUpload(event) {
      this.form.file = event.target.files[0];
      if (this.form.file) {
        this.form.documentFileName = this.form.file.name;
      } else {
        this.form.documentFileName = null;
      }
      this.formTouched = true;
      if (this.currentStep === 3) {
        this.validateStep3(true);
      }
    },

    submitForm() {
      this.formTouched = true;

      let allValid = true;
      const errors1 = this.validateStep1(true);
      const errors2 = this.validateStep2(true);
      const errors3 = this.validateStep3(true);

      if (Object.keys(errors1).length > 0 || Object.keys(errors2).length > 0 || Object.keys(errors3).length > 0) {
        alert.warning('Please correct the validation errors before submitting.');
        if (Object.keys(errors1).length > 0) this.currentStep = 1;
        else if (Object.keys(errors2).length > 0) this.currentStep = 2;
        else if (Object.keys(errors3).length > 0) this.currentStep = 3;
        allValid = false;
      }

      if (!allValid) {
        return;
      }

      const stationPayload = {
        stationName: this.form.stationName,
        levelType: this.form.levelType,
        parentId: this.form.parentId,
        location: {
          county: this.form.county,
          subCounty: this.form.subCounty,
          ward: this.form.ward,
          gps: this.form.gps
        },
        economicActivities: this.form.economicActivities,
        electricity: this.form.electricity,
        internet: this.form.internet,
        roadAccess: this.form.roadAccess
      };

      const apiCall = this.isEditMode
        ? stationApi.update(this.form.id, stationPayload, this.form.file)
        : stationApi.create(stationPayload, this.form.file);

      apiCall
        .then(() => {
          alert.success(`Station successfully ${this.isEditMode ? 'updated' : 'registered'}!`);
          this.resetForm();
          this.currentStep = 1;
          this.$router.push({ name: 'forms_entry', query: { menu: 'New Station' } });
        })
        .catch(error => {
          console.error('Error saving station:', error);
          if (error.response?.data?.errors) {
            this.errors = error.response.data.errors;
            alert.warning('Validation errors occurred. Please check the form.');
            if (Object.keys(this.validateStep1(false)).length > 0) this.currentStep = 1;
            else if (Object.keys(this.validateStep2(false)).length > 0) this.currentStep = 2;
            else if (Object.keys(this.validateStep3(false)).length > 0) this.currentStep = 3;
          } else {
            alert.error(`Submission failed. Please try again. ${error.message}`);
          }
        });
    },

    resetForm() {
      this.form = {
        id: null,
        stationName: '',
        levelType: '',
        parentId: null,
        county: '',
        subCounty: '',
        ward: '',
        gps: '',
        economicActivities: '',
        electricity: '',
        internet: '',
        roadAccess: '',
        needsUpload: 'No',
        file: null,
        documentFileName: null
      };
      this.errors = {};
      this.parentStations = [];
      this.formTouched = false;
    }
  }
};
</script>

<style scoped>
/* Keep existing styles */
.progress-container {
  position: relative;
  width: 100%;
  height: 20px;
  margin-bottom: 30px;
}

.progress-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #e0e0e0;
  transform: translateY(-50%);
  border-radius: 2px;
}

.progress {
  height: 100%;
  background-color: #007bff;
  border-radius: 2px;
  transition: width 0.4s ease-in-out;
}

.step-labels {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.step-labels div {
  background-color: #fff;
  padding: 0 5px;
  font-size: 0.9rem;
  color: #6c757d;
  position: relative;
  z-index: 1;
  text-align: center;
}

.step-labels div.active {
  color: #007bff;
  font-weight: bold;
}

.step-labels div::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #e0e0e0;
  z-index: -1;
}

.step-labels div.active::before {
  background-color: #007bff;
}

.invalid-feedback.d-block {
  display: block !important;
}
</style>