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
  numeric,
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
        resdigit: "",
        resnumber: "",
        selectval02: "",
        selectval03: "",


      },
      submitted: false,
    };
  },
  validations: {
    form: {
      resdigit: { required, numeric },
      resnumber: { required, numeric },
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
        profileFunctions.profileFamilyResidence(this.form)
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
          <span class="d-flex">
            <i class="ri-parent-line mr-1"></i>
          </span>Family & Residence
        </h4>
      </div>
      <form action="" class="needs-validation" @submit.prevent="formSubmit">
        <div class="row">
          <!-- / Column Inside form -->
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_01" class="font-size-15 font-weight-light">How many children do you
                  have?</label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" placeholder="# of dependants" id="validationInfo_01"
                  v-model="form.resdigit" type="text" value="number"
                  :class="{ 'is-invalid': submitted && $v.form.resdigit.$error }" />

                <div v-if="submitted && $v.form.resdigit.$error" class="invalid-feedback">
                  <span v-if="!$v.form.resdigit.required">This value is required.</span>
                  <span v-if="!$v.form.resdigit.numeric">Wrong value, use ONLY a number</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_02" class="font-size-15 font-weight-light">What's your current
                  residence</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="validationInfo_02" v-model="form.selectval02"
                  type="" :class="{ 'is-invalid': submitted && $v.form.selectval02.$error }">
                  <option value="">Select...</option>
                  <option value="owned">Owned & on mortgage</option>
                  <option value="notOwned">Owned & not mortgage</option>
                  <option value="provide">Provided by employer</option>
                </select>
                <div v-if="submitted && $v.form.selectval02.$error" class="invalid-feedback">
                  <span v-if="!$v.form.selectval02.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_03" class="font-size-15 font-weight-light ">Do you live with your
                  family</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" name="" id="validationInfo_03"
                  v-model="form.selectval03" type="" :class="{ 'is-invalid': submitted && $v.form.selectval03.$error }">
                  <option value="">Choose...</option>
                  <option value="yes">YES</option>
                  <option value="no">NO</option>
                </select>
                <div v-if="submitted && $v.form.selectval03.$error" class="invalid-feedback">
                  <span v-if="!$v.form.selectval03.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_01" class="font-size-15 font-weight-light">How much do you currently pay for
                  rent?</label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" placeholder="0.00" id="validationInfo_01"
                  v-model="form.resnumber" type="text" value=""
                  :class="{ 'is-invalid': submitted && $v.form.resnumber.$error }" />

                <div v-if="submitted && $v.form.resnumber.$error" class="invalid-feedback">
                  <span v-if="!$v.form.resnumber.required">This value is required.</span>
                  <span v-if="!$v.form.resnumber.numeric">Wrong value, use ONLY number</span>
                </div>
              </div>
            </div>
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
            <!-- <button href="#" type="submit" class="btn btn-sm btn-success d-flex align-items-center">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE</button> -->
          </div>
        </div>
      </form>
      <!-- /End Form -->
    </div>
  </div>
</template>