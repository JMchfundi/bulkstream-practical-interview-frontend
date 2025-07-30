<style scoped>
.countries-cities {
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;

  .select-box {
    height: 40px;
    min-width: 300px;
    background: #fff;
    border: 1px solid #e9e9e9;
    position: relative;

    select {
      background: none;
      border: none;
      outline: none;
      padding-left: 7px;
      padding-right: 65px;
      appearance: none;
      width: 100%;
      height: 100%;
    }

    svg {
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      height: 100%;
      background: darken(#fff, 3%);
      pointer-events: none;
      box-sizing: border-box;
      padding: 5px;

      path {
        fill: rgba(black, .7);
      }
    }
  }
}

.sup-docs {
  height: 4em;

}

.div-details {
  color: #000;
  font-size: smaller;
  padding: 0.3em 0 0.3em 0.8em;
  font-weight: lighter;
}

select:focus,
input[type=text]:focus,
textarea:focus,
input[type=number]:focus {
  outline: none !important;
  border: 1px solid #4CB1F6;
}

/* input:focus {
  border: 1px solid #4CB1F6;
} */
.choose-file {
  line-height: 1.2em;
}
</style>
<script>
// import PageHeader from "@/components/page-header";
// import Layout from "../../../layouts/main";
// import { documentsFunctions } from '@/api/doc.service';
import { productFunctions } from "@/api/product.service";
// import vueCountriesCities from "vue-countries-cities";
import {
  required,
  // email,
  // minLength,
  maxLength,
  // minValue,
  // maxValue,
  numeric,
  // alphaNum
} from "vuelidate/lib/validators";

export default {
  components: {
    // PageHeader,
    // Layout
    // vueCountriesCities
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
      selectedCountry: '',
      selectedCity: '',
      form: {
        housename: "",
        phoneNo: "",
        country: "",
        city: "",
        street: "",
        distance: "",
        maxlength: "",
        constname: "",
        projaddress: "",
        housetype: "",
        sizeinsqkm: "",
        numofunits: "",
        price: "",
        projdescription: "",
        projlocation: "",
        keyword: "",
        user_signature: "",
        file: [],
      },

      submitted: false,
    }
  },
  validations: {
    form: {
      housename: { required },
      constname: { required },
      country: { required },
      city: { required },
      street: { required },
      distance: { required },
      maxlength: { required, maxLength: maxLength(9) },
      projaddress: { required },
      phoneNo: { required, numeric },
      housetype: { required },
      sizeinsqkm: { required, numeric },
      numofunits: { required, numeric },
      price: { required, numeric },
      projdescription: { required },
      projlocation: { required },
      keyword: { required },
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
        productFunctions.productInfo(this.form)
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
      <b-card no-body class="mb-1 border-3 border-top border-success">
        <b-card-header header-tag="header" role="tab" class="accordionTitle accordion__Heading">
          <h6 class="m-0 text-uppercase d-flex">
            <a v-b-toggle.accordion-1 class="text-success w-100 d-flex align-items-center justify-content-between ml-1"
              href="javascript: void(0);">
              New Client Parameters
              <span class="text-right"><i class="ri-information-fill p-icon"></i></span>
            </a>
          </h6>
          <div class="card">
            <div class="card-body">
              <form action="#" class="needs-validation" @submit.prevent="formSubmit">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <!-- <vueCountriesCities @country='selectedCountry = $event' @city='selectedCity = $event'/> -->
                      <label for="validate2" class="font-size-15 font-weight-light">Country </label>
                      <input id="validate2" v-model="form.country" type="text"
                        class="form-control rounded-0 div-details" placeholder="" value="country"
                        :class="{ 'is-invalid': submitted && $v.form.country.$error }">
                      <div v-if="submitted && $v.form.country.$error" class="invalid-feedback">
                        <span v-if="!$v.form.country.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate3" class="font-size-15 font-weight-light">City</label>
                      <input id="validate3" placeholder="" class="form-control rounded-0 div-details"
                        v-model="form.city" type="text" value="city"
                        :class="{ 'is-invalid': submitted && $v.form.city.$error }">
                      <div v-if="submitted && $v.form.city.$error" class="invalid-feedback">
                        <span v-if="!$v.form.city.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate1" class="font-size-15 font-weight-light">Phone Number</label>
                      <input id="validate1" v-model="form.maxlength" type="number"
                        class="form-control rounded-0 div-details" placeholder="" value="phoneNo"
                        :class="{ 'is-invalid': submitted && $v.form.maxlength.$error }">
                      <div v-if="submitted && $v.form.maxlength.$error" class="invalid-feedback">
                        <span v-if="!$v.form.maxlength.required">This field is required.</span>
                        <span v-if="!$v.form.maxlength.maxLength">Values should not exceed 9 digits.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate0" class="font-size-15 font-weight-light">Street(Road)</label>
                      <input id="validate0" v-model="form.street" type="text" class="form-control rounded-0 div-details"
                        placeholder="e.g, Jane Doe Street or Road" value="projName"
                        :class="{ 'is-invalid': submitted && $v.form.street.$error }">
                      <div v-if="submitted && $v.form.street.$error" class="invalid-feedback">
                        <span v-if="!$v.form.street.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate4" class="font-size-15 font-weight-light">Distance from Center(Km)</label>
                      <input type="text" id="validate4" placeholder="" class="form-control rounded-0 div-details"
                        v-model="form.distance" value="size"
                        :class="{ 'is-invalid': submitted && $v.form.distance.$error }">
                      <div v-if="submitted && $v.form.distance.$error" class="invalid-feedback">
                        <span v-if="!$v.form.distance.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate4" class="font-size-15 font-weight-light">Physical Address</label>
                      <input type="text" id="validate4" placeholder="e.g, Village or Colony"
                        class="form-control rounded-0 div-details" v-model="form.distance" value="size"
                        :class="{ 'is-invalid': submitted && $v.form.distance.$error }">
                      <div v-if="submitted && $v.form.distance.$error" class="invalid-feedback">
                        <span v-if="!$v.form.distance.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate6" class="font-size-15 font-weight-light">Street Code</label>
                      <input placeholder="e.g, 36 New York" class="form-control rounded-0 div-details" id="validate6"
                        v-model="form.numofunits" type="text" value="userPhone"
                        :class="{ 'is-invalid': submitted && $v.form.numofunits.$error }">
                      <div v-if="submitted && $v.form.numofunits.$error" class="invalid-feedback">
                        <span v-if="!$v.form.numofunits.required">This field is required.</span>
                      </div>

                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate0" class="font-size-15 font-weight-light">House Name</label>
                      <input id="validate0" v-model="form.housename" type="text"
                        class="form-control rounded-0 div-details" placeholder="" value="projName"
                        :class="{ 'is-invalid': submitted && $v.form.housename.$error }">
                      <div v-if="submitted && $v.form.housename.$error" class="invalid-feedback">
                        <span v-if="!$v.form.housename.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate4" class="font-size-15 font-weight-light">Size in square(Km)</label>
                      <input type="text" id="validate4" placeholder="" class="form-control rounded-0 div-details"
                        v-model="form.sizeinsqkm" value="size"
                        :class="{ 'is-invalid': submitted && $v.form.sizeinsqkm.$error }">
                      <div v-if="submitted && $v.form.sizeinsqkm.$error" class="invalid-feedback">
                        <span v-if="!$v.form.sizeinsqkm.required">This field is required.</span>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 ">
                    <div class="form-group">
                      <label for="validate5" class="control-label font-weight-light font-size-15">House
                        Typologies</label>
                      <select id="validate5" class="form-control rounded-0 div-details" v-model="form.housetype"
                        type="text" :class="{ 'is-invalid': submitted && $v.form.housetype.$error }">
                        <option value="">Press enter to select</option>
                        <option value="bedsit">Bed Sitter</option>
                        <option value="onebed">One bedroom</option>
                        <option value="twobed">Two bedrooms</option>
                        <option value="threebed">Three bedrooms</option>
                      </select>
                      <div v-if="submitted && $v.form.housetype.$error" class="invalid-feedback">
                        <span v-if="!$v.form.housetype.required">This field is required.</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate6" class="font-size-15 font-weight-light">Number Of units</label>
                      <input placeholder="" class="form-control rounded-0 div-details" id="validate6"
                        v-model="form.numofunits" type="number" value="userPhone"
                        :class="{ 'is-invalid': submitted && $v.form.numofunits.$error }">
                      <div v-if="submitted && $v.form.numofunits.$error" class="invalid-feedback">
                        <span v-if="!$v.form.numofunits.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="validate7" class="font-size-15 font-weight-light">Price</label>
                      <input placeholder="0.00" id="validate7" class="form-control rounded-0 div-details"
                        v-model="form.price" type="number" value="amount"
                        :class="{ 'is-invalid': submitted && $v.form.price.$error }">
                      <div v-if="submitted && $v.form.price.$error" class="invalid-feedback">
                        <span v-if="!$v.form.price.required">This field is required.</span>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="form-group">
                      <label for="validate9" class="font-size-15 font-weight-light">Project amenity description(More
                        details
                        about
                        the house including offers)</label>
                      <textarea class="form-control rounded-0 div-details" id="validate9" v-model="form.projdescription"
                        value="description" :class="{ 'is-invalid': submitted && $v.form.projdescription.$error }"
                        rows="5">
                </textarea>
                      <div v-if="submitted && $v.form.projdescription.$error" class="invalid-feedback">
                        <span v-if="!$v.form.projdescription.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="formval" class="font-size-15 font-weight-light">Project location on map</label>

                      <input id="formval" placeholder="" class="form-control rounded-0 div-details"
                        v-model="form.projlocation" type="text" value="location"
                        :class="{ 'is-invalid': submitted && $v.form.projlocation.$error }">
                      <div v-if="submitted && $v.form.projlocation.$error" class="invalid-feedback">
                        <span v-if="!$v.form.projlocation.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label for="formval1" class="font-size-15 font-weight-light">Land Mark</label>
                      <input id="formval1" placeholder="" class="form-control rounded-0 div-details"
                        v-model="form.keyword" type="text" value="keyWord"
                        :class="{ 'is-invalid': submitted && $v.form.keyword.$error }">
                      <div v-if="submitted && $v.form.keyword.$error" class="invalid-feedback">
                        <span v-if="!$v.form.keyword.required">This field is required.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="docUpload" class="font-weight-lighter mt-0 mb-0 pt-2 pb-2">Attach images (Accepts Image
                      Files
                      Only)</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="custom-file">
                      <input id="validate10" @change="fileSelect" type="file" multiple="multiple"
                        class="form-control rounded-0 div-details" placeholder="" value="projName" accept="image/*"
                        :class="{ 'is-invalid': submitted && $v.form.file.$error }">
                      <div v-if="submitted && $v.form.file.$error" class="invalid-feedback">
                        <span v-if="!$v.form.file.required">This field is required.</span>
                      </div>
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
                        Upload House
                      </b-button>
                    </b-overlay>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </b-card-header>
      </b-card>
    </div>
  </Layout>
</template>
