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
import { productFunctions } from "../../../../../api/product.service";
//import axios from "axios";
// import vue2Dropzone from "vue2-dropzone";
import {
  required,

} from "vuelidate/lib/validators";
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
        projlocation: "",
        keyword: ""
      },
      typesubmit: false
    }
  },
  validations: {
    typeform: {
      projlocation: { required },
      keyword: { required },
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
      } else {
        productFunctions.productInfo(this.typeform)
      }
    }
  }
}
</script>
<template>
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom">
        <h4 class="d-flex text-capitalize">
          <span><i class="ri-more-2-line mr-1"></i></span> More informarion
        </h4>
        <p class="ml-4">Fill in all inforamtion below</p>
      </div>
      <form class="form-fluid" action="#" @submit.prevent="typeForm">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label for="formval" class="font-size-15 font-weight-light">Project location on map</label>
              <!-- </div>
                <div class="col-lg-8"> -->
              <input id="formval" placeholder="" class="form-control rounded-0 div-details"
                v-model="typeform.projlocation" type="text" value="location"
                :class="{ 'is-invalid': typesubmit && $v.typeform.projlocation.$error }">
              <div v-if="typesubmit && $v.typeform.projlocation.$error" class="invalid-feedback">
                <span v-if="!$v.typeform.projlocation.required">This value is required.</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label for="formval1" class="font-size-15 font-weight-light">Key word</label>
              <!-- </div>
                <div class="col-lg-8"> -->
              <input id="formval1" placeholder="" class="form-control rounded-0 div-details" v-model="typeform.keyword"
                type="text" value="keyWord" :class="{ 'is-invalid': typesubmit && $v.typeform.keyword.$error }">
              <div v-if="typesubmit && $v.typeform.keyword.$error" class="invalid-feedback">
                <span v-if="!$v.typeform.keyword.required">This value is required.</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col">
            <div class="tab-pane" id="product-img">
              <h4 class="card-title">Project Map</h4>
              <p class="card-title-desc">Upload Map </p>
              <vue-dropzone id="dropzone" ref="myVueDropzone" :use-custom-slot="true" :options="dropzoneOptions">
                <div class="dropzone-custom-content">
                  <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                  <h4>Drop files here or click to upload.</h4>
                </div>
              </vue-dropzone>
            </div>
          </div>
        </div> -->
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
