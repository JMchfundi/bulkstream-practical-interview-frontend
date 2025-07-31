<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Edible Oil Tonnage Calculator</h2>

        <form @submit.prevent="calculateTonnage" novalidate>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="volume" class="form-label">Volume (Litres)</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-rulers"></i></span>
                <input
                  type="number"
                  id="volume"
                  v-model.number="form.volume"
                  class="form-control"
                  placeholder="Enter volume in litres"
                  :class="{'is-invalid': errors.volume}"
                  step="0.01"
                />
              </div>
              <div v-if="errors.volume" class="invalid-feedback d-block">{{ errors.volume }}</div>
            </div>

            <div class="col-md-6">
              <label for="density" class="form-label">Density (kg/m³)</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-speedometer2"></i></span>
                <input
                  type="number"
                  id="density"
                  v-model.number="form.density"
                  class="form-control"
                  placeholder="Enter density in kg/m³"
                  :class="{'is-invalid': errors.density}"
                  step="0.01"
                />
              </div>
              <div v-if="errors.density" class="invalid-feedback d-block">{{ errors.density }}</div>
            </div>

            <div class="col-md-6">
              <label for="temperature" class="form-label">Temperature (°C)</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-thermometer-half"></i></span>
                <input
                  type="number"
                  id="temperature"
                  v-model.number="form.temperature"
                  class="form-control"
                  placeholder="Enter temperature in °C"
                  :class="{'is-invalid': errors.temperature}"
                  step="0.01"
                />
              </div>
              <div v-if="errors.temperature" class="invalid-feedback d-block">{{ errors.temperature }}</div>
            </div>
          </div>

          <div class="text-center mt-4">
            <button
              type="submit"
              class="btn btn-primary px-5 rounded-pill"
              :disabled="loading"
            >
              <i class="bi bi-calculator me-2"></i>{{ loading ? 'Calculating...' : 'Calculate Tonnage' }}
            </button>
          </div>
        </form>

        <div v-if="calculatedResult" class="alert alert-success mt-4" role="alert">
          <h4 class="alert-heading">Calculation Result:</h4>
          <p><strong>Volume:</strong> {{ calculatedResult.volume }} Litres</p>
          <p><strong>Density:</strong> {{ calculatedResult.density }} kg/m³</p>
          <p><strong>Temperature:</strong> {{ calculatedResult.temperature }} °C</p>
          <p><strong>VCF Used:</strong> {{ calculatedResult.vcf }}</p>
          <h5 class="mt-3"><strong>Tonnage:</strong> {{ calculatedResult.tonnage ? calculatedResult.tonnage.toFixed(4) : 'N/A' }} MT</h5>
        </div>

        <div v-if="errorMessage" class="alert alert-danger mt-4" role="alert">
          <strong>Error:</strong> {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from '@/utils/swal'; // Assuming you have a swal utility as in your example

const API_BASE_URL = 'http://localhost/api/oil-tonnages'; // Adjust as needed

export default {
  name: 'CalculatorView',
  data() {
    return {
      form: {
        volume: null,
        density: null,
        temperature: null,
      },
      errors: {},
      calculatedResult: null,
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      const { volume, density, temperature } = this.form;

      if (volume === null || volume === '') {
        this.errors.volume = 'Volume is required.';
      } else if (volume <= 0) {
        this.errors.volume = 'Volume must be a positive number.';
      }

      if (density === null || density === '') {
        this.errors.density = 'Density is required.';
      } else if (density <= 0) {
        this.errors.density = 'Density must be a positive number.';
      }

      if (temperature === null || temperature === '') {
        this.errors.temperature = 'Temperature is required.';
      }
      // Temperature can be negative, so no positive check here.

      return Object.keys(this.errors).length === 0;
    },
    async calculateTonnage() {
      this.loading = true;
      this.calculatedResult = null;
      this.errorMessage = '';

      if (this.validateForm()) {
        try {
          const response = await axios.post(`${API_BASE_URL}/calculate`, this.form);
          this.calculatedResult = response.data;
          swal.success('Tonnage calculated and saved successfully!');
          this.resetForm();
        } catch (error) {
          console.error('Error calculating tonnage:', error);
          if (error.response) {
            this.errorMessage = error.response.data || 'Server error occurred.';
            if (error.response.status === 404) {
                 this.errorMessage = error.response.data || 'VCF not found for the given density and temperature.';
            }
          } else {
            this.errorMessage = 'Network error or unable to connect to server.';
          }
          swal.error('Failed to calculate tonnage. Please check your inputs.');
        } finally {
          this.loading = false;
        }
      } else {
        this.loading = false;
        swal.warning('Please correct the validation errors before submitting.');
      }
    },
    resetForm() {
      this.form = {
        volume: null,
        density: null,
        temperature: null,
      };
      this.errors = {};
    }
  }
};
</script>

<style scoped>
/* Ensure Bootstrap's display utilities work as expected */
.invalid-feedback.d-block {
  display: block !important;
}
</style>