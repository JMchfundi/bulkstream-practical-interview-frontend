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
  email,
  // minLength,
  // sameAs,
  // maxLength,
  // minValue,
  // maxValue,
  numeric,
  // url,
  alphaNum,
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

      typeform: {
        name: "",
        // password: "",
        // confirmPassword: "",
        email: "",
        // url: "",
        digit: "",
        date: "",
        number: "",
        state: "",
        alphanum: "",
        status: "",
        // textarea: "",
        ability: ""
      },
      submitted: false,
      submitform: false,
      submit: false,
      typesubmit: false
    };
  },
  validations: {
    typeform: {
      name: { required },
      // password: { required, minLength: minLength(6) },
      // confirmPassword: { required, sameAsPassword: sameAs("password") },
      email: { required, email },
      // url: { required, url },
      digit: { required, numeric },
      date: { required },
      number: { required, numeric },
      state: { required },
      alphanum: { required, alphaNum },
      status: { required },
      // textarea: { required },
      ability: { required }
    }
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
    // For the button
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
    /**
     * Validation type submit
     */
    // eslint-disable-next-line no-unused-vars
    typeForm(e) {
      this.typesubmit = true;
      this.onClick();
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.busy = false
        return;
      } else {
        profileFunctions.profilePersonalInfo(this.typeform)
      }

    }
  }
};
</script>
<template>
  <!-- Personal details -->
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom mt-3 d-flex align-items-center mb-3">
        <h4 class="d-flex" style="color: #FFA500;">
          <span class="d-flex">
            <i class="ri-profile-line mr-1"></i></span>
          Personal Information
        </h4>
      </div>
      <form action="#" @submit.prevent="typeForm">
        <div class="row">
          <!-- / Column Inside form -->
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4 ">
                <label for="valInfo_01" class="font-size-15 font-weight-light w-100"> Country of
                  Residence</label>
              </div>
              <div class="col-lg-8 ">
                <select class="form-control rounded-0 div-details" id="valInfo_01" v-model="typeform.name" type="text"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.name.$error }">
                  <option value="">Choose...</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Burndi">Burundi</option>
                  <option value="Sudan">S.Sudan</option>
                </select>
                <div v-if="typesubmit && $v.typeform.name.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.name.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="valInfo_02" class="font-size-15 font-weight-light">
                  State/City
                </label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" placeholder="State/City" id="valInfo_02"
                  v-model="typeform.state" value="state"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.state.$error }" />
                <div v-if="typesubmit && $v.typeform.state.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.state.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4"><label for="valInfo_03" class="font-size-15 font-weight-light">
                  Alternative Phone Number
                </label>
              </div>
            <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" placeholder="Alternative Phone Number" id="valInfo_03"
                  v-model="typeform.digit" type="text" value="digit"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.digit.$error }" />
                <div v-if="typesubmit && $v.typeform.digit.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.digit.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="valInfo_04" class="font-size-15 font-weight-light">
                  ID Number
                </label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" placeholder="ID Number" id="valInfo_04"
                  v-model="typeform.number" type="text" value="number"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.number.$error }" />
                <div v-if="typesubmit && $v.typeform.number.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.number.required">This value is required.</span>
                  <span v-if="!$v.typeform.number.numeric">This value should be a valid number.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="valInfo_05" class="font-size-15 font-weight-light">
                  KRA PIN
                </label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" placeholder="Your KRA pin #" v-model="typeform.alphanum"
                  type="text" value="alphanum" id="valInfo_05"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.alphanum.$error }" />
                <div v-if="typesubmit && $v.typeform.alphanum.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.alphanum.required">This value is required.</span>
                  <span v-if="!$v.typeform.alphanum.alphaNum">This value should be alphanumeric.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="valInfo_06" class="font-size-15 font-weight-light">Email</label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" v-model="typeform.email" type="text" value="email"
                  id="valInfo_06" placeholder="Enter a valid e-mail"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.email.$error }" />
                <div v-if="typesubmit && $v.typeform.email.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.email.required">This value is required.</span>
                  <span v-if="!$v.typeform.email.email">This value should be a valid email.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="valInfo_07" class="font-size-15 font-weight-light">
                  Date of birth
                </label>
              </div>
              <div class="col-lg-8">
                <input class="form-control rounded-0 div-details" v-model="typeform.date" type="date" value="date"
                  id="valInfo_07" :class="{ 'is-invalid': typesubmit && $v.typeform.date.$error }" />
                <div v-if="typesubmit && $v.typeform.date.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.date.required">This value is required.</span>
                  <span v-if="!$v.typeform.date">Please fill all fields.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="valInfo_08" class="font-size-15 font-weight-light ">What's Your Marital
                  Status</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="valInfo_08" v-model="typeform.status" type="text"
                  value="status" :class="{ 'is-invalid': typesubmit && $v.typeform.status.$error }">
                  <option value="">Choose...</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
                <div v-if="typesubmit && $v.typeform.status.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.status.required">This value is required.</span>
                  <span v-if="!$v.typeform.status.alphaNum">This value should be alphanumeric.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="valInfo_09" class="font-size-15 font-weight-light ">Do you have Any
                  Disability?</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" v-model="typeform.ability" type="text" id="valInfo_09"
                  placeholder="Type something" value="name"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.ability.$error }">
                  <option value="">Choose...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div v-if="typesubmit && $v.typeform.ability.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.ability.required">This value is required.</span>
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
  <!-- End personal details -->
</template>