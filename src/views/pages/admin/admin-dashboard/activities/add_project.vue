<style>

</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "../../../../layouts/main";

import Multiselect from "vue-multiselect";
import vue2Dropzone from "vue2-dropzone";

import { FormWizard, TabContent } from "vue-form-wizard";

import {
  required,
  // email,
  // minLength,
  // sameAs,
  // maxLength,
  // minValue,
  // maxValue,
  // numeric,
  // url,
  // alphaNum
} from "vuelidate/lib/validators";

export default {
  components: {
    PageHeader,
    Layout,
    vueDropzone: vue2Dropzone,
    FormWizard,
    TabContent,
    Multiselect

  },

  data() {
    return {
      title: 'Add project',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'Add project',
          active: true
        },

      ],
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
      form: {
        fname: "",
        lname: "",
        city: "",
        state: "",
        zipcode: ""
      },
      submitform: false,
    };
  },
  validations: {
    form: {
      fname: { required },
      lname: { required },
      city: { required },
      state: { required },
      zipcode: { required }
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
    },
  }
};
</script>
<template>
  <Layout>
    <div class="main">
      <PageHeader :title="title" :items="items" />
      <hr class="mt-0">
      <div class="row">
        <div class="col">
          <div class="sup-docs d-flex align-items-center" style="background-color: rgb(220, 236, 241); height: 5em;">
            <h5 class="ml-2 text-capitalize">Steps to add project</h5>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <form-wizard color="#5664d2" action="#" class="needs-validation" @submit.prevent="formSubmit">
                <tab-content title="Basic Info" :selected="true">
                  <div class="tab-pane" id="basic-info">
                    <h4 class="card-title">Basic Information</h4>
                    <p class="card-title-desc">Fill all information below</p>
                    <form>
                      <div class="form-group">
                        <label for="validationTooltip01">Project Name</label>
                        <input name="" type="text" class="form-control" id="validationCustom01" placeholder="First name"
                          value="Mark" :class="{ 'is-invalid': submitted && $v.form.fname.$error }" />
                          <div v-if="submitted && $v.form.fname.$error" class="invalid-feedback">
                      <span v-if="!$v.form.fname.required">This value is required.</span>
                    </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="manufacturername">Constructors Name</label>
                            <input id="manufacturername" name="manufacturername" type="text"
                              class="form-control rounded-0" />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="manufacturerbrand">Project Address</label>
                            <input id="manufacturerbrand" name="manufacturerbrand" type="text"
                              class="form-control rounded-0" />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="form-group rounded-0">
                            <label class="control-label">House Typologies</label>
                            <multiselect v-model="value"
                              :options="['Bedsitter', 'One Bedroom', 'Two Bedrooms', 'Three Bedrooms']"></multiselect>
                          </div>
                        </div>

                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="manufacturerbrand">Size in Square(Km)</label>
                            <input id="manufacturerbrand" name="manufacturerbrand" type="text"
                              class="form-control rounded-0" />
                          </div>
                        </div>

                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="price">Number Of units</label>
                            <input id="price" name="price" type="text" class="form-control rounded-0" />
                          </div>
                        </div>

                        <div class="col-lg-4">
                          <div class="form-group">
                            <label for="price">Price</label>
                            <input id="price" name="price" type="text" class="form-control rounded-0" />
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="productdesc">Project Amenity Description</label>
                        <textarea class="form-control rounded-0" id="productdesc" rows="5"></textarea>
                      </div>
                    </form>
                  </div>
                </tab-content>
                <tab-content title="Location">
                  <div class="tab-pane" id="metadata">
                    <h4 class="card-title">More infomation</h4>
                    <p class="card-title-desc">Fill in all information below</p>

                    <form>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="metatitle">Project Location On Map</label>
                            <input id="metatitle" name="metatitle" type="text" class="form-control" />
                          </div>
                        </div>

                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="metakeywords">Keyword</label>
                            <input id="metakeywords" name="metakeywords" type="text" class="form-control" />
                          </div>
                        </div>
                      </div>

                      <div class="tab-pane" id="product-img">
                        <h4 class="card-title">Project Map</h4>
                        <p class="card-title-desc">Upload Map </p>
                        <vue-dropzone id="dropzone" ref="myVueDropzone" :use-custom-slot="true"
                          :options="dropzoneOptions">
                          <div class="dropzone-custom-content">
                            <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                            <h4>Drop files here or click to upload.</h4>
                          </div>
                        </vue-dropzone>
                      </div>
                      <!-- <div class="form-group">
                      <label for="metadescription">Project Amenity Description</label>
                      <textarea class="form-control" id="metadescription" rows="5"></textarea>
                    </div> -->
                    </form>

                    <div class="text-center mt-4">
                      <button type="submit" class="btn btn-primary mr-2 waves-effect waves-light">Save Changes</button>
                      <button type="submit" class="btn btn-light waves-effect">Cancel</button>
                    </div>
                  </div>
                </tab-content>
                <tab-content title="Project Img">
                  <div class="tab-pane" id="product-img">
                    <h4 class="card-title">Project Images</h4>
                    <p class="card-title-desc">Upload project image</p>
                    <vue-dropzone id="dropzone" ref="myVueDropzone" :use-custom-slot="true" :options="dropzoneOptions">
                      <div class="dropzone-custom-content">
                        <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                        <h4>Drop files here or click to upload.</h4>
                      </div>
                    </vue-dropzone>
                  </div>
                </tab-content>
              </form-wizard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>