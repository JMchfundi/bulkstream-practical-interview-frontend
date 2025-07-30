<script>
import axios from "axios";
import { required, email, minLength } from "vuelidate/lib/validators";
import { userService } from "../../../api/user.service";
axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = userService.API_URL;
/**
 * Transactions component
 */
export default {
  data() {
    return {
      transactionData: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      fields: [
        { key: "id", sortable: true },
        { key: "username", sortable: true },
        { key: "email", sortable: true },
        // { key: "paymentstatus", sortable: true, label: "Payment Status" },
        { key: "access", label: "Assigned Rights" },
        { key: "action" }
      ],
      submitted: false,
      showmodal: false,
      customers: {
        name: "",
        email: "",
        balance: "",
        phone: "",
        date: ""
      },
    };
  },
  validations: {
    customers: {
      name: { required },
      balance: { required },
      email: { required, email },
      phone: { required, minLength: minLength(10) },
      date: { required }
    }
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.transactionData.length;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.transactionData.length;
    this.getAfricanaData()
  },
  methods: {
    getAfricanaData() {
      var self = this
      axios.get(userService.API_URL + "get_service")
        .then(function (response) {
          // console.log(JSON.stringify(response.data))
          self.transactionData = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },

        // eslint-disable-next-line no-unused-vars
        handleSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        const name = this.customers.name;
        const balance = this.customers.balance;
        const email = this.customers.email;
        const phone = this.customers.phone;
        const date = this.customers.date;
        this.customersData.push({
          name,
          email,
          balance,
          phone,
          date
        });
        this.showmodal = false;
      }
      this.submitted = false;
      this.customers = {};
    },
    /**
     * hode mondal on close
     */
    // eslint-disable-next-line no-unused-vars
    hideModal(e) {
      this.submitted = false;
      this.showmodal = false;
      this.contacts = {};
    },
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <!-- item-->
        <b-dropdown-item>Sales Report</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Export Report</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Profit</b-dropdown-item>
        <!-- item-->
        <b-dropdown-item>Action</b-dropdown-item>
      </b-dropdown>

      <h4 class="card-title mb-4">Latest Transactions</h4>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              Show&nbsp;
              <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
            </label>
          </div>
        </div>
        <!-- Search -->
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_filter" class="dataTables_filter text-md-right">
            <label class="d-inline-flex align-items-center">
              Search:
              <b-form-input v-model="filter" type="search" class="form-control form-control-sm ml-2"></b-form-input>
            </label>
          </div>
        </div>
        <!-- End search -->
      </div>
      <div class="table-responsive">
        <b-table :items="transactionData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage"
          :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn"
          @filtered="onFiltered">
          <template v-slot:cell(paymentstatus)="row">
            <div class="badge font-size-12" :class="{
              'badge-soft-danger': `${row.value}` === 'Chargeback',
              'badge-soft-success': `${row.value}` === 'Paid',
              'badge-soft-warning': `${row.value}` === 'Unpaid'
            }">{{ row.value }}</div>
          </template>

          <template v-slot:cell(action)>
            <a @click="showmodal = true" class="mr-3 text-primary" v-b-tooltip.hover data-toggle="tooltip" title="Edit">
              <i class="mdi mdi-pencil font-size-18"></i>
            </a>
            <a href="javascript:void(0);" class="text-danger" v-b-tooltip.hover title="Delete">
              <i class="mdi mdi-trash-can font-size-18"></i>
            </a>
          </template>
        </b-table>
      </div>
      <div class="row">
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination pagination-rounded mb-0">
              <!-- pagination -->
              <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
            </ul>
          </div>
        </div>
      </div>
    </div>

              <!-- Modal -->
              <b-modal
      id="modal-1"
      v-model="showmodal"
      title="Add Customer"
      title-class="text-dark font-18"
      hide-footer
    >
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="customers.name"
            type="text"
            class="form-control"
            placeholder="Enter name"
            :class="{ 'is-invalid': submitted && $v.customers.name.$error }"
          />
          <div
            v-if="submitted && !$v.customers.name.required"
            class="invalid-feedback"
          >Name is required</div>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            id="email"
            v-model="customers.email"
            type="email"
            name="email"
            class="form-control"
            placeholder="Enter email"
            :class="{ 'is-invalid': submitted && $v.customers.email.$error }"
          />
          <div v-if="submitted && $v.customers.email.$error" class="invalid-feedback">
            <span v-if="!$v.customers.email.required">Email is required</span>
            <span v-if="!$v.customers.email.email">Email is invalid</span>
          </div>
        </div>
        <div class="form-group">
          <label for="position">Phone</label>
          <input
            id="position"
            v-model="customers.phone"
            type="text"
            class="form-control"
            placeholder="Enter phone number"
            :class="{ 'is-invalid': submitted && $v.customers.phone.$error }"
          />
          <div
            v-if="submitted && !$v.customers.phone.required"
            class="invalid-feedback"
          >Phone is required</div>
        </div>
        <div class="form-group">
          <label for="company">Balance</label>
          <input
            id="company"
            v-model="customers.balance"
            type="text"
            class="form-control"
            placeholder="Enter balance"
            :class="{ 'is-invalid': submitted && $v.customers.balance.$error }"
          />
          <div
            v-if="submitted && !$v.customers.balance.required"
            class="invalid-feedback"
          >Balance is required</div>
        </div>
        <div class="form-group">
          <label for="position">Joining Date</label>
          <input
            id="position"
            v-model="customers.date"
            type="text"
            class="form-control"
            placeholder="Enter Joining Date"
            :class="{ 'is-invalid': submitted && $v.customers.date.$error }"
          />
          <div
            v-if="submitted && !$v.customers.date.required"
            class="invalid-feedback"
          >Date is required</div>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-success">Save</button>
          <b-button class="ml-1" variant="danger" @click="hideModal">Cancel</b-button>
        </div>
      </form>
    </b-modal>
    <!-- end modal -->
  </div>
</template>