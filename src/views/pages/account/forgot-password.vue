<script>
import { authMethods } from "@/state/helpers";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      tryingToReset: false,
      isResetError: false
    };
  },
  validations: {
    email: { required, email }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          this.tryingToReset = true;
          // Reset the authError if it existed.
          this.error = null;
          return (
            this.resetPassword({
              email: this.email
            })
              // eslint-disable-next-line no-unused-vars
              .then(token => {
                this.tryingToReset = false;
                this.isResetError = false;
              })
              .catch(error => {
                this.tryingToReset = false;
                this.error = error ? error : "";
                this.isResetError = true;
              })
          );
        }
      }
    }
  }
};
</script>

<template>
  <div class="bg-light">
    <div class="min-vh-100">
      <div class="container-fluid">
        <div class="row no-gutters d-flex justify-content-center">
          <div class="col-lg-4 bg-light shadow-lg rounded-bottom">
            <div class="d-flex align-items-center ">
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
          <div class="col-lg-4 bg-light shadow-lg rounded">
            <div class="mt-4">
              <div class="w-100 ">
                <div class="row no-gutters justify-content-center">
                  <div class="col-lg-9">
                    <div class="">
                      <div class="text-center">
                        <h4 class="font-size-18">Reset Password</h4>
                        <p class="text-muted">Enter your email to reset your password.</p>
                      </div>
                      <div class="p-2">
                        <b-alert v-model="isResetError" class="mb-4" variant="danger" dismissible>{{ error }}</b-alert>
                        <form class="form-horizontal" @submit.prevent="tryToReset">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon text-muted"></i>
                            <label for="useremail">Email</label>
                            <input v-model="email" type="email" class="form-control" id="useremail"
                              placeholder="Enter email" :class="{ 'is-invalid': submitted && $v.email.$error }" />
                            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                              <span v-if="!$v.email.required">Email is required.</span>
                              <span v-if="!$v.email.email">Please enter valid email.</span>
                            </div>
                          </div>
                          <div class="text-center">
                            <button
                              class="btn btn-sm rounded-pill btn-primary w-md waves-effect waves-light font-size-16"
                              type="submit">Reset</button>
                          </div>
                        </form>
                      </div>

                      <div class="mt-3 text-center">
                        <p>
                          Have an account ?
                          <router-link tag="a" to="/login" class="font-weight-medium text-primary">Log in</router-link>
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
      </div>
    </div>
  </div>
</template>