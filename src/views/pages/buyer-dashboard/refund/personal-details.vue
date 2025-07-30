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

.choose-file {
  line-height: 1.2em;
}
</style>
<script>
import axios from "axios";
import {
  required,
  email,
  minLength,
  sameAs,
  numeric,
  url,
  alphaNum
} from "vuelidate/lib/validators";
import { userService } from "../../../../api/user.service";
export default {
  data() {
    return {
      // For the button
      busy: false,
      timeout: null,
      // formdetails: [],
      typeform: {
        username: "",
        personal_Info: {
          id_number: "",
          kra_pin: "",
          phone_number: "",
          email: ""
        },
        amount: "",
        reason: "",
        iddoc: "",
        kradoc: "",

        password: "",
        confirmPassword: "",
        url: "",
        digit: "",

      },
      typesubmit: false
    }
  },
  validations: {
    typeform: {
      username: { required },
      personal_Info: {
        id_number: { required, numeric },
        kra_pin: { required, alphaNum },
        phone_number: { required, numeric },
        email: { required, email }
      },
      amount: { required, numeric },
      reason: { required },
      iddoc: { required },
      kradoc: { required },

      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
      url: { required, url },

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
        console.log(this.typeform)
        this.busy = false
        return;
      }
    }
  },
  mounted() {
    // Set the initial number of items
    var user = JSON.parse(localStorage.getItem("user"));
    axios.get(userService.API_URL + "get_user?email=" + user.email).then(response => {
      this.typeform = response.data
    })
  },
}
</script>
<template>
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom mt-3 mb-3 d-flex align-items-center">
        <h4 class="d-flex text-capitalize" style="color: #FFA500;">
          <span class="d-flex"><i class="ri-account-pin-circle-fill mr-1"></i></span> personal details
        </h4>
      </div>
      <form class="form-fluid" action="#" @submit.prevent="typeForm">
        <div class="row">
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation1" class="font-size-15 font-weight-light">Name</label>
              </div>
              <div class="col-lg-8">
                <input id="validation1" v-model="typeform.username" type="text" class="form-control rounded-0 div-details"
                  :placeholder="`${typeform.username}`"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.username.$error }">
                <div v-if="typesubmit && $v.typeform.username.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.username.required">This value is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation2" class="font-size-15 font-weight-light">ID Number</label>
              </div>
              <div class="col-lg-8">
                <input id="validation2" v-model="typeform.personal_Info.id_number" type="text"
                  class="form-control rounded-0 div-details" :placeholder="`${typeform.personal_Info.id_number}`"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.personal_Info.id_number.$error }">
                <div v-if="typesubmit && $v.typeform.personal_Info.id_number.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.personal_Info.id_number.required">This value is required.</span>
                  <span v-if="!$v.typeform.personal_Info.id_number.numeric">Wrong value, use ONLY number.</span>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation3" class="font-size-15 font-weight-light">KRA PIN Number</label>
              </div>
              <div class="col-lg-8">
                <input type="text" id="validation3" :placeholder="`${typeform.personal_Info.kra_pin}`"
                  class="form-control rounded-0 div-details" v-model="typeform.personal_Info.kra_pin"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.personal_Info.kra_pin.$error }">
                <div v-if="typesubmit && $v.typeform.personal_Info.kra_pin.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.personal_Info.kra_pin.required">This value is required.</span>
                  <span v-if="!$v.typeform.personal_Info.kra_pin.alphaNum">This value should be alphanumeric.</span>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation4" class="font-size-15 font-weight-light">Phone Number</label>
              </div>
              <div class="col-lg-8 ">
                <input :placeholder="`${typeform.personal_Info.phone_number}`" class="form-control rounded-0 div-details"
                  v-model="typeform.personal_Info.phone_number" type="text"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.personal_Info.phone_number.$error }">
                <div v-if="typesubmit && $v.typeform.personal_Info.phone_number.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.personal_Info.phone_number.required">This value is required.</span>
                  <span v-if="!$v.typeform.personal_Info.phone_number.numeric">Wrong value, use ONLY digit.</span>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation5" class="font-size-15 font-weight-light">Email Address</label>
              </div>
              <div class="col-lg-8 ">
                <input :placeholder="`${typeform.personal_Info.email}`" class="form-control rounded-0 div-details"
                  v-model="typeform.personal_Info.email" type="text"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.personal_Info.email.$error }">
                <div v-if="typesubmit && $v.typeform.personal_Info.email.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.personal_Info.email.required">This value is required.</span>
                  <span v-if="!$v.typeform.personal_Info.email.email">Wrong value, value MUST be email .</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation6" class="font-size-15 font-weight-light">Refund Amount</label>
              </div>
              <div class="col-lg-8 ">
                <input placeholder="0.00" class="form-control rounded-0 div-details" v-model="typeform.amount" type="text"
                  value="amount" :class="{ 'is-invalid': typesubmit && $v.typeform.amount.$error }">
                <div v-if="typesubmit && $v.typeform.amount.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.amount.required">This value is required.</span>
                  <span v-if="!$v.typeform.amount.numeric">Wrong value, use ONLY digits.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation7" class="font-size-15 font-weight-light">Reason for refund</label>
              </div>
              <div class="col-lg-8 ">
                <textarea class="form-control rounded-0 div-details" v-model="typeform.reason" name="textarea"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.reason.$error }" rows="2">
                        </textarea>
                <div v-if="typesubmit && $v.typeform.reason.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.reason.required">This value is required.</span>
                </div>
              </div>
            </div>

            <!-- Attachments -->
            <div class="border-bottom mt-3 mb-3 d-flex align-items-center">
              <h4 class="d-flex" style="color: #4A2A;">
                <span class="d-flex"><i class="ri-attachment-fill mr-1"></i></span> Attachments
              </h4>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation8" class="font-size-15 font-weight-light">ID Card</label>
              </div>
              <div class="col-lg-8">
                <input type="file" class="form-control rounded-0 div-details" v-on:change="typeform.iddoc" value="idDoc"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.iddoc.$error }">
                <div v-if="typesubmit && $v.typeform.iddoc.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.iddoc.required">This value is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation9" class="font-size-15 font-weight-light">KRA PIN Certificate</label>
              </div>
              <div class="col-lg-8">
                <input type="file" class="form-control rounded-0 div-details" v-on:change="typeform.kradoc" value="kraDoc"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.kradoc.$error }">
                <div v-if="typesubmit && $v.typeform.kradoc.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.kradoc.required">This value is required.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- End of row inside form -->
        <div class="row no-gutters mt-2 p-1">
          <div class="form-group col d-flex justify-content-end">
            <b-overlay :show="busy" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block"
              @hidden="onHidden">
              <b-button ref="button"
                class="text-uppercase btn btn-success btn-sm d-flex align-items-center justify-content-center mt-1"
                :disabled="busy" variant="primary" type="submit">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE
              </b-button>
            </b-overlay>
            <!-- <button href="#" class="btn btn-sm btn-success d-flex align-items-center">
                    <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE</button> -->
          </div>
        </div>
      </form>
    </div>
    
  </div>
  
  
</template>
