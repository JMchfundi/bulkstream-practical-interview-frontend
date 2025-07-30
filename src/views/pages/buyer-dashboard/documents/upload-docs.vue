<style scoped>
.sup-docs {
  height: 4em;
}

.div-details {
  color: #000;
  font-size: smaller;
  padding: 0.3em 0 0.3em 0.8em;
  font-weight: lighter;
}

select:focus {
  border: 1px solid #4CB1F6;
}

.choose-file {
  line-height: 1.2em;
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "../../../layouts/main";
import { documentsFunctions } from '@/api/doc.service';
import {
  required,
} from "vuelidate/lib/validators";

export default {
  components: {
    PageHeader,
    Layout
  },
  data() {
    return {
      // For the button
      busy: false,
      timeout: null,

      title: 'My Documents',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Upload Documents',
          active: true
        },

      ],
      form: {
        doctype: "",
        file: [],
      },
      submitted: false,
    }
  },
  validations: {
    form: {
      doctype: { required },
      file: { required },
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
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;
      this.onClick();
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.busy = false
        return;
      }
      else {
        documentsFunctions.uploadDocument(this.form)
      }

    },
    fileSelect(event) {
      this.form.file = event.target.files
      // console.log(this.form.file.name)
    }
  }
}
</script>
<template>
  <Layout>
    <div class="main">
      <PageHeader :title="title" :items="items" />
      <hr class="mt-0">
      <div class="card">
        <div class="card-body">
          <hr class="mt-0">
          <div class="row no-gutters sup-docs d-flex align-items-center"
            style="background-color: rgb(220, 236, 241); height: 4em;">
            <div class="col-lg-8">
              <div class="d-flex justify-content-start">
                <div class="">
                  <h3 class="font-weight-bold d-flex align-items-center ml-2">
                    <span class="font-size-24 d-flex">
                      <i class="ri-file-upload-line mr-1"></i>
                    </span>Upload Document
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <form action="#" class="needs-validation" @submit.prevent="formSubmit">
            <div class="row no-gutters">
              <div class="col">
                <div class="form-group">
                  <label for="validation01" class="font-weight-lighter mt-0 mb-0 pt-3 pb-2">Document Type</label>
                  <select class="w-100 form-control rounded-0  div-details" d="validationInfo_01" v-model="form.doctype"
                    type="text" :class="{ 'is-invalid': submitted && $v.form.doctype.$error }">
                    <option value="">Select...</option>
                    <option value="card">ID Card</option>
                    <option value="pin">KRA Pin</option>
                    <option value="spouseid">Spouse ID</option>
                    <option value="spousepin">Spouse KRA Pin</option>
                    <option value="cert">Marriage Certificate</option>
                    <option value="birthcert">Birth Certificate</option>
                    <option value="divorce">Divorce Certificate</option>
                    <option value="death">Death Certificate</option>
                    <option value="proof">Proof Residence</option>
                  </select>
                  <div v-if="submitted && $v.form.doctype.$error" class="invalid-feedback">
                    <span v-if="!$v.form.doctype.required">This value is required.</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label for="docUpload" class="font-weight-lighter mt-0 mb-0 pt-2 pb-2">Attach Document (Accepts PDF Files
                  Only)</label>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="custom-file">
                  <input id="validate1" @change="fileSelect" type="file" class="form-control rounded-0 div-details"
                    placeholder="" value="projName" accept="application/pdf"
                    :class="{ 'is-invalid': submitted && $v.form.file.$error }">
                  <div v-if="submitted && $v.form.file.$error" class="invalid-feedback">
                    <span v-if="!$v.form.file.required">This value is required.</span>
                  </div>
                  <!-- <label class="custom-file-label " for="customFile">Choose file</label> -->
                </div>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col">
                <b-overlay :show="busy" rounded opacity="0.6" spinner-small spinner-variant="primary"
                  class="d-inline-block w-100" @hidden="onHidden">
                  <b-button ref="button"
                    class="text-uppercase btn btn-info btn-sm d-flex align-items-center justify-content-center mt-1 w-100"
                    :disabled="busy" variant="primary" type="submit">
                    <i class="ri-upload-cloud-2-line pr-1"></i>
                    Upload document
                  </b-button>
                </b-overlay>
                <!-- <button
                  class="text-uppercase btn btn-info btn-sm d-flex align-items-center justify-content-center mt-1 w-100"><i
                    class="ri-upload-cloud-2-line pr-1"></i>Upload document</button> -->
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>
