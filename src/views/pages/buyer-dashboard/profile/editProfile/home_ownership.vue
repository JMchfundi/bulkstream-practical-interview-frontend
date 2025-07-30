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
        typology: "",
        val01: "",
        val02: "",

      },
      submitted: false,
    };
  },
  validations: {
    form: {
      typology: { required },
      val01: { required },
      val02: { required },
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
        profileFunctions.profileHomeOwnership(this.form)
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
            <i class="ri-home-heart-line mr-1"></i></span>
          Home ownership & Preference
        </h4>
      </div>
      <form action="" class="needs-validation" @submit.prevent="formSubmit">
        <div class="row">
          <!-- / Column Inside form -->
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_01" class="font-size-15 font-weight-light">What kind of a home would like to
                  apply for?</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" placeholder="# of dependants" id="validationInfo_01"
                  v-model="form.typology" type="text" value=""
                  :class="{ 'is-invalid': submitted && $v.form.typology.$error }">
                  <option value="">Select Typology...</option>
                  <option value="one">One bedroom</option>
                  <option value="two">two bedroom</option>
                  <option value="three">Three bedroom</option>
              </select>
                <div v-if="submitted && $v.form.typology.$error" class="invalid-feedback">
                  <span v-if="!$v.form.typology.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_02" class="font-size-15 font-weight-light">What's your reason for owning a
                  home?</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" placeholder="# of dependants" id="validationInfo_02"
                  v-model="form.val01" type="text" :class="{ 'is-invalid': submitted && $v.form.val01.$error }">
                  <option value="">Select...</option>
                  <option value="in">Place to live in</option>
                  <option value="out">House to rent out</option>
                </select>
                <div v-if="submitted && $v.form.val01.$error" class="invalid-feedback">
                  <span v-if="!$v.form.val01.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validationInfo_03" class="font-size-15 font-weight-light">Select your preferred country to
                  own a home</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details" id="validationInfo_03" v-model="form.val02" type="text"
                  :class="{ 'is-invalid': submitted && $v.form.val02.$error }">
                  <option value="">Select...</option>
                  <option value="kenya">Kenya</option>
                  <option value="tanzania">Tanzania</option>
                  <option value="uganda">Uganda</option>
                  <option value="rwanda">Rwanda</option>
                  <option value="burundi">Burundi</option>
                  <option value="sudan">S.Sudan</option>
                </select>
                <div v-if="submitted && $v.form.val02.$error" class="invalid-feedback">
                  <span v-if="!$v.form.val02.required">This value is required.</span>
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