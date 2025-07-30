<template>
  <div class="card mt-4">
    <div class="card-header">
      <h5>Assign Serial Numbers</h5>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label>Select Product</label>
        <select class="form-control" v-model="selectedProductId" @change="loadUnassignedUnits">
          <option disabled value="">-- Select Product --</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <div v-if="units.length">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Unit ID</th>
              <th>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in units" :key="unit.id">
              <td>{{ index + 1 }}</td>
              <td>{{ unit.id }}</td>
              <td>
                <input type="text" class="form-control" v-model="unit.serialNumber" placeholder="Enter serial number" />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-end">
          <button class="btn btn-success" @click="submitSerials">Submit Serial Numbers</button>
        </div>
      </div>

      <div v-else-if="selectedProductId" class="text-muted">
        No unassigned units for selected product.
      </div>
    </div>
  </div>
</template>

<script>
import { productApi } from "@/api/productApi"; // your existing API module
import notify from "@/utils/swal.js"; // optional sweetalert wrapper

export default {
  data() {
    return {
      products: [],
      selectedProductId: '',
      units: []
    };
  },
  async created() {
    try {
      this.products = (await productApi.getProductsWithUnassignedUnits()).data;
    } catch (err) {
      console.error("Failed to load product list:", err);
    }
  },

  methods: {
    async loadUnassignedUnits() {
      if (!this.selectedProductId) return;
      try {
        const res = await productApi.getUnassignedUnits(this.selectedProductId);
        // Add serialNumber to each unit for v-model binding
        this.units = res.data.map(u => ({ ...u, serialNumber: '' }));
      } catch (err) {
        notify.error("Failed to load units.");
        console.error(err);
      }
    },
    async submitSerials() {
      const invalid = this.units.some(u => !u.serialNumber || u.serialNumber.trim() === "");
      if (invalid) {
        notify.warning("All serial numbers must be filled.");
        return;
      }

      const payload = this.units.map(u => ({
        id: u.id,
        productId: this.selectedProductId,
        serialNumber: u.serialNumber,
        assigned: true
      }));

      try {
        await productApi.updateSerials(payload);
        notify.success("Serial numbers updated successfully!");
        this.units = [];
      } catch (err) {
        notify.error("Failed to update serial numbers.");
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
}
</style>
