<style>
.input-group-text {
  top: 2%;
  right: 0;
  padding: .36em;
}
</style>
<script>
import { required, email } from "vuelidate/lib/validators";
import headerVue from "@/EstateAgency/components/header.vue";
import footerVue from "@/EstateAgency/components/footer.vue";

import {
  authMethods,
  authFackMethods,
  notificationMethods
} from "@/state/helpers";
export default {
  components: {
    headerVue,
    footerVue
},
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        user_signature: ""
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,

      // For show and hide password
      inputTypeIcon: "password"
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  validations: {
    user: {
      username: { required },
      email: { required, email },
      password: { required }
    }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    toggleInputIcon() {
      this.inputTypeIcon = this.inputTypeIcon === "password" ? "text" : "password";
    },
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          this.tryingToRegister = true;
          // Reset the regError if it existed.
          this.regError = null;
          return (
            this.register({
              email: this.user.email,
              password: this.user.password
            })
              // eslint-disable-next-line no-unused-vars
              .then(token => {
                this.tryingToRegister = false;
                this.isRegisterError = false;
                this.registerSuccess = true;
                if (this.registerSuccess) {
                  this.$router.push(
                    this.$route.query.redirectFrom || { name: "home" }
                  );
                }
              })
              .catch(error => {
                this.tryingToRegister = false;
                this.regError = error ? error : "";
                this.isRegisterError = true;
              })
          );
        } else {
          const { email, username, password } = this.user;
          if (email && username && password) {
            this.registeruser(new URLSearchParams(this.user));
          }
        }
      }
    }
  }
};
</script>

<template>
  <body>
  <headerVue></headerVue>
  <div class="bg-light">
    <div class="min-vh-100">
      <div class="container-fluid">
        <div class="row no-gutters d-flex justify-content-center">
          <div class="col-lg-4 bg-light shadow-lg rounded-bottom">
            <div class="d-flex align-items-center">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <p class="text-capitalize text-center mt-3 font-size-24">TRES - Finsis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row no-gutters justify-content-center mt-3">
          <div class="col-lg-4 shadow-lg bg-light rounded">
            <div class="mt-4">
              <div class="w-100">
                <div class="row no-gutters justify-content-center">
                  <div class="col-lg-9">
                    <div class="pb-2">
                      <div class="text-center">
                        <h4 class="font-size-18">Create Account</h4>
                        <p class="text-muted">Get your free account now.</p>
                      </div>
                      <b-alert v-model="registerSuccess" class="" variant="success" dismissible>Registration
                        successfull.</b-alert>

                      <b-alert v-model="isRegisterError" class="" variant="danger" dismissible>{{ regError }}</b-alert>

                      <b-alert variant="danger" class="" v-if="notification.message" show dismissible>{{
                        notification.message
                      }}</b-alert>
                      <div class="p-1">
                        <form class="form-horizontal" @submit.prevent="tryToRegisterIn">
                          <div class="form-group auth-form-group-custom enter_user">
                            <i class="ri-user-2-line auti-custom-input-icon text-muted"></i>
                            <label for="username" class="">Username</label>
                            <input v-model="user.username" type="text" class="form-control rounded-0 " id="username"
                              :class="{ 'is-invalid': submitted && $v.user.username.$error }"
                              placeholder="Enter username" />
                            <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">Username is
                              required.</div>
                          </div>
                          <div class="form-group auth-form-group-custom ">
                            <i class="ri-mail-line auti-custom-input-icon text-muted"></i>
                            <label for="useremail">Email</label>
                            <input v-model="user.email" type="email" class="form-control rounded-0" id="useremail"
                              placeholder="Enter email" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                            <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                              <span v-if="!$v.user.email.required">Email is required.</span>
                              <span v-if="!$v.user.email.email">Please enter valid email.</span>
                            </div>
                          </div>
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon text-muted"></i>
                            <label for="userpassword">Password</label>
                            <input v-model="user.password" :type="inputTypeIcon" class="form-control rounded-0"
                              id="userpassword" placeholder="Enter password"
                              :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                            <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">Password is
                              required.</div>
                            <button @click.prevent="toggleInputIcon"
                              class="input-group-text rounded-0 position-absolute font-size-24">
                              <span v-if="inputTypeIcon == 'password'">
                                <i class="ri-eye-line "></i>
                              </span>
                              <span v-else>
                                <i class="ri-eye-off-line"></i>
                              </span>
                            </button>
                          </div>
                          <div class="text-center d-flex align-items-center justify-content-center mt-4">
                            <button
                              class="btn btn-primary w-100 rounded-pill btn-sm w-md waves-effect waves-light font-size-16"
                              type="submit">Register</button>
                          </div>
                          <div class="mt-3 text-center">
                            <p class="mb-0">
                              By registering you agree to our
                              <a href="#" class="text-primary">Terms of Use</a>
                            </p>
                          </div>
                        </form>
                      </div>
                      <div class="mt-2 text-center">
                        <p>
                          Already have an account ?
                          <router-link tag="a" to="/" class="font-weight-medium text-primary">Login</router-link>
                        </p>
                        <!-- <p>
                          © 2023 <span style="color: #FFA500;">TRES - Finsis.</span>
                        </p> -->
                      </div>
                      <div class="col-12">
                        <hr class="bg-dark ">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footerVue></footerVue>
      </div>
    </div>
  </div>
</body>
</template>