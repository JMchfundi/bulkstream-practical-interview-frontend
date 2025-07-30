<style scoped>
.div-details {
  font-weight: lighter;
  color: #000;
  font-size: smaller;
  padding: 0.3em 0 0.3em 0.8em;
}

select:focus,
input:focus {
  border: 1px solid #4CB1F6;
}
</style>
<script>

import { profileFunctions } from "@/api/profile.service";
import {
  required,
  alphaNum
} from "vuelidate/lib/validators";

/**
 * Form validation component
 */
export default {
  data() {
    return {
      // For the button
      busy: false,
      timeout: null,

      form: {
        empnum: "",
        select1: "",
        select2: "",
        select3: "",
        select4: "",
        select5: "",
        select6: "",
      },
      submitted: false,
    };
  },
  validations: {
    form: {
      empnum: { required, alphaNum },
      select1: { required },
      select2: { required },
      select3: { required },
      select4: { required },
      select5: { required },
      select6: { required },
    },
  },
  // For the button 
  beforeDestroy() {
    this.clearTimeout()
  },
  methods: {
    // For the button
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    // For button
    setTimeout(callback) {
      this.clearTimeout()
      this.timeout = setTimeout(() => {
        this.clearTimeout()
        callback()
      }, 5000)
    },
    // For button
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus()
    },
    // For button
    onClick() {
      this.busy = true
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false
      })
    },
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;
      this.onClick();
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.busy = false
        return;
      } else {
        profileFunctions.profileEmpDetails(this.form)
      }
    },
  }
};
</script>
<template>
  <!-- Citizen categorization -->
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom mt-3 d-flex align-items-center mb-3">
        <h4 class="d-flex" style="color: #FFA500;">
          <span class="d-flex"><i class="ri-medal-line mr-1"></i></span>Employement & Income
        </h4>
      </div>
      <form action="" class="needs-validation" @submit.prevent="formSubmit">
        <div class="row">
          <!-- / Column Inside form -->
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_01" class="font-size-15 font-weight-light">What's Your Income Range?</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="validationInfo_01" v-model="form.select1"
                  type="text" :class="{ 'is-invalid': submitted && $v.form.select1.$error }">
                  <option value="">Select your income range</option>
                  <option value="KSH.0 - KSH.19,999">KSH.0 - KSH.19,999</option>
                  <option value="KSH.20,000 - KSH.49,999">KSH.20,000 - KSH.49,999</option>
                  <option value="KSH.50,000 - KSH.149,999">KSH.50,000 - KSH.149,999</option>
                  <option value="Over KSH.150,000">Over KSH.150,000</option>
                </select>
                <div v-if="submitted && $v.form.select1.$error" class="invalid-feedback">
                  <span v-if="!$v.form.select1.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_02" class="font-size-15 font-weight-light">What's Your
                  Occupation/Qualification</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" name="" id="validationInfo_02" v-model="form.select2"
                  type="" :class="{ 'is-invalid': submitted && $v.form.select2.$error }">
                  <option value="">Select...</option>
                  <option value="Unskilled">Unskilled</option>
                  <option value="Clerical">Clerical</option>
                  <option value="Skilled">Skilled</option>
                  <option value="Professional">Professional</option>
                </select>
                <div v-if="submitted && $v.form.select2.$error" class="invalid-feedback">
                  <span v-if="!$v.form.select2.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_03" class="font-size-15 font-weight-light ">What's Your Employemnt
                  Status</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" name="" id="validationInfo_03" v-model="form.select3"
                  type="" :class="{ 'is-invalid': submitted && $v.form.select3.$error }">
                  <option value="">Select...</option>
                  <option value="Employed but under probation">Employed but under probation</option>
                  <option value="Permanent & pensionable">Permanent & pensionable</option>
                  <option value="Contracted">Contracted</option>
                <option value="Part Time">Part Time</option>
                  <option value="Self-Employed">Self-Employed</option>
                </select>
                <div v-if="submitted && $v.form.select3.$error" class="invalid-feedback">
                  <span v-if="!$v.form.select3.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_04" class="font-size-15 font-weight-light">How would you describe your
                  income</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="validationInfo_04" v-model="form.select4"
                  type="text" value="" :class="{ 'is-invalid': submitted && $v.form.select4.$error }">
                  <option value="">Select...</option>
                  <option value="Regular income for less than 6 months">Regular income for less than 6 months</option>
                  <option value="Regular income for between 6 months and 2 years">Regular income for between 6 months and
                    2 years</option>
                  <option value="Regular income for more than 2 years">Regular income for more than 2 years</option>
                </select>
                <div v-if="submitted && $v.form.select4.$error" class="invalid-feedback">
                  <span v-if="!$v.form.select4.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_05" class="font-size-15 font-weight-light">How long you been working
                  at your current job</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="validationInfo_05" v-model="form.select5"
                  type="text" :class="{ 'is-invalid': submitted && $v.form.select5.$error }">
                  <option value="">Select...</option>
                  <option value="Less than 6 months">Less than 6 months</option>
                  <option value="Between 6 months and 1 year">Between 6 months and 1 year</option>
                  <option value="Between 1 and 3 Years">Between 1 and 3 Years</option>
                  <option value="Between 3 and 6 Years">Between 3 and 6 Years</option>
                  <option value="Over 6 Years">Over 6 Years</option>
                </select>
                <div v-if="submitted && $v.form.select5.$error" class="invalid-feedback">
                  <span v-if="!$v.form.select5.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_06" class="font-size-15 font-weight-light">What's the nature of your current
                  employer</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="validationInfo_06" v-model="form.select6"
                  type="text" :class="{ 'is-invalid': submitted && $v.form.select6.$error }">
                  <option value="">Select...</option>
                  <option value="Government/Parastatal">Government/Parastatal</option>
                  <option value="NGO">NGO</option>
                  <option value="Private/Public NSE listed company">Private/Public NSE listed company </option>
                  <option value="Private Limited Company">Private Limited Company</option>
                  <option value="SME/Micro companies">SME/Micro companies</option>
                  <option value="Self-employed">Self-employed</option>
                </select>
                <div v-if="submitted && $v.form.select6.$error" class="invalid-feedback">
                  <span v-if="!$v.form.select6.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_07" class="font-size-15 font-weight-light">Employer Number(If
                  Applicable)</label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" placeholder="Employer Number" id="validationInfo_07"
                  v-model="form.empnum" type="text" value="empnum"
                  :class="{ 'is-invalid': submitted && $v.form.empnum.$error }" />
                <div v-if="submitted && $v.form.empnum.$error" class="invalid-feedback">
                  <span v-if="!$v.form.empnum.required">This value is required.</span>
                  <span v-if="!$v.form.empnum.alphaNum">Wrong value, use Alphanumeric.</span>
                </div>
              </div>
            </div>
          </div>
          <!-- /End column inside form -->
        </div>
        <div class="row no-gutters mt-2 p-1">
          <div class="col d-flex justify-content-end">
            <b-overlay :show="busy" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block"
              @hidden="onHidden">
              <b-button ref="button"
                class="text-uppercase btn btn-success btn-sm d-flex align-items-center justify-content-center mt-1"
                :disabled="busy" variant="primary" type="submit">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE
              </b-button>
            </b-overlay>
            <!-- <button href="#" type="submit" class="btn btn-sm btn-success d-flex align-items-center">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE</button> -->
          </div>
        </div>
      </form>
      <!-- /End Form -->
    </div>
  </div>
</template>