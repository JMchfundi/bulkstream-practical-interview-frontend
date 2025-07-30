<template>
  <div class="card">
    <div class="card-body">
      <div class="text-center mb-4">
        <button class="btn btn-warning" @click="autoPopulate">
          <i class="bi bi-person-check-fill me-2"></i>Auto-Populate for Demo
        </button>
      </div>

      <div class="progress-container mb-4">
        <div class="progress-line">
          <div class="progress" :style="{ width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }"></div>
        </div>
        <div class="step-labels d-flex justify-content-between">
          <div class="d-none d-md-block" :class="{ active: currentStep >= 1 }">Step 1: Officer Details</div>
          <div class="d-none d-md-block" :class="{ active: currentStep >= 2 }">Step 2: Emergency Contact</div>
          <div class="d-none d-md-block" :class="{ active: currentStep === 3 }">Step 3: Documents & Bank Details</div>

          <div class="d-block d-md-none w-100 text-center font-weight-bold">
            <template v-if="currentStep === 1">Step 1: Officer Details</template>
            <template v-else-if="currentStep === 2">Step 2: Emergency Contact</template>
            <template v-else-if="currentStep === 3">Step 3: Documents & Bank Details</template>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm" novalidate>
        <div v-if="currentStep === 1">
          <div class="row g-3">
            <div class="col-12 border p-4 rounded shadow-sm mb-4">
              <h4 class="mb-3 text-primary fw-bold">
                <i class="bi bi-person-badge-fill me-2"></i>Officer Details
              </h4>
              <hr class="my-3 text-secondary" />
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Full Name</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-person-fill"></i>
                    </span>
                    <input v-model="form.fullName" type="text" class="form-control"
                      :class="{ 'is-invalid': errors.fullName }" placeholder="Enter full name" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.fullName">{{ errors.fullName }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-envelope-fill"></i>
                    </span>
                    <input v-model="form.email" type="email" class="form-control"
                      :class="{ 'is-invalid': errors.email }" placeholder="Enter email" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.email">{{ errors.email }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Phone Number</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-telephone-fill"></i>
                    </span>
                    <input v-model="form.phoneNumber" type="text" class="form-control"
                      :class="{ 'is-invalid': errors.phoneNumber }" placeholder="Enter phone" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">ID/Passport Number</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-card-text"></i>
                    </span>
                    <input v-model="form.idNumber" type="text" class="form-control"
                      :class="{ 'is-invalid': errors.idNumber }" placeholder="Enter ID/Passport" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.idNumber">{{ errors.idNumber }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Date of Birth</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-calendar-event"></i>
                    </span>
                    <input v-model="form.dob" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.dob">{{ errors.dob }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Gender</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-gender-ambiguous"></i>
                    </span>
                    <select v-model="form.gender" class="form-control" :class="{ 'is-invalid': errors.gender }">
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.gender">{{ errors.gender }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Branch/Location (Station)</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-geo-alt"></i>
                    </span>
                    <select v-model.number="form.stationId" class="form-control"
                      :class="{ 'is-invalid': errors.stationId }">
                      <option value="">Select Station</option>
                      <option v-for="station in stations" :key="station.id" :value="station.id">
                        {{ station.stationName }} ({{ station.levelType }})
                      </option>
                    </select>
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.stationId">{{ errors.stationId }}</div>
                </div>
              </div>
            </div>

            <div class="col-12 border p-4 rounded shadow-sm mb-4">
              <h4 class="mb-3 text-info fw-bold">
                <i class="bi bi-house-door-fill me-2"></i>Residential Location
              </h4>
              <hr class="my-3 text-secondary" />

              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">County</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-map"></i></span>
                    <input v-model="form.residentialCounty" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.residentialCounty }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.residentialCounty">{{ errors.residentialCounty }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Sub-County</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-diagram-3"></i></span>
                    <input v-model="form.residentialSubCounty" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.residentialSubCounty }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.residentialSubCounty">{{
                    errors.residentialSubCounty }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Ward</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-pin-map-fill"></i></span>
                    <input v-model="form.residentialWard" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.residentialWard }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.residentialWard">{{ errors.residentialWard }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">GPS Coordinates</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-crosshair"></i></span>
                    <input v-model="form.residentialGps" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.residentialGps }" />
                    <button class="btn btn-outline-primary" type="button" @click="showResidentialLocationModal = true">
                      <i class="bi bi-map-fill"></i> Select on Map
                    </button>
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.residentialGps">{{ errors.residentialGps }}</div>
                </div>
              </div>
            </div>

            <div class="col-12 border p-4 rounded shadow-sm mb-4">
              <h4 class="mb-3 text-success fw-bold">
                <i class="bi bi-geo-alt-fill me-2"></i>Home Location
              </h4>
              <hr class="my-3 text-secondary" />

              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">County</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-map"></i></span>
                    <input v-model="form.homeCounty" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.homeCounty }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.homeCounty">{{ errors.homeCounty }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Sub-County</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-diagram-3"></i></span>
                    <input v-model="form.homeSubCounty" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.homeSubCounty }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.homeSubCounty">{{ errors.homeSubCounty }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Ward</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-pin-map-fill"></i></span>
                    <input v-model="form.homeWard" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.homeWard }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.homeWard">{{ errors.homeWard }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">GPS Coordinates</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-crosshair"></i></span>
                    <input v-model="form.homeGps" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.homeGps }" />
                    <button class="btn btn-outline-primary" type="button" @click="showHomeLocationModal = true">
                      <i class="bi bi-map-fill"></i> Select on Map
                    </button>
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.homeGps">{{ errors.homeGps }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2">
          <div class="row g-3">
            <div class="col-12 border p-4 rounded shadow-sm mb-4">
              <h4 class="mb-3 text-warning fw-bold">
                <i class="bi bi-person-lines-fill me-2"></i>Emergency Contact Details
              </h4>
              <hr class="my-3 text-secondary" />
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Emergency Contact Name</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-person-fill"></i>
                    </span>
                    <input v-model="form.nokName" type="text" class="form-control"
                      :class="{ 'is-invalid': errors.nokName }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.nokName">{{ errors.nokName }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Next of Kin Phone</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-telephone-fill"></i>
                    </span>
                    <input v-model="form.nokPhone" type="text" class="form-control"
                      :class="{ 'is-invalid': errors.nokPhone }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.nokPhone">{{ errors.nokPhone }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Relationship to Officer</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-heart"></i>
                    </span>
                    <input v-model="form.nokRelationship" type="text" class="form-control"
                      :class="{ 'is-invalid': errors.nokRelationship }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.nokRelationship">{{ errors.nokRelationship }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <div class="col-12 border p-4 rounded shadow-sm mb-4">
            <h4 class="mb-3 text-primary fw-bold">
              <i class="bi bi-file-earmark-spreadsheet me-2"></i>Documents & Bank Details
            </h4>
            <hr class="my-3 text-secondary" />

            <div class="form-group mb-4">
              <label class="form-label d-block mb-2">Do you want to upload documents?</label>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="uploadYes" :value="true"
                  v-model="shouldUploadDocuments">
                <label class="form-check-label" for="uploadYes">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="uploadNo" :value="false"
                  v-model="shouldUploadDocuments">
                <label class="form-check-label" for="uploadNo">No</label>
              </div>
              </div>

            <div v-if="shouldUploadDocuments" class="row g-3">
              <div class="col-md-6 mb-3">
                <label class="form-label">Passport Photo <small class="text-muted">(Max 50KB, .jpg, .jpeg, .png)</small></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-image"></i>
                  </span>
                  <input type="file" @change="handleFileChange('passportPhoto', $event)" class="form-control"
                    :class="{ 'is-invalid': errors.passportPhoto }" accept="image/jpeg, image/png, image/jpg" />
                </div>
                <div class="invalid-feedback d-block" v-if="errors.passportPhoto">{{ errors.passportPhoto }}</div>
                <div v-if="currentPassportPhotoPreview" class="mt-2">
                  <h6>Current Passport Photo:</h6>
                  <img :src="currentPassportPhotoPreview" alt="Passport Photo" class="img-thumbnail" style="max-width: 150px;">
                  <button type="button" class="btn btn-sm btn-outline-danger ms-2" @click="removeCurrentFile('passportPhoto')">Remove</button>
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">ID Document <small class="text-muted">(Max 100KB, .pdf)</small></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-file-earmark-pdf"></i>
                  </span>
                  <input type="file" @change="handleFileChange('idDocument', $event)" class="form-control"
                    :class="{ 'is-invalid': errors.idDocument }" accept="application/pdf" />
                </div>
                <div class="invalid-feedback d-block" v-if="errors.idDocument">{{ errors.idDocument }}</div>
                <div v-if="currentIdDocumentPreview" class="mt-2">
                  <h6>Current ID Document:</h6>
                  <a :href="currentIdDocumentPreview" target="_blank">View Document</a>
                  <button type="button" class="btn btn-sm btn-outline-danger ms-2" @click="removeCurrentFile('idDocument')">Remove</button>
                </div>
              </div>
            </div>

            <div class="row g-3 mt-3">
              <div class="col-md-6">
                <label class="form-label">Bank Account Details</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-bank"></i>
                  </span>
                  <input v-model="form.bankDetails" type="text" class="form-control"
                    :class="{ 'is-invalid': errors.bankDetails }" placeholder="Bank details" />
                </div>
                <div class="invalid-feedback d-block" v-if="errors.bankDetails">{{ errors.bankDetails }}</div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div class="d-flex justify-content-between mt-4">
        <button type="button" class="btn btn-primary" @click="goToStep(currentStep - 1)" :disabled="currentStep === 1">
          Previous
        </button>

        <div v-if="currentStep < totalSteps">
          <button type="button" class="btn btn-primary" @click="goToStep(currentStep + 1)"
            :disabled="!isCurrentStepValid">
            Next
          </button>
        </div>

        <div v-if="currentStep === totalSteps">
          <button type="button" class="btn btn-success" @click="submitForm" :disabled="!isCurrentStepValid">
            {{ isEditMode ? 'Update Officer' : 'Register Officer' }}
          </button>
        </div>
      </div>

      <Officers class="col-12"></Officers>

      <location-picker-modal :visible="showResidentialLocationModal" @close="showResidentialLocationModal = false"
        @location-selected="handleResidentialLocationSelected" />

      <location-picker-modal :visible="showHomeLocationModal" @close="showHomeLocationModal = false"
        @location-selected="handleHomeLocationSelected" />
    </div>
  </div>
</template>

<script>
import officerApi from "@/api/officerApi";
import stationApi from '@/api/stationApi';
import swal from '@/utils/swal';
import Officers from "../../components/tables/officers.vue";
import LocationPickerModal from '@/components/forms/LocationPickerModal.vue';

export default {
  props: ['officerId'],

  components: {
    Officers,
    LocationPickerModal
  },
  data() {
    return {
      currentStep: 1,
      totalSteps: 3, // Reduced total steps
      showResidentialLocationModal: false,
      showHomeLocationModal: false,
      shouldUploadDocuments: false, // User's choice to upload documents
      form: {
        id: null,
        fullName: "",
        email: "",
        phoneNumber: "",
        idNumber: "",
        dob: "",
        gender: "",
        stationId: null,

        residentialCounty: '',
        residentialSubCounty: '',
        residentialWard: '',
        residentialGps: '',

        homeCounty: '',
        homeSubCounty: '',
        homeWard: '',
        homeGps: '',

        nokName: "",
        nokPhone: "",
        nokRelationship: "",

        bankDetails: "",

        // These will store actual File objects for new uploads
        newIdDocumentFile: null,
        newPassportPhotoFile: null,

        // These will store existing document metadata for update scenarios
        documents: [], // Array of { id, fileName, fileUrl, contentType }
      },
      stations: [],
      errors: {},
      isEditMode: false,
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080',
    };
  },
  computed: {
    isCurrentStepValid() {
      // Validate the current step without necessarily displaying errors immediately
      switch (this.currentStep) {
        case 1: return Object.keys(this.validateStep1(false)).length === 0;
        case 2: return Object.keys(this.validateStep2(false)).length === 0;
        case 3: return Object.keys(this.validateStep3Combined(false)).length === 0; // Combined validation for step 3
        default: return false;
      }
    },
    currentPassportPhotoPreview() {
      if (this.form.newPassportPhotoFile) {
        return URL.createObjectURL(this.form.newPassportPhotoFile);
      }
      const existingPhoto = this.form.documents.find(doc =>
        doc.contentType && doc.contentType.toUpperCase().includes('IMAGE') && doc.fileName.toLowerCase().includes('passport')
      );
      return existingPhoto ? `${this.apiBaseUrl}${existingPhoto.fileUrl}` : null;
    },
    currentIdDocumentPreview() {
      if (this.form.newIdDocumentFile) {
        return URL.createObjectURL(this.form.newIdDocumentFile);
      }
      const existingIdDoc = this.form.documents.find(doc =>
        doc.contentType && doc.contentType.toUpperCase().includes('PDF') && doc.fileName.toLowerCase().includes('id')
      );
      return existingIdDoc ? `${this.apiBaseUrl}${existingIdDoc.fileUrl}` : null;
    },
  },
  watch: {
    officerId: {
      immediate: true,
      handler(newOfficerId) {
        if (newOfficerId) {
          this.form.id = newOfficerId;
          this.isEditMode = true;
          this.fetchOfficerForEdit(newOfficerId);
        } else {
          this.resetForm();
          this.isEditMode = false;
          this.setUserResidentialLocation();
          this.setUserHomeLocation();
        }
      }
    },
    '$route.params.officerId': {
      immediate: true,
      handler(newOfficerId) {
        if (newOfficerId && newOfficerId !== this.form.id) {
          this.form.id = newOfficerId;
          this.isEditMode = true;
          this.fetchOfficerForEdit(newOfficerId);
        } else if (!newOfficerId && this.isEditMode) {
          this.resetForm();
        }
      }
    },
    shouldUploadDocuments(newValue) {
      if (!newValue) {
        // Clear file inputs and associated errors if user chooses not to upload
        this.form.newIdDocumentFile = null;
        this.form.newPassportPhotoFile = null;
        this.$delete(this.errors, 'idDocument');
        this.$delete(this.errors, 'passportPhoto');
      }
      // Re-validate step 3 immediately when the option changes
      this.validateStep3Combined(true);
    }
  },
  mounted() {
    this.fetchStations();
  },
  methods: {
    async fetchStations() {
      try {
        const response = await stationApi.getAll();
        this.stations = response.data;
      } catch (error) {
        console.error('Failed to fetch stations:', error);
        swal.error('Failed to load stations. Please refresh the page.');
      }
    },

    async fetchOfficerForEdit(officerId) {
      try {
        const response = await officerApi.getById(officerId);
        const officer = response.data;
        this.populateFormForEdit(officer);
      } catch (error) {
        console.error('Failed to fetch officer for editing:', error);
        swal.error('Could not load officer data for editing. Please check the Officer ID or try again.');
        this.resetForm();
        this.$router.push({ name: 'Entry', params: { officerId: undefined, stationId: undefined } });
      }
    },

    populateFormForEdit(officer) {
      this.form.id = officer.id;
      this.form.fullName = officer.fullName || '';
      this.form.email = officer.email || '';
      this.form.phoneNumber = officer.phoneNumber || '';
      this.form.idNumber = officer.idNumber || '';
      this.form.dob = officer.dob ? new Date(officer.dob).toISOString().split('T')[0] : '';
      this.form.gender = officer.gender || '';
      this.form.stationId = officer.stationId || null;
      this.form.bankDetails = officer.bankDetails || '';

      const residentialLoc = officer.locations?.find(loc => loc.type === 'residential') || officer.locations?.[0];
      if (residentialLoc) {
        this.form.residentialCounty = residentialLoc.county || '';
        this.form.residentialSubCounty = residentialLoc.subCounty || '';
        this.form.residentialWard = residentialLoc.ward || '';
        this.form.residentialGps = residentialLoc.gps || '';
      } else {
        this.form.residentialCounty = ''; this.form.residentialSubCounty = '';
        this.form.residentialWard = ''; this.form.residentialGps = '';
      }

      const homeLoc = officer.locations?.find(loc => loc.type === 'home') || officer.locations?.[1];
      if (homeLoc) {
        this.form.homeCounty = homeLoc.county || '';
        this.form.homeSubCounty = homeLoc.subCounty || '';
        this.form.homeWard = homeLoc.ward || '';
        this.form.homeGps = homeLoc.gps || '';
      } else {
        this.form.homeCounty = ''; this.form.homeSubCounty = '';
        this.form.homeWard = ''; this.form.homeGps = '';
      }

      const nok = officer.nextOfKins?.[0];
      if (nok) {
        this.form.nokName = nok.name || '';
        this.form.nokPhone = nok.phone || '';
        this.form.nokRelationship = nok.relationship || '';
      } else {
        this.form.nokName = ''; this.form.nokPhone = ''; this.form.nokRelationship = '';
      }

      this.form.documents = officer.documents || [];
      this.form.newIdDocumentFile = null;
      this.form.newPassportPhotoFile = null;

      // Set shouldUploadDocuments based on whether documents exist
      this.shouldUploadDocuments = this.form.documents.length > 0;

      this.errors = {};
      this.currentStep = 1;
    },

    resetForm() {
      this.form = {
        id: null,
        fullName: "", email: "", phoneNumber: "", idNumber: "", dob: "", gender: "", stationId: null,
        residentialCounty: '', residentialSubCounty: '', residentialWard: '', residentialGps: '',
        homeCounty: '', homeSubCounty: '', homeWard: '', homeGps: '',
        nokName: "", nokPhone: "", nokRelationship: "",
        bankDetails: "",
        newIdDocumentFile: null,
        newPassportPhotoFile: null,
        documents: [],
      };
      this.errors = {};
      this.currentStep = 1;
      this.isEditMode = false;
      this.shouldUploadDocuments = false; // Reset document upload choice
    },

    async setUserResidentialLocation() {
      if (navigator.geolocation && !this.isEditMode) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const gps = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            this.form.residentialGps = gps;

            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`, {
                headers: { "User-Agent": "vue-officer-form/1.0" }
              });
              const data = await res.json();
              const address = data.address || {};
              this.form.residentialCounty = address.state || address.county || '';
              this.form.residentialSubCounty = address.county || address.city || '';
              this.form.residentialWard = address.city || address.suburb || address.hamlet || '';
            } catch (err) {
              console.warn("Residential reverse geocoding failed:", err);
              this.form.residentialCounty = "Mombasa";
              this.form.residentialSubCounty = "Mombasa";
              this.form.residentialWard = "Mvita";
            }
          },
          (err) => {
            console.warn("Residential Geolocation not allowed. Defaulting to Mombasa.", err);
            this.form.residentialGps = "-4.0437, 39.6682";
            this.form.residentialCounty = "Mombasa";
            this.form.residentialSubCounty = "Mombasa";
            this.form.residentialWard = "Mvita";
          }
        );
      }
    },

    async setUserHomeLocation() {
      if (!this.isEditMode) {
        this.form.homeGps = "-4.0500, 39.6800";
        this.form.homeCounty = "Mombasa";
        this.form.homeSubCounty = "Likoni";
        this.form.homeWard = "Likoni";
      }
    },

    autoPopulate() {
      this.form.fullName = "Test Officer Name";
      this.form.email = "test.officer@example.com";
      this.form.phoneNumber = "0712123456";
      this.form.idNumber = "ID12345678";
      this.form.dob = "1985-07-20";
      this.form.gender = "Male";
      this.form.stationId = this.stations.length > 0 ? this.stations[0].id : null;

      this.form.residentialCounty = "Mombasa";
      this.form.residentialSubCounty = "Changamwe";
      this.form.residentialWard = "Port Reitz";
      this.form.residentialGps = "-4.0437, 39.6682";

      this.form.homeCounty = "Kilifi";
      this.form.homeSubCounty = "Ganze";
      this.form.homeWard = "Ganze";
      this.form.homeGps = "-3.4567, 39.9876";

      this.form.nokName = "Test NOK Name";
      this.form.nokPhone = "0788765432";
      this.form.nokRelationship = "Spouse";
      this.form.bankDetails = "KCB Bank, Account: 1234567890";
      this.errors = {};
    },

    goToStep(step) {
      if (step > this.currentStep) {
        let currentStepValidationErrors = {};
        if (this.currentStep === 1) {
          currentStepValidationErrors = this.validateStep1(true);
        } else if (this.currentStep === 2) {
          currentStepValidationErrors = this.validateStep2(true);
        }
        // Step 3 (Documents & Bank Details) validation is handled here for proceeding
        // The combined validation now covers everything in step 3
        else if (this.currentStep === 3) {
            currentStepValidationErrors = this.validateStep3Combined(true);
        }

        if (Object.keys(currentStepValidationErrors).length > 0) {
          swal.warning('Please correct the highlighted errors before proceeding.');
          return;
        }
      }
      this.currentStep = step;
    },

    handleFileChange(field, event) {
      const file = event.target.files[0];
      const MAX_PHOTO_SIZE = 50 * 1024; // 50 KB in bytes
      const MAX_ID_DOC_SIZE = 100 * 1024; // 100 KB in bytes

      this.$delete(this.errors, field); // Clear previous error for this field

      if (!file) {
        // If file is cleared, re-validate the step to ensure required fields are handled
        this.form[field === 'passportPhoto' ? 'newPassportPhotoFile' : 'newIdDocumentFile'] = null;
        this.validateStep3Combined(true);
        return;
      }

      if (field === 'passportPhoto') {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          this.$set(this.errors, field, 'Passport photo must be a JPG, JPEG, or PNG image.');
          this.form.newPassportPhotoFile = null;
          return;
        }
        if (file.size > MAX_PHOTO_SIZE) {
          this.$set(this.errors, field, `Passport photo size exceeds 50KB. Current size: ${(file.size / 1024).toFixed(2)} KB`);
          this.form.newPassportPhotoFile = null;
          return;
        }
        this.form.newPassportPhotoFile = file;
      } else if (field === 'idDocument') {
        if (file.type !== 'application/pdf') {
          this.$set(this.errors, field, 'ID document must be a PDF.');
          this.form.newIdDocumentFile = null;
          return;
        }
        if (file.size > MAX_ID_DOC_SIZE) {
          this.$set(this.errors, field, `ID document size exceeds 100KB. Current size: ${(file.size / 1024).toFixed(2)} KB`);
          this.form.newIdDocumentFile = null;
          return;
        }
        this.form.newIdDocumentFile = file;
      }
      // Re-validate step 3 immediately if a file input changes
      this.validateStep3Combined(true);
    },

    removeCurrentFile(type) {
      if (type === 'passportPhoto') {
        this.form.newPassportPhotoFile = null;
        this.form.documents = this.form.documents.filter(doc =>
          !(doc.contentType && doc.contentType.toUpperCase().includes('IMAGE') && doc.fileName.toLowerCase().includes('passport'))
        );
      } else if (type === 'idDocument') {
        this.form.newIdDocumentFile = null;
        this.form.documents = this.form.documents.filter(doc =>
          !(doc.contentType && doc.contentType.toUpperCase().includes('PDF') && doc.fileName.toLowerCase().includes('id'))
        );
      }
      this.validateStep3Combined(true); // Re-validate after removal
    },

    handleResidentialLocationSelected(data) {
      this.form.residentialGps = data.gps;
      this.form.residentialCounty = data.county;
      this.form.residentialSubCounty = data.subCounty;
      this.form.residentialWard = data.ward;
      this.showResidentialLocationModal = false;
      this.validateStep1(true);
    },

    handleHomeLocationSelected(data) {
      this.form.homeGps = data.gps;
      this.form.homeCounty = data.county;
      this.form.homeSubCounty = data.subCounty;
      this.form.homeWard = data.ward;
      this.showHomeLocationModal = false;
      this.validateStep1(true);
    },

    validateStep1(displayErrors = true) {
      const errors = {};
      if (!this.form.fullName) errors.fullName = 'Full Name is required.';
      if (!this.form.email) errors.email = 'Email is required.';
      else if (!/\S+@\S+\.\S+/.test(this.form.email)) errors.email = 'Email is invalid.';
      if (!this.form.phoneNumber) errors.phoneNumber = 'Phone Number is required.';
      if (!this.form.idNumber) errors.idNumber = 'ID/Passport Number is required.';
      if (!this.form.dob) errors.dob = 'Date of Birth is required.';
      if (!this.form.gender) errors.gender = 'Gender is required.';
      if (!this.form.stationId) errors.stationId = 'Station is required.';

      if (!this.form.residentialCounty) errors.residentialCounty = 'Residential County is required.';
      if (!this.form.residentialSubCounty) errors.residentialSubCounty = 'Residential Sub-County is required.';
      if (!this.form.residentialWard) errors.residentialWard = 'Residential Ward is required.';
      if (!this.form.residentialGps) errors.residentialGps = 'Residential GPS Coordinates are required. Select on map.';
      if (!this.form.homeCounty) errors.homeCounty = 'Home County is required.';
      if (!this.form.homeSubCounty) errors.homeSubCounty = 'Home Sub-County is required.';
      if (!this.form.homeWard) errors.homeWard = 'Home Ward is required.';
      if (!this.form.homeGps) errors.homeGps = 'Home GPS Coordinates are required. Select on map.';

      if (displayErrors) {
        const step1Keys = ['fullName', 'email', 'phoneNumber', 'idNumber', 'dob', 'gender', 'stationId',
          'residentialCounty', 'residentialSubCounty', 'residentialWard', 'residentialGps',
          'homeCounty', 'homeSubCounty', 'homeWard', 'homeGps'];
        step1Keys.forEach(key => {
          if (errors[key]) {
            this.$set(this.errors, key, errors[key]);
          } else {
            this.$delete(this.errors, key);
          }
        });
      }
      return errors;
    },

    validateStep2(displayErrors = true) {
      const errors = {};
      if (!this.form.nokName) errors.nokName = 'Emergency Contact Name is required.';
      if (!this.form.nokPhone) errors.nokPhone = 'Next of Kin Phone is required.';
      if (!this.form.nokRelationship) errors.nokRelationship = 'Relationship to Officer is required.';

      if (displayErrors) {
        const step2Keys = ['nokName', 'nokPhone', 'nokRelationship'];
        step2Keys.forEach(key => {
          if (errors[key]) {
            this.$set(this.errors, key, errors[key]);
          } else {
            this.$delete(this.errors, key);
          }
        });
      }
      return errors;
    },

    validateStep3Combined(displayErrors = true) {
      const errors = {};

      // Validate bank details (always required in this step)
      if (!this.form.bankDetails) errors.bankDetails = 'Bank Account Details are required.';

      // Validate document upload choice implicitly by checking `shouldUploadDocuments`
      // If user is in edit mode and has existing docs, or has selected new docs, then 'Yes' is implied.
      // If no documents exist and user chose 'No', then that's valid.
      // The only invalid state is if they explicitly said 'Yes' but didn't provide files,
      // or if they are in create mode and should provide documents but haven't.

      // If user wants to upload documents
      if (this.shouldUploadDocuments) {
        // Check if `newPassportPhotoFile` is null AND there's no existing passport photo
        const hasExistingPassportPhoto = this.form.documents.some(doc =>
          doc.contentType && doc.contentType.toUpperCase().includes('IMAGE') && doc.fileName.toLowerCase().includes('passport')
        );
        if (!this.form.newPassportPhotoFile && !hasExistingPassportPhoto) {
          errors.passportPhoto = 'Passport Photo is required if you chose to upload documents.';
        }

        // Check if `newIdDocumentFile` is null AND there's no existing ID document
        const hasExistingIdDocument = this.form.documents.some(doc =>
          doc.contentType && doc.contentType.toUpperCase().includes('PDF') && doc.fileName.toLowerCase().includes('id')
        );
        if (!this.form.newIdDocumentFile && !hasExistingIdDocument) {
          errors.idDocument = 'ID Document is required if you chose to upload documents.';
        }
      }

      if (displayErrors) {
        const step3Keys = ['bankDetails', 'passportPhoto', 'idDocument'];
        step3Keys.forEach(key => {
          if (errors[key]) {
            this.$set(this.errors, key, errors[key]);
          } else {
            this.$delete(this.errors, key);
          }
        });
      }
      return errors;
    },

    async submitForm() {
      // Final validation of ALL steps before submission
      const allErrors = {
        ...this.validateStep1(false),
        ...this.validateStep2(false),
        ...this.validateStep3Combined(false), // Use the combined validation
      };

      if (Object.keys(allErrors).length > 0) {
        this.errors = allErrors; // Display all errors
        swal.error('Please correct all highlighted errors before submitting.');
        // Navigate to the first step with an error
        if (Object.keys(this.validateStep1(false)).length > 0) this.currentStep = 1;
        else if (Object.keys(this.validateStep2(false)).length > 0) this.currentStep = 2;
        else if (Object.keys(this.validateStep3Combined(false)).length > 0) this.currentStep = 3;
        return;
      }

      swal.info('Submitting officer data...', { showConfirmButton: false, allowOutsideClick: false });

      try {
        const officerData = {
          id: this.form.id,
          fullName: this.form.fullName,
          email: this.form.email,
          phoneNumber: this.form.phoneNumber,
          idNumber: this.form.idNumber,
          dob: this.form.dob,
          gender: this.form.gender,
          stationId: this.form.stationId,
          bankDetails: this.form.bankDetails,
          locations: [
            { type: 'residential', county: this.form.residentialCounty, subCounty: this.form.residentialSubCounty, ward: this.form.residentialWard, gps: this.form.residentialGps },
            { type: 'home', county: this.form.homeCounty, subCounty: this.form.homeSubCounty, ward: this.form.homeWard, gps: this.form.homeGps }
          ],
          nextOfKins: [
            { name: this.form.nokName, phone: this.form.nokPhone, relationship: this.form.nokRelationship }
          ],
        };

        // Handle documents array based on `shouldUploadDocuments`
        if (this.shouldUploadDocuments) {
            officerData.documents = this.form.documents; // Send metadata of existing documents
        } else {
            // If user chose NOT to upload or in create mode and chose not to, send empty array to clear/not create
            officerData.documents = [];
        }

        const filesToUpload = [];
        if (this.shouldUploadDocuments) {
            if (this.form.newPassportPhotoFile) {
                filesToUpload.push(this.form.newPassportPhotoFile);
            }
            if (this.form.newIdDocumentFile) {
                filesToUpload.push(this.form.newIdDocumentFile);
            }
        }


        let response;
        if (this.isEditMode) {
          response = await officerApi.update(this.form.id, officerData, filesToUpload);
          swal.success('Officer updated successfully!', 1500);
        } else {
          response = await officerApi.create(officerData, filesToUpload);
          swal.success('Officer registered successfully!', 1500);
        }

        console.log("API Response:", response.data);
        this.resetForm();
        this.$root.$emit('bv::refresh::table', 'officer-table');
      } catch (error) {
        console.error("Submission error:", error);
        let errorMessage = "An unexpected error occurred.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        swal.error(`Submission failed: ${errorMessage}`);
      } finally {
        swal.close();
      }
    }
  }
};
</script>

<style scoped>
.progress-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.progress-line {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #007bff;
  transition: width 0.4s ease-in-out;
  border-radius: 5px;
}

.step-labels {
  position: absolute;
  width: 100%;
  top: 10px;
  /* Adjust based on progress line height */
  padding: 0 10px;
  box-sizing: border-box;
}

.step-labels>div {
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: bold;
  text-align: center;
  position: relative;
  flex-grow: 1;
  /* Distribute space evenly */
}

.step-labels>div.active {
  color: #007bff;
}

/* Circles for steps (optional, but good for visual) */
.step-labels>div::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: #e9ecef;
  border: 2px solid #adb5bd;
  border-radius: 50%;
  z-index: 1;
  transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out;
}

.step-labels>div.active::before {
  background-color: #007bff;
  border-color: #007bff;
}

.invalid-feedback.d-block {
  margin-top: 0.25rem;
}
</style>