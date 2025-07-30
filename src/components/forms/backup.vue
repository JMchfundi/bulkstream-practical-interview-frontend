<template>
  <div class="card">
    <div class="card-body">
      <!-- Auto-Populate Button -->
      <div class="text-center mb-4">
        <button class="btn btn-warning" @click="autoPopulate">
          <i class="bi bi-person-check-fill me-2"></i>Auto-Populate for Demo
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="progress-container mb-4">
        <div class="progress-line">
          <div class="progress" :style="{ width: `${(currentStep - 1) / 3 * 100}%` }"></div>
        </div>
        <div class="step-labels d-flex justify-content-between">
          <div :class="{ active: currentStep >= 1 }">Step 1: Officer Details</div>
          <div :class="{ active: currentStep >= 2 }">Step 2: Emergency Contact</div>
          <div :class="{ active: currentStep === 3 }">Step 3: Documents</div>
        </div>
      </div>

      <!-- Form Start -->
      <form @submit.prevent="submitForm" novalidate>
        <!-- Step 1: Officer Personal Information -->
        <div v-if="currentStep === 1">
          <div class="row g-3">
            <!-- Full Name -->
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

            <!-- Email -->
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-envelope-fill"></i>
                </span>
                <input v-model="form.email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                  placeholder="Enter email" />
              </div>
              <div class="invalid-feedback d-block" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <!-- Phone Number -->
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

            <!-- ID/Passport Number -->
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

            <!-- Date of Birth -->
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

            <!-- Gender -->
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

            <!-- Branch Location -->
            <div class="col-md-6">
              <label class="form-label">Branch/Location</label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-geo-alt"></i>
                </span>
                <input v-model="form.branchLocation" type="text" class="form-control"
                  :class="{ 'is-invalid': errors.branchLocation }" placeholder="Enter branch location" />
              </div>
              <div class="invalid-feedback d-block" v-if="errors.branchLocation">{{ errors.branchLocation }}</div>
            </div>

          </div>
        </div>

        <!-- Step 2: Emergency Contact (Next of Kin) -->
        <div v-if="currentStep === 2">
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

        <!-- Step 3: Documents -->
        <div v-if="currentStep === 3">
          <div class="row g-3">
            <!-- ID Document Upload -->
            <div class="col-md-6">
              <label class="form-label">Upload ID/Passport</label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-file-earmark"></i>
                </span>
                <input type="file" @change="handleFileChange('idDocument', $event)" class="form-control"
                  :class="{ 'is-invalid': errors.idDocument }" />
              </div>
              <div class="invalid-feedback d-block" v-if="errors.idDocument">{{ errors.idDocument }}</div>
            </div>

            <!-- Passport Photo Upload -->
            <div class="col-md-6">
              <label class="form-label">Upload Passport Photo</label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-file-earmark-image"></i>
                </span>
                <input type="file" @change="handleFileChange('passportPhoto', $event)" class="form-control"
                  :class="{ 'is-invalid': errors.passportPhoto }" />
              </div>
              <div class="invalid-feedback d-block" v-if="errors.passportPhoto">{{ errors.passportPhoto }}</div>
            </div>

            <!-- Bank Account Details -->
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

        <!-- Navigation Buttons -->
                 <div class="d-flex justify-content-between mt-4">
          <button type="button" class="btn btn-primary" @click="goToStep(currentStep - 1)" :disabled="currentStep === 1">
            Previous
          </button>

          <div v-if="currentStep < 3">
            <button type="button" class="btn btn-primary" @click="goToStep(currentStep + 1)">
              Next
            </button>
          </div>

          <div v-if="currentStep === 3">
            <button type="submit" class="btn btn-success">
              Submit
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      form: {
        fullName: "",
        email: "",
        phoneNumber: "",
        idNumber: "",
        dob: "",
        gender: "",
        branchLocation: "",
        nokName: "",
        nokPhone: "",
        nokRelationship: "",
        idDocument: null,
        passportPhoto: null,
        bankDetails: ""
      },
      errors: {}
    };
  },
  methods: {
    // Auto-populate form data for demo
    autoPopulate() {
      this.form.fullName = "John Doe";
      this.form.email = "johndoe@example.com";
      this.form.phoneNumber = "1234567890";
      this.form.idNumber = "ABC123456";
      this.form.dob = "1990-01-01";
      this.form.gender = "Male";
      this.form.branchLocation = "Head Office";
      this.form.nokName = "Jane Doe";
      this.form.nokPhone = "0987654321";
      this.form.nokRelationship = "Sister";
      this.form.bankDetails = "XYZ Bank, Account No: 123456789";
    },

    // Move to a specific step
    goToStep(step) {
      this.currentStep = step;
    },

    // Handle file change
    handleFileChange(field, event) {
      this.form[field] = event.target.files[0];
    },

    // Submit the final form data
    submitForm() {
      // Assuming you have a backend API to send the data to
      console.log("Form submitted with data:", this.form);

      // Send data to server (Example using fetch)
      fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.form)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          alert('Form submitted successfully!');
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error submitting form!');
        });
    }
  }
};
</script>

<style scoped>
/* Styles for the form */
.progress-container {
  position: relative;
  height: 20px;
}
.progress-line {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
}
.progress {
  background-color: #3c8dbc;
  height: 100%;
  border-radius: 5px;
}
.step-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
}
.step-labels .active {
  font-weight: bold;
}
</style>
