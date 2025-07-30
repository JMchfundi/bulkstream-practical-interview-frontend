<template>
  <div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label>Product Name</label>
            <input type="text" class="form-control" v-model="product.name" />
          </div>

          <div class="mb-3">
            <label>Purchase Price</label>
            <input type="number" class="form-control" v-model.number="product.purchasePrice" min="0" step="0.01"
              placeholder="Enter purchase price" />
          </div>

          <div class="mb-3">
            <label>Selling Price</label>
            <input type="number" class="form-control" v-model.number="product.sellingPrice" min="0" step="0.01"
              placeholder="Enter selling price" />
          </div>
          <div class="mb-3">
            <label>Category</label>
            <select class="form-control" v-model.number="product.categoryId" @change="populateAttributes">
              <option disabled value="">-- Select Category --</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
            <button class="btn btn-link p-0" @click.prevent="$emit('open-category-modal')">+ Add Category</button>
          </div>

          <div class="mb-3" v-if="attributeInputs.length">
            <label>Attributes</label>
            <div v-for="(attr, index) in attributeInputs" :key="index" class="mb-2">
              <label class="form-label">{{ attr.name }}</label>
              <input :type="attr.type === 'number' ? 'number' : 'text'" class="form-control" v-model="attr.value" />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-success" @click="saveProduct">Save Product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import { productApi } from '@/api/productApi';
import notify from '@/utils/swal.js';

export default {
  props: ['categories'],
  data() {
    return {
      product: {
        name: '',
        purchasePrice: 0,
        sellingPrice: 0,
        categoryId: ''
      },
      attributeInputs: [],
      modalInstance: null
    };
  },
  mounted() {
    this.modalInstance = new bootstrap.Modal(document.getElementById('productModal'));
  },
  methods: {
    showModal() {
      this.modalInstance.show();
    },
    populateAttributes() {
      const selected = this.categories.find(c => c.id === this.product.categoryId);
      this.attributeInputs = selected?.attributes.map(attr => ({
        categoryAttributeId: attr.id, // ensure ID for backend
        name: attr.name,
        type: attr.type,
        value: ''
      })) || [];
    },
    async saveProduct() {
      if (!this.product.name || !this.product.categoryId) {
        notify.warning("Product name and category are required");
        return;
      }
      if (this.product.price < 0) {
        notify.warning("Price must be 0 or greater");
        return;
      }
      
      const payload = {
        name: this.product.name,
        sellingPrice: this.product.sellingPrice, // price = selling price (for now)
        purchasePrice: this.product.purchasePrice, // optional: if backend expects it
        stock: 0,
        categoryId: this.product.categoryId,
        attributes: this.attributeInputs.map(attr => ({
          categoryAttributeId: attr.categoryAttributeId,
          value: attr.value
        })),
        images: []
      };

      try {
        const res = await productApi.create(payload);
        this.$emit('product-added', res.data);
        this.product = { name: '', price: 0, categoryId: '' };
        this.attributeInputs = [];
        this.modalInstance.hide();
        notify.success("Product saved successfully");
      } catch (error) {
        console.error('Failed to save product:', error);
        notify.error("Error saving product");
      }
    }
  }
};
</script>

<style scoped>
.modal-body label {
  font-weight: 600;
}
</style>
