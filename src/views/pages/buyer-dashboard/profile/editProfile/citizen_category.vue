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
        selectval01: "",
        selectval02: "",
        selectval03: ""
      },
      submitted: false,
    };
  },
  validations: {
    form: {
      selectval01: { required },
      selectval02: { required },
      selectval03: { required },

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
        profileFunctions.profileCitizen(this.form)
      }
    },
  }
};
</script>
<template>
  <!-- Citizen categorization -->
<div class="row">
  <div class="col">
    <div class="card-title border-bottom mt-3 mb-3 d-flex align-items-center ">
      <h4 class="d-flex" style="color: #FFA500;">
        <span class="d-flex">
          <i class="ri-file-list-line mr-1"></i>
        </span>
        Citizen Categorization
      </h4>
    </div>
    <form action="#" class="needs-validation" @submit.prevent="formSubmit">
      <div class="row">
        <!-- / Column Inside form -->
        <div class="col">
          <div class="form-group row">
            <div class="col-lg-4">
              <label for="validationInfo_01" class="font-size-15 font-weight-light">Are you a Civil
                  Servant?</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="validationInfo_01" v-model="form.selectval01"
                  type="text" :class="{ 'is-invalid': submitted && $v.form.selectval01.$error }">
                  <option value="">Choose...</option>
                  <option value="true">YES</option>
                  <option value="false">NO</option>
                </select>
                <div v-if="submitted && $v.form.selectval01.$error" class="invalid-feedback">
                  <span v-if="!$v.form.selectval01.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_02" class="font-size-15 font-weight-light">Are you in
                  Defence
                  Forces or
                  Police Service?</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" name="" id="validationInfo_02"
                  v-model="form.selectval02" type="" :class="{ 'is-invalid': submitted && $v.form.selectval02.$error }">
                  <option value="">Choose...</option>
                  <option value="true">YES</option>
                  <option value="false">NO</option>
                </select>
                <div v-if="submitted && $v.form.selectval02.$error" class="invalid-feedback">
                  <span v-if="!$v.form.selectval02.required">This value is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_03" class="font-size-15 font-weight-light ">Are you a member of a
                  Sacco?</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" name="" id="validationInfo_03"
                  v-model="form.selectval03" type="" :class="{ 'is-invalid': submitted && $v.form.selectval03.$error }">
                  <option value="">Choose...</option>
                  <option value="true">YES</option>
                  <option value="false">NO</option>
                </select>
                <div v-if="submitted && $v.form.selectval03.$error" class="invalid-feedback">
                  <span v-if="!$v.form.selectval03.required">This value is required.</span>
                </div>
              </div>
            </div>
            <!-- <div class="form-group row">
                <div class="col-lg-4">
                  <h6 for="" class="font-size-15 font-weight-light">Select your preferred mode
                    of Purchase?</h6>
                </div>
                <div class="col-lg-8">
                  <div class="custom-control custom-radio mb-3">
                    <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
                    <div class="invalid-feedback">You must choose a purchase preference before submitting.</div>
                    <label class="custom-control-label font-weight-lighter font-size-13" for="customRadio1">Cash-this
                      requires 100% of the value of
                      the unit at
                      the time of assessment
                    </label>
                  </div>

                  <div class="custom-control custom-radio mb-3">
                    <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                    <div class="invalid-feedback">You must choose a purchase preference before submitting.</div>
                    <label class="custom-control-label font-weight-lighter font-size-13" for="customRadio2">Tenant
                      Purchase Scheme-requires 12.5% deposit at the
                      time of assessment for allocation and is offered through the National housing
                      cooperation
                    </label>
                  </div>

                  <div class="custom-control custom-radio mb-3">
                    <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" />
                    <div class="invalid-feedback">You must choose a purchase preference before submitting.</div>
                    <label class="custom-control-label font-weight-lighter font-size-13"
                      for="customRadio3">Mortgage-requires
                      12.5% deposit saved at the time of
                      assessment for allocation and is offered by partner banks
                    </label>
                  </div>
                </div>


              
              </div> -->
          </div>
          <!-- /End column inside form -->
        </div>
        <div class="row no-gutters mt-2 p-1 form-group">
          <div class="col d-flex justify-content-end">
            <b-overlay :show="busy" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block"
              @hidden="onHidden">
              <b-button ref="button"
                class="text-uppercase btn btn-success btn-sm d-flex align-items-center justify-content-center mt-1"
                :disabled="busy" variant="primary" type="submit">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE
              </b-button>
            </b-overlay>
            <!-- <button type="submit" class="btn btn-sm btn-success d-flex align-items-center">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE</button> -->
          </div>
        </div>
      </form>
      <!-- /End Form -->
    </div>
  </div>
</template>