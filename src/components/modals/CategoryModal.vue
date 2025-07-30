<template>
  <div class="modal fade" id="categoryModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control mb-2" v-model="category.name" placeholder="Category name" />
          <div v-for="(attr, index) in category.attributes" :key="index" class="input-group mb-2">
            <input type="text" class="form-control" v-model="attr.name" placeholder="Attribute name" />
            <div class="input-group-append">
              <button class="btn btn-outline-danger" type="button" @click="removeAttribute(index)">X</button>
            </div>
          </div>
          <button class="btn btn-sm btn-outline-primary" @click="addAttribute">+ Add Attribute</button>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-success" @click="saveCategory">Save Category</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import { categoryApi } from '@/api/productApi';
import notify from '@/utils/swal.js'; // ✅ import SweetAlert wrapper

export default {
  data() {
    return {
      category: {
        name: '',
        attributes: []
      },
      modalInstance: null
    };
  },
  mounted() {
    this.modalInstance = new bootstrap.Modal(document.getElementById('categoryModal'));
  },
  methods: {
    showModal() {
      this.modalInstance.show();
    },
    addAttribute() {
      this.category.attributes.push({ name: '' });
    },
    removeAttribute(index) {
      this.category.attributes.splice(index, 1);
    },
    async saveCategory() {
      if (!this.category.name) {
        notify.warning('Category name is required.');
        return;
      }

      try {
        const res = await categoryApi.create(this.category);
        this.$emit('category-added', res.data);
        this.category = { name: '', attributes: [] };
        this.modalInstance.hide();
        notify.success('Category saved successfully.');
      } catch (error) {
        console.error('Failed to save category:', error);
        notify.error('Failed to save category. Please try again.');
      }
    }
  }
};
</script>


