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
  height: 2.4em;
  font-weight: lighter;
  font-size: smaller;
}
</style>
<script>
import {
  required,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      // For the button
      busy: false,
      timeout: null,

      typeform: {
        signeddoc: "",

      },
      typesubmit: false
    }
  },
  validations: {
    typeform: {
      signeddoc: { required },
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
          <span class="d-flex"><i class="ri-thumb-up-fill mr-1"></i></span> Signed Document upload
        </h4>
      </div>
      <form action="" class="form-fluid" @submit.prevent="typeForm">
        <div class="row">
          <div class="col">
            <h6 class="d-flex justify-content-start align-items-center font-weight-lighter mb-0 pb-0">
              After completing the above two sections, generate the refund form, review then sign and upload.
            </h6>
            <div class="row no-gutters">
              <div class="col-xsm-4 mb-2 mt-2">
                <button class="btn btn-sm d-flex align-items-center text-light" style="background-color: maroon;"><i
                    class="ri-arrow-down-circle-fill d-flex align-items-center mr-1"></i>Generate Refund Form</button>
              </div>
            </div>

            <!-- Attachments -->
            <div class=" border-bottom mt-3 mb-3 d-flex align-items-center">
              <h4 class="d-flex" style="color: #4A2A;">
                <span class="d-flex"><i class="ri-attachment-fill mr-1"></i></span> Attachments
              </h4>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="validation01" class="font-size-15 font-weight-light">Signed Refund Form:</label>
              </div>
              <div class="col-lg-8">
                <input type="file" id="validation01" class="form-control rounded-0 div-details" v-on:change="typeform.signeddoc" value="signedDoc"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.signeddoc.$error }">
                  <div v-if="typesubmit && $v.typeform.signeddoc.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.signeddoc.required">This value is required.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row no-gutters mt-2">
          <div class="col d-flex justify-content-end">
            <b-overlay :show="busy" rounded opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block"
              @hidden="onHidden">
              <b-button ref="button"
                class="text-uppercase btn btn-success btn-sm d-flex align-items-center justify-content-center mt-1"
                :disabled="busy" variant="primary" type="submit">
                <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE
              </b-button>
            </b-overlay>
            <!-- <button class="btn btn-sm btn-success d-flex align-items-center mr-2">
              <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE</button> -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
