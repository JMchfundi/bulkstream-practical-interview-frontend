<template>
  <div class="container mt-4">
    <h3>Goods Receipt</h3>

    <div class="text-end mb-3">
      <button class="btn btn-success" @click="addRow">Add Row</button>
    </div>

    <form @submit.prevent="submitForm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>
              <select class="form-control" v-model="item.productId">
                <option disabled value="">-- Select Product --</option>
                <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
              <button class="btn btn-link p-0" @click.prevent="openProductModal">+ Add Product</button>
            </td>
            <td>
              <input type="number" class="form-control" v-model.number="item.quantity" min="1" />
            </td>
            <td>
              <button class="btn btn-danger btn-sm" @click.prevent="removeRow(index)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>


      <div class="text-end">
        <button type="submit" class="btn btn-primary" :disabled="!items.length">
          Submit Goods Receipt
        </button>
      </div>
    </form>

    <!-- Externalized Modals -->
    <ProductModal ref="productModal" :categories="categories" @product-added="onProductAdded"
      @open-category-modal="openCategoryModal" />

    <CategoryModal ref="categoryModal" @category-added="onCategoryAdded" />

  </div>
</template>

<script>
// import * as bootstrap from 'bootstrap';
import { productApi, categoryApi } from "@/api/productApi";
import ProductModal from '@/components/modals/ProductModal.vue';
import CategoryModal from '@/components/modals/CategoryModal.vue';
import notify from '@/utils/swal.js';

export default {
  components: {
    ProductModal,
    CategoryModal
  },
  data() {
    return {
      items: [],
      products: [],
      categories: [],
      counter: 1
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await productApi.getAll();
        this.products = res.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        notify.error("Failed to load products");
      }
    },
    async fetchCategories() {
      try {
        const res = await categoryApi.getAll();
        this.categories = res.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        notify.error("Failed to load categories");
      }
    },
    addRow() {
      this.items.push({
        id: this.counter++,
        productId: '',
        quantity: 1
      });
    },
    removeRow(index) {
      this.items.splice(index, 1);
    },
    updateTotal(item) {
      item.quantity = parseFloat(item.quantity) || 0;
      item.price = parseFloat(item.price) || 0;
      item.total = item.quantity * item.price;
    },
    updatePrice(item) {
      const selectedProduct = this.products.find(p => p.id === item.productId);
      if (!item.price || item.price === 0) {
        item.price = selectedProduct.price || 0;
        this.updateTotal(item);
      }
    },
    async submitForm() {
      if (!this.items.length) {
        notify.warning("Please add at least one item to submit.");
        return;
      }

      const invalidItems = this.items.filter(item => !item.productId || item.quantity <= 0);
      if (invalidItems.length > 0) {
        notify.warning("Ensure each row has a product and a valid quantity.");
        return;
      }

      try {
        await Promise.all(this.items.map(item =>
          productApi.stockIn(item.productId, item.quantity)
        ));
        this.items = [];
        notify.success("Goods Receipt submitted successfully!");
      } catch (error) {
        console.error("Error submitting Goods Receipt:", error);
        notify.error("Failed to submit. Please try again.");
      }
    },
    openProductModal() {
      this.$refs.productModal.showModal();
    },
    openCategoryModal() {
      this.$refs.categoryModal.showModal();
    },
    onProductAdded(product) {
      this.products.push(product);
    },
    onCategoryAdded(category) {
      this.categories.push(category); 
      this.$nextTick(() => {
        // 🔁 Re-fetch full category with its attributes
        categoryApi.getById(category.id).then(res => {
          const index = this.categories.findIndex(c => c.id === category.id);
          if (index !== -1) this.categories[index] = res.data;
        });
      });
    }
  }
};
</script>


<style scoped>
.table td,
.table th {
  vertical-align: middle;
}
</style>
