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
          <div class="progress" :style="{ width: `${(currentStep - 1) / 2 * 100}%` }"></div>
        </div>
        <div class="step-labels d-flex justify-content-between">
          <div class="d-none d-md-block" :class="{ active: currentStep >= 1 }">Step 1: Client Details</div>
          <div class="d-none d-md-block" :class="{ active: currentStep >= 2 }">Step 2: Emergency Contact</div>
          <div class="d-none d-md-block" :class="{ active: currentStep === 3 }">Step 3: Documents</div>

          <div class="d-block d-md-none w-100 text-center font-weight-bold">
            <template v-if="currentStep === 1">Step 1: Client Details</template>
            <template v-else-if="currentStep === 2">Step 2: Emergency Contact</template>
            <template v-else-if="currentStep === 3">Step 3: Documents</template>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm" novalidate>
        <div v-if="currentStep === 1">
          <div class="row g-3">
            <div class="col-12 border p-4 rounded shadow-sm mb-4">
              <h4 class="mb-3 text-primary fw-bold">
                <i class="bi bi-person-badge-fill me-2"></i>Client Details
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
                  <label class="form-label">Group</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-people-fill"></i>
                    </span>
                    <select v-model.number="form.groupId" class="form-control"
                      :class="{ 'is-invalid': errors.groupId }">
                      <option value="">Select Group</option>
                      <option v-for="group in groups" :key="group.id" :value="group.id">
                        {{ group.groupName }}
                      </option>
                    </select>
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.groupId">{{ errors.groupId }}</div>
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
                    <input v-model="form.locations[0].county" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.residentialCounty }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.residentialCounty">{{ errors.residentialCounty }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Sub-County</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-diagram-3"></i></span>
                    <input v-model="form.locations[0].subCounty" type="text" class="form-control" readonly
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
                    <input v-model="form.locations[0].ward" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.residentialWard }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.residentialWard">{{ errors.residentialWard }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">GPS Coordinates</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-crosshair"></i></span>
                    <input v-model="form.locations[0].gps" type="text" class="form-control" readonly
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
                    <input v-model="form.locations[1].county" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.homeCounty }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.homeCounty">{{ errors.homeCounty }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Sub-County</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-diagram-3"></i></span>
                    <input v-model="form.locations[1].subCounty" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.homeSubCounty }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.homeSubCounty">{{ errors.homeSubCounty }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Ward</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-pin-map-fill"></i></span>
                    <input v-model="form.locations[1].ward" type="text" class="form-control" readonly
                      :class="{ 'is-invalid': errors.homeWard }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.homeWard">{{ errors.homeWard }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">GPS Coordinates</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-crosshair"></i></span>
                    <input v-model="form.locations[1].gps" type="text" class="form-control" readonly
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
                    <input v-model="form.nextOfKins[0].name" type="text" class="form-control"
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
                    <input v-model="form.nextOfKins[0].phone" type="text" class="form-control"
                      :class="{ 'is-invalid': errors.nokPhone }" />
                  </div>
                  <div class="invalid-feedback d-block" v-if="errors.nokPhone">{{ errors.nokPhone }}</div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Relationship to Client</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-heart"></i>
                    </span>
                    <input v-model="form.nextOfKins[0].relationship" type="text" class="form-control"
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
              <i class="bi bi-file-earmark-spreadsheet me-2"></i>Documents
            </h4>
            <hr class="my-3 text-secondary" />

            <div class="row g-3">
              <div class="col-md-6 mb-3">
                <label class="form-label">Passport Photo <small class="text-muted">(Max 50KB, .jpg, .jpeg,
                    .png)</small></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-image"></i>
                  </span>
                  <input type="file" @change="handlePassportPhotoChange" class="form-control"
                    :class="{ 'is-invalid': errors.passportPhotoFile }" accept="image/jpeg, image/png, image/jpg" />
                </div>
                <div class="invalid-feedback d-block" v-if="errors.passportPhotoFile">{{ errors.passportPhotoFile }}
                </div>
                <div v-if="form.existingPassportPhotoUrl" class="mt-2">
                  <h6>Current Passport Photo:</h6>
                  <img :src="`${apiBaseUrl}${form.existingPassportPhotoUrl}`" alt="Passport Photo" class="img-thumbnail"
                    style="max-width: 150px;">
                  <button type="button" class="btn btn-sm btn-outline-danger ms-2"
                    @click="form.existingPassportPhotoUrl = null">Remove</button>
                </div>
                <div v-else-if="form.passportPhotoFile" class="mt-2">
                  <h6>New Passport Photo Preview:</h6>
                  <img :src="createObjectURL(form.passportPhotoFile)" alt="Passport Photo" class="img-thumbnail"
                    style="max-width: 150px;">
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label">ID Document <small class="text-muted">(Max 100KB, .pdf)</small></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-file-earmark-pdf"></i>
                  </span>
                  <input type="file" @change="handleIdDocumentChange" class="form-control"
                    :class="{ 'is-invalid': errors.idDocumentFile }" accept="application/pdf" />
                </div>
                <div class="invalid-feedback d-block" v-if="errors.idDocumentFile">{{ errors.idDocumentFile }}</div>
                <div v-if="form.existingIdDocumentUrl" class="mt-2">
                  <h6>Current ID Document:</h6>
                  <a :href="`${apiBaseUrl}${form.existingIdDocumentUrl}`" target="_blank">View Document</a>
                  <button type="button" class="btn btn-sm btn-outline-danger ms-2"
                    @click="form.existingIdDocumentUrl = null">Remove</button>
                </div>
                <div v-else-if="form.idDocumentFile" class="mt-2">
                  <h6>New ID Document:</h6>
                  <a :href="createObjectURL(form.idDocumentFile)" target="_blank">View Document</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div class="d-flex justify-content-between mt-4">
        <button type="button" class="btn btn-primary" @click="prevStep" :disabled="currentStep === 1">
          Previous
        </button>

        <div v-if="currentStep < 3">
          <button type="button" class="btn btn-primary" @click="nextStep">
            Next
          </button>
        </div>

        <div v-if="currentStep === 3">
          <button type="button" class="btn btn-success" @click="submitForm">
            {{ isEditMode ? 'Update Client' : 'Register Client' }}
          </button>
        </div>
      </div>

      <Clients class="col-12"></Clients>

      <location-picker-modal :visible="showResidentialLocationModal" @close="showResidentialLocationModal = false"
        @location-selected="handleResidentialLocationSelected" />

      <location-picker-modal :visible="showHomeLocationModal" @close="showHomeLocationModal = false"
        @location-selected="handleHomeLocationSelected" />
    </div>
  </div>
</template>

<script>
import groupApi from "@/api/groupApi";
import clientApi from "@/api/clientApi";
import swal from '@/utils/swal';
import Clients from "../../components/tables/clients.vue";
import LocationPickerModal from '@/components/forms/LocationPickerModal.vue';

export default {
  components: {
    Clients,
    LocationPickerModal
  },
  data() {
    return {
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
      currentStep: 1,
      showResidentialLocationModal: false,
      showHomeLocationModal: false,
      form: {
        id: null,
        fullName: '',
        email: '',
        phoneNumber: '',
        idNumber: '',
        dob: '',
        gender: '',
        groupId: null,
        locations: [
          { type: 'Residential', county: '', subCounty: '', ward: '', gps: '' },
          { type: 'Home', county: '', subCounty: '', ward: '', gps: '' }
        ],
        nextOfKins: [{
          name: '',
          phone: '',
          relationship: ''
        }],
        idDocumentFile: null, // Stores actual File object for new upload
        passportPhotoFile: null, // Stores actual File object for new upload
        existingPassportPhotoUrl: null, // Stores URL of existing photo for display
        existingIdDocumentUrl: null, // Stores URL of existing ID for display
      },
      groups: [],
      errors: {},
      isEditMode: false,
      isLoadingClient: false,
    };
  },
  computed: {
    // This computed property isn't directly used to prevent step advancement,
    // but can be helpful for conditional rendering or debugging.
    isCurrentStepValid() {
      // This will only show if validateCurrentStep() has been called.
      return Object.keys(this.errors).length === 0;
    },
  },
  watch: {
    '$route.params.clientId': {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.isEditMode = true;
          this.form.id = newId;
          this.fetchClientForEdit(newId);
        } else {
          this.isEditMode = false;
          this.resetForm();
          this.setUserResidentialLocation(); // Auto-populate for new client
        }
      }
    }
  },
  mounted() {
    this.fetchGroups();
  },
  methods: {
    createObjectURL(file) {
      return URL.createObjectURL(file);
    },
    async fetchClientForEdit(clientId) {
      this.isLoadingClient = true;
      try {
        const response = await clientApi.getById(clientId);
        const clientData = response.data;

        this.form.fullName = clientData.fullName || '';
        this.form.email = clientData.email || '';
        this.form.phoneNumber = clientData.phoneNumber || '';
        this.form.idNumber = clientData.idNumber || '';
        this.form.dob = clientData.dob ? new Date(clientData.dob).toISOString().split('T')[0] : '';
        this.form.gender = clientData.gender || '';
        this.form.groupId = clientData.groupId || null;

        // --- CORRECTED Location Population based on array index ---
        const residentialLocationFromApi = clientData.locations?.[0]; // Get first element
        const homeLocationFromApi = clientData.locations?.[1];       // Get second element

        // Create the form's locations array, ensuring 'type' is set for display and future submission
        // We explicitly define the structure with 'type' even if the API doesn't return it
        this.form.locations = [
          residentialLocationFromApi
            ? { ...residentialLocationFromApi, type: 'Residential' } // Copy data, explicitly set type
            : { type: 'Residential', county: '', subCounty: '', ward: '', gps: '' },
          homeLocationFromApi
            ? { ...homeLocationFromApi, type: 'Home' } // Copy data, explicitly set type
            : { type: 'Home', county: '', subCounty: '', ward: '', gps: '' }
        ];
        // --- END CORRECTED Location Population ---

        this.form.nextOfKins = clientData.nextOfKins && clientData.nextOfKins.length > 0
          ? [{ ...clientData.nextOfKins[0] }]
          : [{ name: '', phone: '', relationship: '' }];

        // Populate existing document URLs for display
        if (clientData.documents && clientData.documents.length > 0) {
          const passportPhotoDoc = clientData.documents.find(doc => doc.documentType === 'PassportPhoto');
          const idDocumentDoc = clientData.documents.find(doc => doc.documentType === 'IDDocument');

          this.form.existingPassportPhotoUrl = passportPhotoDoc?.fileUrl || null;
          this.form.existingIdDocumentUrl = idDocumentDoc?.fileUrl || null;
        } else {
          this.form.existingPassportPhotoUrl = null;
          this.form.existingIdDocumentUrl = null;
        }

        this.errors = {}; // Clear any previous errors
        swal.success('Client data loaded for editing!');
      } catch (error) {
        console.error('Failed to fetch client for editing:', error);
        swal.error('Failed to load client data. Please try again or create a new client.');
        this.resetForm();
        this.$router.push({ name: 'Entry', query: { menu: 'New Client' } }); // Redirect to new client view
      } finally {
        this.isLoadingClient = false;
      }
    },
    handlePassportPhotoChange(event) {
      const file = event.target.files[0];
      this.errors.passportPhotoFile = ''; // Clear previous error
      this.form.passportPhotoFile = null; // Clear new file selection
      this.form.existingPassportPhotoUrl = null; // Clear existing URL if a new file is chosen

      if (!file) {
        // If file is explicitly cleared by user and no existing file, then it's required.
        if (!this.isEditMode || !this.form.existingPassportPhotoUrl) {
          this.errors.passportPhotoFile = 'Passport photo is required.';
        }
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.errors.passportPhotoFile = 'Only image files (jpg, jpeg, png) are allowed.';
        return;
      }

      if (file.size > 50 * 1024) { // 50KB limit
        this.errors.passportPhotoFile = 'Image size must not exceed 50KB.';
        return;
      }

      this.form.passportPhotoFile = file;
    },

    handleIdDocumentChange(event) {
      const file = event.target.files[0];
      this.errors.idDocumentFile = ''; // Clear previous error
      this.form.idDocumentFile = null; // Clear new file selection
      this.form.existingIdDocumentUrl = null; // Clear existing URL if a new file is chosen

      if (!file) {
        // If file is explicitly cleared by user and no existing file, then it's required.
        if (!this.isEditMode || !this.form.existingIdDocumentUrl) {
          this.errors.idDocumentFile = 'ID Document is required.';
        }
        return;
      }

      if (!file.type.includes("pdf")) {
        this.errors.idDocumentFile = 'Only PDF documents are allowed.';
        return;
      }

      if (file.size > 100 * 1024) { // 100KB limit
        this.errors.idDocumentFile = 'PDF size must not exceed 100KB.';
        return;
      }

      this.form.idDocumentFile = file;
    },

    async fetchGroups() {
      try {
        const response = await groupApi.getAll();
        this.groups = response.data;
      } catch (error) {
        console.error('Failed to fetch groups:', error);
        swal.error('Failed to load groups. Please try again.');
      }
    },
    async setUserResidentialLocation() {
      if (this.isEditMode) return; // Don't auto-populate if in edit mode

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const gps = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            this.form.locations[0].gps = gps; // Update residential GPS

            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`, {
                headers: { "User-Agent": "vue-client-form/1.0 (test)" } // User-Agent is important for Nominatim
              });

              const data = await res.json();
              const address = data.address || {};

              // Map Nominatim response to form fields for residential location
              this.form.locations[0].county = address.state || '';
              this.form.locations[0].subCounty = address.county || address.city_district || address.city || '';
              this.form.locations[0].ward = address.village || address.suburb || address.town || '';

            } catch (err) {
              console.warn("Residential reverse geocoding failed:", err);
              this.form.locations[0].county = "Nairobi";
              this.form.locations[0].subCounty = "Nairobi Central";
              this.form.locations[0].ward = "CBD";
              this.form.locations[0].gps = "-1.286389, 36.817223"; // Default GPS for Nairobi
              swal.info('Could not determine current residential location, defaulted to Nairobi.');
            }
          },
          (err) => {
            console.warn("Residential Geolocation not allowed or failed:", err);
            this.form.locations[0].county = "Nairobi";
            this.form.locations[0].subCounty = "Nairobi Central";
            this.form.locations[0].ward = "CBD";
            this.form.locations[0].gps = "-1.286389, 36.817223"; // Default GPS for Nairobi
            swal.info('Geolocation denied or unavailable, defaulted residential location to Nairobi.');
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
        this.form.locations[0].county = "Nairobi";
        this.form.locations[0].subCounty = "Nairobi Central";
        this.form.locations[0].ward = "CBD";
        this.form.locations[0].gps = "-1.286389, 36.817223"; // Default GPS for Nairobi
        swal.info('Your browser does not support geolocation, defaulted residential location to Nairobi.');
      }
    },
    handleResidentialLocationSelected(data) {
      this.form.locations[0].gps = data.gps;
      this.form.locations[0].county = data.county;
      this.form.locations[0].subCounty = data.subCounty;
      this.form.locations[0].ward = data.ward;
      this.showResidentialLocationModal = false;
      this.validateCurrentStep(); // Re-validate to clear errors if any
    },
    handleHomeLocationSelected(data) {
      this.form.locations[1].gps = data.gps;
      this.form.locations[1].county = data.county;
      this.form.locations[1].subCounty = data.subCounty;
      this.form.locations[1].ward = data.ward;
      this.showHomeLocationModal = false;
      this.validateCurrentStep(); // Re-validate to clear errors if any
    },
    autoPopulate() {
      if (this.isEditMode) {
        swal.info('Auto-populate is disabled in Edit Mode.');
        return;
      }

      this.form = {
        id: null,
        fullName: 'Jafari M. Akida',
        email: 'Jakida@tucode.co.ke',
        phoneNumber: '0759184063',
        idNumber: '12345678',
        dob: '1990-01-01',
        gender: 'Male',
        groupId: this.groups.length > 0 ? this.groups[0].id : null, // Use first available group
        locations: [
          { type: 'Residential', county: 'Mombasa', subCounty: 'Likoni', ward: 'Mtongwe', gps: '-4.0667, 39.6667' },
          { type: 'Home', county: 'Kilifi', subCounty: 'Malindi', ward: 'Ganda', gps: '-3.2250, 40.1170' }
        ],
        nextOfKins: [{
          name: 'Omari Suleiman',
          phone: '0700000000',
          relationship: 'Co-founder'
        }],
        idDocumentFile: null,
        passportPhotoFile: null,
        existingPassportPhotoUrl: null,
        existingIdDocumentUrl: null,
      };
      this.errors = {}; // Clear any errors after auto-populating
      swal.success('Form auto-populated for demo!');
    },
    validateCurrentStep() {
      const f = this.form;
      const currentErrors = {}; // Use a temporary object to collect errors for the current step

      if (this.currentStep === 1) {
        if (!f.fullName) currentErrors.fullName = 'Full Name is required.';
        if (!f.email) currentErrors.email = 'Email is required.';
        // Basic email format validation
        if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) currentErrors.email = 'Invalid email format.';
        if (!f.phoneNumber) currentErrors.phoneNumber = 'Phone Number is required.';
        // Basic phone number format validation (e.g., starts with 07 or 01 and 10 digits)
        if (f.phoneNumber && !/^(07|01)\d{8}$/.test(f.phoneNumber)) currentErrors.phoneNumber = 'Invalid phone number format (e.g., 0712345678 or 0112345678).'; if (!f.idNumber) currentErrors.idNumber = 'ID Number is required.';
        if (!f.dob) currentErrors.dob = 'Date of Birth is required.';
        if (!f.gender) currentErrors.gender = 'Gender is required.';
        if (!f.groupId) currentErrors.groupId = 'Group is required.';

        // Residential Location Validation
        if (!f.locations[0].county) currentErrors.residentialCounty = 'Residential County is required.';
        if (!f.locations[0].subCounty) currentErrors.residentialSubCounty = 'Residential Sub-County is required.';
        if (!f.locations[0].ward) currentErrors.residentialWard = 'Residential Ward is required.';
        if (!f.locations[0].gps) currentErrors.residentialGps = 'Residential GPS is required. Select on map.';

        // Home Location Validation
        if (!f.locations[1].county) currentErrors.homeCounty = 'Home County is required.';
        if (!f.locations[1].subCounty) currentErrors.homeSubCounty = 'Home Sub-County is required.';
        if (!f.locations[1].ward) currentErrors.homeWard = 'Home Ward is required.';
        if (!f.locations[1].gps) currentErrors.homeGps = 'Home GPS is required. Select on map.';

      } else if (this.currentStep === 2) {
        if (f.nextOfKins.length === 0 || !f.nextOfKins[0].name) currentErrors.nokName = 'Next of Kin Name is required.';
        if (f.nextOfKins.length === 0 || !f.nextOfKins[0].phone) currentErrors.nokPhone = 'Next of Kin Phone is required.';
        if (f.nextOfKins[0].phone && !/^07\d{8}$/.test(f.nextOfKins[0].phone)) currentErrors.nokPhone = 'Invalid phone number format (e.g., 0712345678).';
        if (f.nextOfKins.length === 0 || !f.nextOfKins[0].relationship) currentErrors.nokRelationship = 'Relationship is required.';

      } else if (this.currentStep === 3) {
        // Documents validation: Either a new file must be present OR an existing URL must exist
        if (!f.idDocumentFile && !f.existingIdDocumentUrl) {
          currentErrors.idDocumentFile = 'ID Document is required.';
        }
        if (!f.passportPhotoFile && !f.existingPassportPhotoUrl) {
          currentErrors.passportPhotoFile = 'Passport Photo is required.';
        }

        // Re-run file-specific validations if files are present to catch size/type issues
        if (f.passportPhotoFile) this.handlePassportPhotoChange({ target: { files: [f.passportPhotoFile] } });
        if (f.idDocumentFile) this.handleIdDocumentChange({ target: { files: [f.idDocumentFile] } });

        // Merge any new file errors from handler into currentErrors
        if (this.errors.passportPhotoFile) currentErrors.passportPhotoFile = this.errors.passportPhotoFile;
        if (this.errors.idDocumentFile) currentErrors.idDocumentFile = this.errors.idDocumentFile;
      }

      this.errors = currentErrors; // Update the component's errors data property
      return Object.keys(this.errors).length === 0;
    },
    nextStep() {
      if (this.validateCurrentStep()) {
        this.currentStep++;
        this.errors = {}; // Clear errors when moving to the next step
      } else {
        swal.error('Please fix the highlighted errors before proceeding.');
      }
    },
    prevStep() {
      this.currentStep--;
      this.errors = {}; // Clear errors when moving back
    },
    async submitForm() {
      if (!this.validateCurrentStep()) {
        swal.error('Please fill in all required fields for the current step.');
        return;
      }

      const clientDto = {
        fullName: this.form.fullName,
        email: this.form.email,
        phoneNumber: this.form.phoneNumber,
        idNumber: this.form.idNumber,
        dob: this.form.dob,
        gender: this.form.gender,
        groupId: this.form.groupId,
        // Ensure locations are mapped correctly for API submission
        locations: this.form.locations.map(loc => ({
          county: loc.county,
          subCounty: loc.subCounty,
          ward: loc.ward,
          gps: loc.gps,
          type: loc.type // Ensure type is included for API
        })),
        nextOfKins: this.form.nextOfKins.map(nok => ({
          name: nok.name,
          phone: nok.phone,
          relationship: nok.relationship
        })),
      };

      const filesToUpload = [];
      if (this.form.passportPhotoFile) {
        filesToUpload.push({ file: this.form.passportPhotoFile, documentType: 'PassportPhoto' });
      }
      if (this.form.idDocumentFile) {
        filesToUpload.push({ file: this.form.idDocumentFile, documentType: 'IDDocument' });
      }

      try {
        if (this.isEditMode && this.form.id) {
          await clientApi.update(this.form.id, clientDto, filesToUpload);
          swal.success('Client updated successfully!');
        } else {
          await clientApi.create(clientDto, filesToUpload);
          swal.success('Client submitted successfully!');
        }
        this.resetForm();
        this.currentStep = 1;
        this.$router.push({ name: 'Entry', query: { menu: 'New Client' } }); // Navigate back to clients table
      } catch (error) {
        console.error('Client submission failed:', error);
        let errorMessage = 'Client submission failed. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
          this.errors = error.response.data.errors;
          errorMessage = 'Validation errors occurred. Please check your inputs.';
        }
        swal.error(errorMessage);
      }
    },
    resetForm() {
      this.form = {
        id: null,
        fullName: '',
        email: '',
        phoneNumber: '',
        idNumber: '',
        dob: '',
        gender: '',
        groupId: null,
        locations: [
          { type: 'Residential', county: '', subCounty: '', ward: '', gps: '' },
          { type: 'Home', county: '', subCounty: '', ward: '', gps: '' }
        ],
        nextOfKins: [{
          name: '',
          phone: '',
          relationship: ''
        }],
        idDocumentFile: null,
        passportPhotoFile: null,
        existingPassportPhotoUrl: null,
        existingIdDocumentUrl: null,
      };
      this.errors = {};
      this.currentStep = 1;
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
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress {
  height: 100%;
  background-color: #007bff;
  width: 0%;
  transition: width 0.3s ease-in-out;
  border-radius: 4px;
}

.step-labels {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #6c757d;
  position: relative;
  /* Ensure relative positioning for absolute children */
}

.step-labels>div {
  flex: 1;
  text-align: center;
  /* padding-top: 10px; */
  /* Space for lines */
}

.step-labels>div.active {
  color: #007bff;
}

/* Indicators above the line (optional, but good for multi-step forms) */
.step-labels>div::before {
  content: '';
  position: absolute;
  top: -18px;
  /* Adjust to position above the line */
  transform: translateX(-50%);
  /* Center dot above label */
  width: 12px;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 50%;
  left: 50%;
  /* Default position, overridden by specific steps */
  z-index: 1;
  border: 2px solid #e0e0e0;
}

.step-labels>div.active::before {
  background-color: #007bff;
  border-color: #007bff;
}

/* Adjusting positions for step indicators */
.step-labels>div:nth-child(1)::before {
  left: 0%;
  /* Position for Step 1 */
}

.step-labels>div:nth-child(2)::before {
  left: 50%;
  /* Position for Step 2 */
}

.step-labels>div:nth-child(3)::before {
  left: 100%;
  /* Position for Step 3 */
}


.invalid-feedback {
  font-size: 0.875em;
}

.input-group-text {
  background-color: #e9ecef;
  border-color: #ced4da;
}

.form-control:disabled,
.form-select:disabled {
  background-color: #e9ecef;
  opacity: 1;
}

.card {
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-body {
  padding: 2rem;
}

h4 {
  font-size: 1.5rem;
}

label {
  font-weight: 600;
  color: #495057;
}
</style>