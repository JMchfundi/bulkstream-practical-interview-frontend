<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%; border-radius: 20px; backdrop-filter: blur(15px); background: rgba(255, 255, 255, 0.25); border: 1px solid rgba(255, 255, 255, 0.3);">
      <h2 class="text-center mb-4 text-dark">🚀 Welcome Back!</h2>

      <form @submit.prevent="handleLogin">
        <!-- Email Field with Icon -->
        <div class="mb-3 position-relative">
          <label for="email" class="form-label text-dark">Email Address</label>
          <div class="input-group">
            <span class="input-group-text bg-transparent text-dark border-dark"><i class="fas fa-envelope"></i></span>
            <input type="email" id="email" v-model="email" class="form-control bg-transparent text-dark border-dark" placeholder="Enter your email" required />
          </div>
        </div>

        <!-- Password Field with Icon and Show Password Option -->
        <div class="mb-3 position-relative">
          <label for="password" class="form-label text-dark">Password</label>
          <div class="input-group">
            <span class="input-group-text bg-transparent text-dark border-dark"><i class="fas fa-lock"></i></span>
            <input :type="passwordVisibility ? 'text' : 'password'" id="password" v-model="password" class="form-control bg-transparent text-dark border-dark" placeholder="Enter your password" required />
            <span class="input-group-text bg-transparent text-dark border-dark" @click="togglePasswordVisibility" style="cursor: pointer;">
              <i :class="passwordVisibility ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>

        <!-- Remember me Checkbox -->
        <div class="mb-3 form-check">
          <input type="checkbox" id="remember" v-model="rememberMe" class="form-check-input" />
          <label for="remember" class="form-check-label text-dark">Remember me</label>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-100 py-2" style="border-radius: 10px; font-weight: bold; transition: transform 0.2s;">
          Log In
        </button>
      </form>

      <div class="text-center mt-3">
        <a href="#" class="text-decoration-none text-primary">Forgot Password?</a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  authMethods,
  authFackMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      email: 'admin@tucode.co.ke',
      password: 'Password@2906',
      rememberMe: false,
      passwordVisibility: false, // For toggling password visibility
    };
  },
  methods: {

    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,

    async handleLogin() {
      try {
        const response = this.login({ email: this.email, password: this.password });

        if (response.status === 200) {
          console.log('Login successful', response.data);
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error('Login error', error);
        alert('Login failed: Invalid credentials or server error.');
      }
    },
    togglePasswordVisibility() {
      this.passwordVisibility = !this.passwordVisibility;
    },
  },
};
</script>
