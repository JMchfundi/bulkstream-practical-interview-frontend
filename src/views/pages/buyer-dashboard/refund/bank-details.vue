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
import {
  required,
  maxLength,
  numeric,
  alphaNum
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      // For the button
      busy: false,
      timeout: null,

      typeform: {
        accname: "",
        accnumber: "",
        branchname: "",
        branchcode: "",
        bankname: "",
        exibit: "",

      },
      typesubmit: false
    }
  },
  validations: {
    typeform: {
      accname: { required },
      accnumber: { required, numeric, maxLength: maxLength(10) },
      // accnumber: { required, numeric },
      branchname: { required },
      branchcode: { required, alphaNum },
      bankname: { required },
      exibit: { required }

      // password: { required, minLength: minLength(6) },

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
        this.busy = false
        return;
      }
    }
  }
}

</script>
<template>
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom mt-3 mb-3 d-flex align-items-center">
        <h4 class="d-flex text-capitalize" style="color: #FFA500;">
          <span class="d-flex">
            <i class="ri-account-pin-circle-fill mr-1"></i></span>
          Bank account details
        </h4>
      </div>
      <form action="" class="form-fluid" @submit.prevent="typeForm">
        <div class="row">
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation1" class="font-size-15 font-weight-light">Account Name</label>
              </div>
              <div class="col-lg-8">
                <input id="validation1" v-model="typeform.accname" placeholder="Account Name" value="accName" :class="{ 'is-invalid': typesubmit && $v.typeform.accname.$error }" class="form-control rounded-0 div-details">
                <div v-if="typesubmit && $v.typeform.accname.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.accname.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation2" class="font-size-15 font-weight-light">Account Number</label>
              </div>
              <div class="col-lg-8">
                <input id="validation2" v-model="typeform.accnumber" value="accNumber" placeholder="Account Number" :class="{ 'is-invalid': typesubmit && $v.typeform.accnumber.$error }" class="form-control rounded-0 div-details">
                <div v-if="typesubmit && $v.typeform.accnumber.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.accnumber.required">This value is required.</span>
                  <span v-if="!$v.typeform.accnumber.numeric">Wrong value, use ONLY number.</span>
                  <span v-if="!$v.typeform.accnumber.maxLength">This field requires a value of maximum 10 digits.</span>
                  
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation3" class="font-size-15 font-weight-light">Name of Branch</label>
              </div>
              <div class="col-lg-8">
                  <input id="validation3" v-model="typeform.branchname" value="branchName" placeholder="Name of Branch"  :class="{ 'is-invalid': typesubmit && $v.typeform.branchname.$error }" class="form-control rounded-0 div-details">
                <div v-if="typesubmit && $v.typeform.branchname.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.branchname.required">This value is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation4" class="font-size-15 font-weight-light">Branch Code</label>
              </div>
              <div class="col-lg-8 ">
                <!-- <input id="validation4" placeholder="Branch Code" class="form-control rounded-0 div-details"> -->
                <input id="validation3" v-model="typeform.branchcode" value="branchCode" placeholder="Branch Code"  :class="{ 'is-invalid': typesubmit && $v.typeform.branchcode.$error }" class="form-control rounded-0 div-details">
                <div v-if="typesubmit && $v.typeform.branchcode.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.branchcode.required">This value is required.</span>
                  <span v-if="!$v.typeform.branchcode.alphaNum">Wrong value, this value should be alphanumeric.</span>
                </div>
              </div>
            </div>

            <div>
              <div class="form-group row">
                <div class="col-lg-4">
                  <label for="validation5" class="font-size-15 font-weight-light">Name of Bank</label>
                </div>
                <div class="col-lg-8 ">
                  <!-- <input id="validation5" placeholder="Name of Bank" class="form-control rounded-0 div-details"> -->
                  <input id="validation3" v-model="typeform.bankname" value="bankName" placeholder="Name of Bank"  :class="{ 'is-invalid': typesubmit && $v.typeform.bankname.$error }" class="form-control rounded-0 div-details">
                <div v-if="typesubmit && $v.typeform.bankname.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.bankname.required">This value is required.</span>
                </div>
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
                <label for="validation6" class="font-size-15 font-weight-light">Copy of ATM Card or Cancelled Cheque</label>
              </div>
              <div class="col-lg-8">
                  <input id="validation6" type="file" v-on:change="typeform.exibit" value="exibitDoc"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.exibit.$error }" class="form-control rounded-0 div-details">
                  <div v-if="typesubmit && $v.typeform.exibit.$error" class="invalid-feedback">
                    <span v-if="!$v.typeform.exibit.required">This value is required.</span>
                  </div>
              </div>
            </div>
          </div>
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
            <!-- <button href="#" class="btn btn-sm btn-success d-flex align-items-center">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE</button> -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
