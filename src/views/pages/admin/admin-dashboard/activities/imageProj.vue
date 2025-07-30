<style>
.div-details {
  font-weight: lighter;
  color: #000;
  font-size: smaller;
  padding: 0.3em 0 0.3em 0.8em;
}

select,
input {
  /* outline: none; */
  height: 2.5em;
}

select:focus,
input:focus {
  border: 1px solid #4CB1F6;
}
</style>
<script>
// import Multiselect from "vue-multiselect";
// import vue2Dropzone from "vue2-dropzone";
// import axios from "axios";
import swal from "sweetalert";
import {
  required,

} from "vuelidate/lib/validators";
import { productFunctions } from '@/api/product.service';
//const API_URL = "https://ug-africana-api.azurewebsites.net/";
// const API_URL = "http://localhost/project_api/v1/";
export default {
  components: {
  // vueDropzone: vue2Dropzone,

  },
  data() {
    return {
      value: null,
      value1: null,
      options: [
        "Touchscreen",
        "Call Function",
        "Notifications",
        "Fitness",
        "Outdoor"
      ],
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      typeform: {
        projectname: "",
        file: ""
      },
      typesubmit: false
    }
  },
  validations: {
    typeform: {
      file: { required },
//      keyword: { required },
    }
  },
  methods: {
    /**
     * Validation type submit
     */
    // eslint-disable-next-line no-unused-vars
    typeForm(e) {
      this.typesubmit = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } 
      else {
        productFunctions.productImage(this.typeform)
     }
    },

    fileSelect(event) {
      this.typeform.file = event.target.files[0]
      swal({
        icon: "success",
        text: this.typeform.file.name + " file selected",
        timer: 1500,
        buttons: false,
      });
    }
  }
}
</script>
<template>
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom">
        <h4 class="d-flex text-capitalize">
          <span><i class="ri-gallery-upload-line mr-1"></i></span>Project images
        </h4>
        <p class="ml-4">Upload project images</p>
      </div>
      <form class="form-fluid" action="#" @submit.prevent="typeForm">
        <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="validate1" class="font-size-15 font-weight-light">Image Source URl</label>
                <input id="validate1" v-model="typeform.file" type="text" class="form-control rounded-0 div-details"
                  placeholder="" value="projName"
                  :class="{ 'is-invalid': typesubmit && $v.typeform.file.$error }">
                <div v-if="typesubmit && $v.typeform.file.$error" class="invalid-feedback">
                  <span v-if="!$v.typeform.file.required">This value is required.</span>
                </div>
                </div>
              </div>
            </div>
        <!-- End of row inside form -->
        <div class="row no-gutters mt-2 p-1">
          <div class="form-group col d-flex justify-content-end">
            <button href="#" class="btn btn-sm btn-success d-flex align-items-center">
              <i class="ri-save-fill mr-1"></i>SAVE & CONTINUE</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
