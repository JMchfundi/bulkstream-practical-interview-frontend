<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { userService } from "../../../api/user.service";
import axios from "axios";

// import Layout from "../../layouts/main";
// import PageHeader from "@/components/page-header";

/**
 * Customers Component
 */
export default {
  data() {
    return {
      title: "Customers",
      items: [
        {
          text: "Ecommerce"
        },
        {
          text: "Customers",
          active: true
        }
      ],
      customersData: [],
      customers: {
        name: "",
        email: "",
        balance: "",
        phone: "",
        date: ""
      },
      submitted: false,
      showmodal: false
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
  mounted() {
    // Set the initial number of items
    this.totalRows = this.customersData.length;
    this.getAfricanaData()
  },
  methods: {
    getAfricanaData() {
      var self = this
      axios.get(userService.API_URL + "get_service")
        .then(function (response) {
          self.customersData = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    /**
     * Modal form submit
     */
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
     * Filter the data of search
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
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div>
              <a href="javascript:void(0);" class="btn btn-success mb-2" @click="showmodal = true">
                <i class="mdi mdi-plus mr-2"></i> Add Customer
              </a>
            </div>
            <div class="table-responsive mt-3">
              <table
                class="table table-centered datatable dt-responsive nowrap"
                style="border-collapse: collapse; border-spacing: 0; width: 100%;"
              >
                <thead class="thead-light">
                  <tr>
                    <th style="width: 20px;">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customercheck" />
                        <label class="custom-control-label" for="customercheck">&nbsp;</label>
                      </div>
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>ID</th>
                    <th>Assigned Rights</th>
                    <th style="width: 120px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in customersData" :key="index">
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          :id="`customercheck${index}`"
                        />
                        <label class="custom-control-label" :for="`customercheck${index}`">&nbsp;</label>
                      </div>
                    </td>
                    <td>{{item.username}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.personal_Info.phone_number}}</td>
                    <td>{{item.personal_Info.id_number}}</td>
                    <td>{{item.access}}</td>
                    <td>
                      <a
                      @click="showmodal = true"
                      class="mr-3 text-primary"
                        v-b-tooltip.hover
                        title="Edit"
                      >
                        <i class="mdi mdi-pencil font-size-18"></i>
                      </a>
                      <a
                        href="javascript:void(0);"
                        class="text-danger"
                        v-b-tooltip.hover
                        title="Delete"
                      >
                        <i class="mdi mdi-trash-can font-size-18"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
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