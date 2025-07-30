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
        fname: "",
        lname: "",
        idnumber: "",
        id_number: "",
        phonenumber: "",
        phone_number: "",
      },
      submitted: false,
    };
  },
  validations: {
    form: {
      fname: { required },
      lname: { required },
      idnumber: { required, numeric },
      id_number: { required, numeric },
      phonenumber: { required, numeric },
      phone_number: { required, numeric },


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
        profileFunctions.profileNextOfKin(this.form)
      }
    }
  }
};
</script>
<template>
  <div class="main">
    <!-- Citizen categorization -->
    <div class="row">
      <div class="col">
        <div class="card-title border-bottom mt-3 d-flex align-items-center mb-3">
          <h4 class="d-flex" style="color: #FFA500;">
            <span class="d-flex"><i class="ri-user-heart-line mr-1"></i></span>
            Next of Kin
          </h4>
        </div>
      </div>
    </div>
    <form action="" class="needs-validation" @submit.prevent="formSubmit">
      <div class="row">
        <!-- / Column Inside form -->
        <div class="col">
          <div class="border-bottom mb-2">
            <h5 class="font-weight-lighter">Next Of Kin #1</h5>
          </div>
          <div class="form-group ">
            <div class="">
            <label for="validationInfo_01" class="font-size-15 font-weight-light">Full Name</label>
            </div>
            <div class="">
              <input class="form-control rounded-0 div-details" placeholder="Full Name" id="validationInfo_01"
                v-model="form.fname" type="text" value="fullname"
                :class="{ 'is-invalid': submitted && $v.form.fname.$error }" />
              <div v-if="submitted && $v.form.fname.$error" class="invalid-feedback">
                <span v-if="!$v.form.fname.required">This value is required.</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="">
              <label for="validationInfo_02" class="font-size-15 font-weight-light">ID Number</label>
            </div>
            <div class="">
              <input class="form-control rounded-0 div-details" placeholder="ID Number" id="validationInfo_02"
                v-model="form.idnumber" type="text" value="id"
                :class="{ 'is-invalid': submitted && $v.form.idnumber.$error }" />
              <div v-if="submitted && $v.form.idnumber.$error" class="invalid-feedback">
                <span v-if="!$v.form.idnumber.required">This value is required.</span>
                <span v-if="!$v.form.idnumber.numeric">Wrong value, use ONLY number</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="">
              <label for="validationInfo_03" class="font-size-15 font-weight-light">Phone Number</label>
            </div>
            <div class="">
              <input class="form-control rounded-0 div-details" placeholder="Phone Number" id="validationInfo_03"
                v-model="form.phonenumber" type="text" value="phonenumber"
                :class="{ 'is-invalid': submitted && $v.form.phonenumber.$error }" />
              <div v-if="submitted && $v.form.id_number.$error" class="invalid-feedback">
                <span v-if="!$v.form.phonenumber.required">This value is required.</span>
                <span v-if="!$v.form.phonenumber.numeric">Wrong value, use ONLY number</span>
              </div>
            </div>
          </div>
        </div>
        <!-- End Column -->

        <div class="col">
          <div class="border-bottom mb-2">
            <h5 class="font-weight-lighter">Next Of Kin #2</h5>
          </div>
          <div class="form-group">
            <div class="">
              <label for="validationInfo_01" class="font-size-15 font-weight-light">Full Name</label>
            </div>
            <div class="">
              <input class="form-control rounded-0 div-details" placeholder="Full Name" id="validationInfo_04"
                v-model="form.lname" type="text" value="" :class="{ 'is-invalid': submitted && $v.form.lname.$error }" />
              <div v-if="submitted && $v.form.lname.$error" class="invalid-feedback">
                <span v-if="!$v.form.lname.required">This value is required.</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="">
              <label for="validationInfo_05" class="font-size-15 font-weight-light">ID Number</label>
            </div>
            <div class="">
              <input class="form-control rounded-0 div-details" placeholder="ID Number" id="validationInfo_05"
                v-model="form.id_number" type="text" value=""
                :class="{ 'is-invalid': submitted && $v.form.id_number.$error }" />
              <div v-if="submitted && $v.form.id_number.$error" class="invalid-feedback">
                <span v-if="!$v.form.id_number.required">This value is required.</span>
                <span v-if="!$v.form.id_number.numeric">Wrong value, use ONLY number</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="">
              <label for="validationInfo_01" class="font-size-15 font-weight-light">Phone Number</label>
            </div>
            <div class="">
              <input class="form-control rounded-0 div-details" placeholder="Phone Number" id="validationInfo_01"
                v-model="form.phone_number" type="text" value=""
                :class="{ 'is-invalid': submitted && $v.form.phone_number.$error }" />
              <div v-if="submitted && $v.form.phone_number.$error" class="invalid-feedback">
                <span v-if="!$v.form.phone_number.required">This value is required.</span>
                <span v-if="!$v.form.phone_number.numeric">Wrong value, use ONLY number</span>
              </div>
            </div>
          </div>
        </div>
        <!-- /End column inside form -->
      </div>
      <!-- End row -->
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
</template>