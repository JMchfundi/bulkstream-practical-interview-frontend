<style>
.fa-google {
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.eye-con {
  bottom: 2%;
  right: 0;
  padding: .36em;

}
.fonnt_color{
  color:   #1E75CC;

}
.backkground{
  /* background-color: #282C35 */
  background-color: #4D4D4D

;
}
</style>
<script>
import { required, email } from "vuelidate/lib/validators";
// import headerVue from "@/EstateAgency/components/header.vue";
// import footerVue from "@/EstateAgency/components/footer.vue";

import {
  authMethods,
  authFackMethods,
  notificationMethods
} from "@/state/helpers";


export default {
  components: {
    // headerVue,
    // footerVue
},
  inject: ['mySpinner'],

  data() {
    return {
      email: "admin@tucode.co.ke",
      password: "Password@2906",
      submitted: false,

      // For show and hide password
      inputTypeIcon: "password",

    };
  },

  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    toggleInputIcon() {
      this.inputTypeIcon = this.inputTypeIcon === "password" ? "text" : "password";
    },

    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          this.tryingToLogIn = true;
          // Reset the authError if it existed.
          this.authError = null;
          return (
            this.logIn({
              email: this.email,
              password: this.password
            })
              // eslint-disable-next-line no-unused-vars
              .then(token => {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                // Redirect to the originally requested page, or to the home page
                this.$router.push(
                  this.$route.query.redirectFrom || { name: "home" }
                );
              })
              .catch(error => {
                this.tryingToLogIn = false;
                this.authError = error ? error : "";
                this.isAuthError = true;
              })
          );
        } else {
          const { email, password } = this;
          if (email && password) {

            this.login({ email, password });
            
          }
        }
      }
    }
  }
};
</script>

<template>
  <body>
    <!-- <headerVue/> -->
    <div class="" style="">
    <!-- <BtnLoader/> -->
    <!-- <BTNSPINNER/> -->
    <!-- <BtnSubmit/> -->
    <div class="min-vh-100" style="padding-top: 150px;">
      <div class="container-fluid">
        <div class="row no-gutters d-flex justify-content-center">
          <div class="col-lg-4 bg-light rounded-bottom">
            <div class="d-flex align-items-center ">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <p class="text-capitalize text-center mt-2 font-size-24 fonnt_color">TRES - Finsis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row no-gutters justify-content-center mt-2">
          <div class="col-lg-4 bg-light rounded" style="z-index: 9;">
            <div class="mt-3">
              <div class="w-100">
              <div class="row no-gutters justify-content-center">
                <div class="col-lg-9">
                  <div class="pb-2">
                    <div class="text-center">
                        <h4 class="font-size-18">Welcome Back !</h4>
                        <p class="text-muted">Sign in to continue.</p>
                      </div>
                      <b-alert variant="danger" class="" v-if="notification.message" show dismissible>{{
                        notification.message
                      }}
                      </b-alert>
                      <div class="p-1">
                        <form class="form-horizontal" @submit.prevent="tryToLogIn();mySpinner()">
                          <div class="form-group auth-form-group-custom mb-3">
                            <i class="ri-mail-line auti-custom-input-icon text-muted"></i>
                            <label for="email">Email Address</label>
                            <input type="email" v-model="email" class="form-control rounded-0" id="email"
                              placeholder="Enter email" :class="{ 'is-invalid': submitted && $v.email.$error }" />
                            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                              <span v-if="!$v.email.required">Email is required.</span>
                              <span v-if="!$v.email.email">Please enter valid email.</span>
                            </div>
                          </div>

                          <div class="form-group auth-form-group-custom mb-3">
                            <i class="ri-lock-2-line auti-custom-input-icon text-muted"></i>
                            <label for="userpassword">Password</label>
                            <input v-model="password" :type="inputTypeIcon" class="form-control rounded-0"
                              id="userpassword" placeholder="Enter password"
                              :class="{ 'is-invalid': submitted && $v.password.$error }" />
                            <button @click.prevent="toggleInputIcon"
                              class="input-group-text eye-con rounded-0 position-absolute font-size-24">
                              <span v-if="inputTypeIcon == 'password'">
                                <i class="ri-eye-line "></i>
                              </span>
                              <span v-else>
                                <i class="ri-eye-off-line"></i>
                              </span>
                            </button>
                            <div v-if="submitted && !$v.password.required" class="invalid-feedback">Password is
                              required.</div>
                          </div>
                          <!-- row with remember me and forgot password -->
                          <div class="row">
                            <div class="col">
                              <div class="custom-control custom-checkbox ">
                                <input type="checkbox" class="custom-control-input" id="customControlInline" />
                                <label class="custom-control-label" for="customControlInline">Remember me</label>
                              </div>
                            </div>
                            <!-- <div class="col">
                              <div class="text-center">
                                <router-link tag="a" to="/forgot-password">
                                  <i class="mdi mdi-lock text-muted"></i>Forgot password?
                                </router-link>
                              </div>
                            </div> -->
                          </div>
                          <!-- row with login and create account -->
                          <div class="row">
                            <div class="col">
                              <div class="mt-2 text-center">
                                <button class="btn btn-sm btn-info w-md waves-effect waves-light rounded-pill"
                                  type="submit">
                                  Login Now
                                </button>
                              </div>
                            </div>
                            <!-- <div class="col">
                              <div class="mt-2 text-center"></div>
                              <button class="btn btn-primary btn-sm w-md waves-effect waves-light rounded-pill"
                                type="submit">
                                <router-link tag="a" to="/register" class="font-weight-medium text-light">Create
                                  Account</router-link>
                              </button>
                            </div> -->
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <footerVue></footerVue> -->
      </div>
    </div>
  </div>
  </body>
 </template>
