<template>
  <div class="d-flex justify-content-center align-items-center vh-100"
    style="background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);">
    <div class="card p-4 shadow-lg"
      style="max-width: 400px; width: 100%; border-radius: 20px; backdrop-filter: blur(15px); background: rgba(255, 255, 255, 0.25); border: 1px solid rgba(255, 255, 255, 0.3);">
      <div class="text-center mb-4">
        <h1 class="text-dark mb-1" style="font-weight: 700;">TRES - BulkStream</h1>
        <h5 class="text-dark" style="font-style: italic;">Practical Interview</h5>
      </div>

      <h2 class="text-center mb-4 text-dark">Welcome Back!</h2>

      <form @submit.prevent="handleLogin">
        <!-- Email Field -->
        <div class="mb-3 position-relative">
          <label for="email" class="form-label text-dark">Email Address</label>
          <div class="input-group">
            <span class="input-group-text bg-transparent text-dark border-dark">
              <i class="fas fa-envelope"></i>
            </span>
            <input type="email" id="email" v-model="email" class="form-control bg-transparent text-dark border-dark"
              placeholder="Enter your email" required />
          </div>
        </div>

        <!-- Password Field -->
        <div class="mb-3 position-relative">
          <label for="password" class="form-label text-dark">Password</label>
          <div class="input-group">
            <span class="input-group-text bg-transparent text-dark border-dark">
              <i class="fas fa-lock"></i>
            </span>
            <input :type="passwordVisibility ? 'text' : 'password'" id="password" v-model="password"
              class="form-control bg-transparent text-dark border-dark" placeholder="Enter your password" required />
            <span class="input-group-text bg-transparent text-dark border-dark" @click="togglePasswordVisibility"
              style="cursor: pointer;">
              <i :class="passwordVisibility ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>

        <!-- Remember Me -->
        <div class="mb-3 form-check">
          <input type="checkbox" id="remember" v-model="rememberMe" class="form-check-input" />
          <label for="remember" class="form-check-label text-dark">
            Remember me
          </label>
        </div>

        <!-- Login Button -->
        <button type="submit" class="btn btn-primary w-100 py-2 d-flex justify-content-center align-items-center"
          :disabled="loading" style="border-radius: 10px; font-weight: bold; transition: transform 0.2s;">
          <span v-if="!loading">Log In</span>
          <span v-else>
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Logging in...
          </span>
        </button>
      </form>

      <div class="text-center mt-3">
        <a href="#" class="text-decoration-none text-primary">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from "@/api/user.service"; // adjust path as needed
import swal from "@/utils/swal"; // adjust path as needed


export default {
  data() {
    return {
      email: "admin@tucode.co.ke",
      password: "Password@2906",
      rememberMe: false,
      passwordVisibility: false,
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const user = await userService.login(this.email, this.password);

        if (user && user.token) {
          console.log("Login successful", user);
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        console.error("Login failed:", error);
        swal.error("Login failed: Invalid credentials or server error.");
      } finally {
        this.loading = false;
      }
    },

    togglePasswordVisibility() {
      this.passwordVisibility = !this.passwordVisibility;
    },
  },
};
</script>

<!-- Ensure Bootstrap & FontAwesome are included globally in your project for styling and icons -->
