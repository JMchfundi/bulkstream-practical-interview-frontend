<template>
  <div class="card mt-4">
    <!-- NAVIGATION -->
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'units' }"
            href="#"
            @click.prevent="currentTab = 'units'"
          >Units</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'products' }"
            href="#"
            @click.prevent="currentTab = 'products'"
          >Products</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'categories' }"
            href="#"
            @click.prevent="currentTab = 'categories'"
          >Categories</a>
        </li>
      </ul>
    </div>

    <!-- CONTENT -->
    <div class="card-body">
      <!-- Common Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <b-form-select
          v-model="perPage"
          :options="pageOptions"
          class="w-auto"
          size="sm"
          title="Rows per page"
        />
        <b-input-group style="max-width: 300px;">
          <b-form-input
            v-model="filter"
            placeholder="Search..."
            debounce="300"
          />
          <b-input-group-append>
            <b-button @click="filter = ''" variant="outline-secondary">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>

      <!-- PRODUCT UNITS TABLE -->
      <b-table
        v-if="currentTab === 'units'"
        :items="filteredUnits"
        :fields="unitFields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        striped
        hover
        small
        bordered
        responsive
      >
        <template #cell(index)="data">
          {{ (currentPage - 1) * perPage + data.index + 1 }}
        </template>
        <template #cell(productName)="data">
          {{ data.item.productName }}
        </template>
        <template #cell(serialNumber)="data">
          {{ data.item.serialNumber || '—' }}
        </template>
        <template #cell(assigned)="data">
          <span
            :class="{
              'badge bg-success': data.item.assigned,
              'badge bg-warning text-dark': !data.item.assigned
            }"
          >
            {{ data.item.assigned ? 'Assigned' : 'Unassigned' }}
          </span>
        </template>
      </b-table>

      <!-- PRODUCTS TABLE -->
      <b-table
        v-else-if="currentTab === 'products'"
        :items="formattedProducts"
        :fields="productFields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        striped
        hover
        small
        bordered
        responsive
      >
              <template #cell(index)="data">
          {{ (currentPage - 1) * perPage + data.index + 1 }}
        </template>
      </b-table>

      <!-- CATEGORIES TABLE -->
      <b-table
        v-else-if="currentTab === 'categories'"
        :items="filteredCategories"
        :fields="categoryFields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        striped
        hover
        small
        bordered
        responsive
      >
                    <template #cell(index)="data">
          {{ (currentPage - 1) * perPage + data.index + 1 }}
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="activeData.length"
        :per-page="perPage"
        align="center"
        class="mt-3"
        size="sm"
      />
    </div>
  </div>
</template>

<script>
import { productApi, categoryApi } from "@/api/productApi";

export default {
  data() {
    return {
      currentTab: 'units',
      units: [],
      products: [],
      categories: [],
      filter: '',
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 20, 50, 100],

      unitFields: [
        { key: "index", label: "#" },
        { key: "productName", label: "Product" },
        { key: "id", label: "Unit ID", sortable: true },
        { key: "serialNumber", label: "Serial Number" },
        { key: "assigned", label: "Status" }
      ],

      productFields: [
        { key: "index", label: "#" },
        { key: "name", label: "Product Name" },
          { key: "categoryName", label: "Category", sortable: true },
        { key: "stock", label: "Stock" },
        { key: "purchasePrice", label: "Purchase Price" },
        { key: "sellingPrice", label: "Selling Price" }
      ],

      categoryFields: [
        { key: "index", label: "#" },
        { key: "name", label: "Category Name" }
      ]
    };
  },
  computed: {
      formattedProducts() {
    const term = this.filter.toLowerCase();

    return this.products
      .map(p => {
        const category = this.categories.find(c => c.id === p.categoryId);
        return {
          ...p,
          categoryName: category ? category.name : "Uncategorized"
        };
      })
      .filter(p =>
        Object.values(p).some(val =>
          String(val).toLowerCase().includes(term)
        )
      );
  },
    filteredUnits() {
      return this.units
        .map(unit => {
          const product = this.products.find(p => p.id === unit.productId);
          return {
            ...unit,
            productName: product ? product.name : `Product ID ${unit.productId}`
          };
        })
        .filter(item => Object.values(item).some(val =>
          String(val).toLowerCase().includes(this.filter.toLowerCase())
        ));
    },
    filteredCategories() {
      return this.categories.filter(c =>
        Object.values(c).some(val =>
          String(val).toLowerCase().includes(this.filter.toLowerCase())
        )
      );
    },
    activeData() {
      switch (this.currentTab) {
        case 'products': return this.formattedProducts;
        case 'categories': return this.filteredCategories;
        default: return this.filteredUnits;
      }
    }
  },
  async created() {
    try {
      const [productRes, unitRes, categoryRes] = await Promise.all([
        productApi.getAll(),
        productApi.getAllUnits(),
        categoryApi.getAll()
      ]);
      this.products = productRes.data || [];
      this.units = unitRes.data || [];
      this.categories = categoryRes.data || [];
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  }
};
</script>
