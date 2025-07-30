<style>
.div-details {
  font-weight: lighter;
  color: #000;
  font-size: smaller;
  padding: 0.3em 0 0.3em 0.8em;
}

input {
  outline: none;
  height: 2.5em;
}
</style>
<script>
import { profilePicFunctions } from '../../../../api/profilepic.service';
import {
  required,
} from "vuelidate/lib/validators";
import axios from 'axios';
import { userService } from '@/api/user.service';

/*Form for profile*/
export default {
  data() {
    return {
      transactionData: [],
      form: {
        update: "",
      },
      submitted: false,
    };
  },
  validations: {
    form: {
      update: { required },
    },
  },

  mounted() {
    // Set the initial number of items
    // this.totalRows = this.transactionData.length;
    this.getAfricanaData()
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
    },

    fileSelect(event) {
      this.form.update = event.target.files[0]
      profilePicFunctions.uploadProfile(this.form)
    },

    getAfricanaData(){
    var self = this
    var user = JSON.parse(localStorage.getItem("user"));

//    const url = 'https://ug-africana-api.azurewebsites.net/'
// const url = 'https://ug-africana-api.azurewebsites.net/profile_api/v1/'
// const url = 'http://localhost/profile_api/v1/'
    axios.get(userService.API_URL +"profile_api/v1/get_docs/"+user.email)
    .then(function (response) {
      // console.log(JSON.stringify(response.data[0].projectUpload.image))
      self.transactionData = response.data
      // self.image = 'data:image/png;base64,'+ btoa (this.transactionData[0].projectUpload.image);
    })
    .catch(function (error) {
      console.log(error)
    })
  },

  }
};
</script>
<template>
  <!-- Container for user documents section -->
  <div class="">
    <div class=" d-flex align-items-center justify-content-center mt-3 flex-wrap">
      <div class="user-avatar avatar-xl rounded-circle d-flex align-items-center justify-content-center p-0">
        <span class="">
            <img :src="`${ transactionData.url }`" class="rounded-circle" :width="100" :height="100"/></span>
      </div>
    </div>

    <form action="#" class="needs-validation" @submit.prevent="formSubmit">
      <div class="row no-gutters justify-content-center">
        <div class="col update_photo">
          <div class="form-group mb-0 pb-1">
            <div class="d-flex">
              <label for="customFile" class="font-weight-light font-size-13">Passport Photo (JPG,JPEG,PNG)
                Only</label>
            </div>
            <div class="input-group">
               <!-- <input type="file" class="custom-file-input" id="customFile" v-on:change="form.update" value="updateDoc" -->
              <input type="file" class="form-control rounded-0 div-details" id="customFile" @change="fileSelect" accept="image/*"
                :class="{ 'is-invalid': submitted && $v.form.update.$error }" >
              <div v-if="submitted && $v.form.update.$error" class="invalid-feedback">
                <span v-if="!$v.form.update.required">This value is required.</span>
              </div>
              <!-- <label class="custom-file-label " for="customFile">Choose file</label> -->
            </div>
          </div>
        </div>
      </div>
    </form>
   
    <div class="d-flex align-items-center justify-content-center mb-2 mt-4 border-bottom">
      <h4 class="font-weight-light text-capitalize pl-2 d-flex">
        <span class="d-flex"><i class="ri-upload-cloud-fill mr-1"></i></span>KYC documents upload
      </h4>
    </div>
    <!-- Documents upload details -->
    <div class="">
      <ul class="list-unstyled p-docs">
        <li class="">
          <span class="docs-title text-inf">ID card</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-end"><i class="ri-close-line"></i>Not -->
            <!-- uploaded</span> -->
          <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
          <!-- <a href="#" class="link-primary">Upload now</a> -->
        </li>
        <li class="upload-now">
          <span class="docs-title text-inf">KRA pin</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-end"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
        <li class="">
          <span class="docs-title text-inf">spouse ID</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-end"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
        <li class="">
          <span class="docs-title text-inf">spouse KRA pin</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-end"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
        <li class="d-flex">
          <span class="docs-title text-inf">marriage certificate</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-center"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
        <li class="">
          <span class="docs-title text-inf">birth certificate</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-center"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
        <li class="">
          <span class="docs-title text-inf">divorce certificate</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-center"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
        <li class="">
          <span class="docs-title text-inf">death certificate</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-center"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
        <li class="">
          <span class="docs-title text-inf">proof of residence</span>
          <!-- <span class="Not-uploaded d-flex align-items-center justify-content-center"><i class="ri-close-line"></i>Not
            uploaded</span> -->
            <router-link tag="a" to="/kaufer/new/doc/upload/document">
            <i class="ri-file-upload-fill text-muted mr-1"></i>Upload now
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>