<script>
import axios from "axios";
import { required, email, minLength } from "vuelidate/lib/validators";
import { userService } from "../../../../api/user.service";
/**
 * Transactions component
 */
export default {
  data() {
    return {
      productData: [],
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
        { key: "projectname", sortable: true },
        { key: "pricing", sortable: true },
        { key: "location", label: "Location", sortable: true },
        // { key: "uploads.url.", label: "Project Image", image: true },
        // { key: "projectUpload.image", label: "Image ", image: true},
        // { key: "paymentstatus", sortable: true, label: "Payment Status" },
        { key: "id" , label: "View Project"},
        // { key: "projectname", label: "View Project", sortable: true, },
        // { key: "constname" , label: "View Project"}
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
      image: ""
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

  dataUrl() {
    return 'data:image/png;base64,' + btoa(this.transactionData[0].projectUpload.image);
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.transactionData.length;
    this.getAfricanaData()
  },
  methods: {
        /**
     * Selected image shows
     */
     imageShow(event) {
      const image = event.target.src;
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = image;
    },
    
    greet(message, event) {
      console.log(message + event)
      // alert("Hello"+message)
      //   // Redirect to the originally requested page, or to the home page
      //   this.$router.push(
      //   this.$route.query.redirectTo('/Xingzheng/testView')
      // );
      this.$router.push({ path: '/Xingzheng/testView' })
      // `event` is the native DOM event
      // if (event) {
      //   alert(event.target.tagName)
      // }
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
    getAfricanaData() {
      var self = this
      axios.get(userService.API_URL + "project_api/v1/house/get")
        .then(function (response) {
          self.transactionData = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
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

          <!-- <template v-slot:cell(uploads.url)="row">
            <div><img :src="row.value" :width="50" :height="50" /></div>
          </template> -->

          <!-- <template v-slot:cell(projectUpload.image)>
            <div
            >
            <img :src="'data:image/png;base64,'"/>
            </div>
          </template> -->

          <template v-slot:cell(id)>
            <a @click="showmodal = true" class="mr-3 text-primary" v-b-tooltip.hover data-toggle="tooltip" title="Edit">
              <i class="mdi mdi-eye font-size-18"></i>
            </a>
            <!-- <a @click="greet(row.value, $event)" class="text-danger" v-b-tooltip.hover title="view">
              <i class="mdi mdi-eye font-size-18"></i>
            </a> -->
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
    <b-modal size="xl" id="modal-1" v-model="showmodal" title="Product Details" title-class="text-dark font-18" hide-footer>

      <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xl-5">
                    <div class="product-detail">
                      <div class="row">
                        <div class="col-3">
                          <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                            aria-orientation="vertical">
                            <a class="nav-link" id="product-1-tab" data-toggle="pill" @click="imageShow($event)"
                              role="tab">
                              <img src="@/assets/images/product/img-1.png" alt
                                class="img-fluid mx-auto d-block tab-img rounded" />
                            </a>
                            <a class="nav-link" id="product-2-tab" data-toggle="pill" @click="imageShow($event)"
                              role="tab">
                              <img src="@/assets/images/product/img-5.png" alt
                                class="img-fluid mx-auto d-block tab-img rounded" />
                            </a>
                            <a class="nav-link" id="product-3-tab" data-toggle="pill" @click="imageShow($event)"
                              role="tab">
                              <img src="@/assets/images/product/img-3.png" alt
                                class="img-fluid mx-auto d-block tab-img rounded" />
                            </a>
                            <a class="nav-link" id="product-4-tab" data-toggle="pill" @click="imageShow($event)"
                              role="tab">
                              <img src="@/assets/images/product/img-4.png" alt
                                class="img-fluid mx-auto d-block tab-img rounded" />
                            </a>
                          </div>
                        </div>
                        <div class="col-md-8 col-9">
                          <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="product-1" role="tabpanel">
                              <div class="product-img">
                                <img id="expandedImg" src="@/assets/images/product/img-1.png" alt
                                  class="img-fluid mx-auto d-block" />
                              </div>
                            </div>
                          </div>
                          <div class="row text-center mt-2">
                            <div class="col-sm-6">
                              <button type="button" class="btn btn-primary btn-block waves-effect waves-light mt-2 mr-1">
                                <i class="mdi mdi-cart mr-2"></i> Make An Offer
                              </button>
                            </div>
                            <div class="col-sm-6">
                              <button type="button" class="btn btn-light btn-block waves-effect mt-2 waves-light">
                                <i class="mdi mdi-shopping mr-2"></i>Buy now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end product img -->
                  </div>
                  <div class="col-xl-7">
                    <div class="mt-4 mt-xl-3">
                      <a href="#" class="text-primary">Project Category</a>
                      <h5 class="mt-1 mb-3">Project's Name - (Pleas Note:- The Current Images Are for 
                        Demo & Not Commercial Purpose)</h5>

                      <div class="d-inline-flex">
                        <div class="text-muted mr-3">
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star"></span>
                        </div>
                        <div class="text-muted">( 132 )</div>
                      </div>

                      <h5 class="mt-2">
                        <del class="text-muted mr-2">$25200</del>$24000
                        <span class="text-danger font-size-12 ml-2">25 % Off</span>
                      </h5>
                      <!-- <p class="mt-3">To achieve this, it would be necessary to have uniform pronunciation</p> -->
                      <hr class="my-4" />

                      <div class="row">
                        <div class="col-md-6">
                          <div>
                            <!-- <h5 class="font-size-14">
                              <i class="mdi mdi-location"></i> Delivery location
                            </h5>
                            <div class="form-inline">
                              <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Enter Delivery pincode " />
                                <div class="input-group-append">
                                  <button class="btn btn-light" type="button">Check</button>
                                </div>
                              </div>
                            </div> -->

                            <h5 class="font-size-14">Specification :</h5>
                            <ul class="list-unstyled product-desc-list">
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Specification 1
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Specification 2
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Specification 3
                              </li>
                              <li>
                                <i class="mdi mdi-circle-medium mr-1 align-middle"></i> Specification 4
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h5 class="font-size-14">Attractivity :</h5>
                          <ul class="list-unstyled product-desc-list">
                            <li>
                              <i class="mdi mdi-sync text-primary mr-1 align-middle font-size-16"></i> Att 1
                            </li>
                            <li>
                              <i class="mdi mdi-currency-usd-circle text-primary mr-1 align-middle font-size-16"></i> Att 2                            </li>
                          </ul>
                        </div>
                      </div>

                      <!-- <div class="row">
                        <div class="col-md-6">
                          <div class="product-color mt-3">
                            <h5 class="font-size-14">Color :</h5>
                            <a href="#" class="active">
                              <div class="product-color-item">
                                <img src="@/assets/images/product/img-1.png" alt class="avatar-md" />
                              </div>
                              <p>Blue</p>
                            </a>
                            <a href="#">
                              <div class="product-color-item">
                                <img src="@/assets/images/product/img-5.png" alt class="avatar-md" />
                              </div>
                              <p>Cyan</p>
                            </a>
                            <a href="#">
                              <div class="product-color-item">
                                <img src="@/assets/images/product/img-3.png" alt class="avatar-md" />
                              </div>
                              <p>Green</p>
                            </a>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="product-color mt-3">
                            <h5 class="font-size-14">Size :</h5>
                            <a href="#" class="active">
                              <div class="product-color-item">
                                <div class="avatar-xs">
                                  <span class="avatar-title bg-transparent text-body">S</span>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="product-color-item">
                                <div class="avatar-xs">
                                  <span class="avatar-title bg-transparent text-body">M</span>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="product-color-item">
                                <div class="avatar-xs">
                                  <span class="avatar-title bg-transparent text-body">L</span>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="product-color-item">
                                <div class="avatar-xs">
                                  <span class="avatar-title bg-transparent text-body">XL</span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
                <!-- end row -->

                <div class="mt-4">
                  <h5 class="font-size-14 mb-3">Product description:</h5>
                  <div class="product-desc">
                    <b-tabs class="nav-tabs-custom" content-class="border border-top-0 p-4">
                      <b-tab title="Description">
                        <div>
                          <p>All deatils concerning the product capured by either the agnt or the dveloper or the admin 
                            will be cleary captured here from the database
                          </p>
                          <p>To achieve this, it would be necessary to have uniform grammar, pronunciation and more common
                            several languages coalesce, the grammar of the resulting.</p>
                          <p>It will be as simple as occidental in fact.</p>

                          <div>
                            <p class="mb-2">
                              <i class="mdi mdi-circle-medium mr-1 align-middle"></i> If several languages coalesce
                            </p>
                            <p class="mb-2">
                              <i class="mdi mdi-circle-medium mr-1 align-middle"></i> To an English person, it will seem
                              like simplified
                            </p>
                            <p class="mb-0">
                              <i class="mdi mdi-circle-medium mr-1 align-middle"></i> These cases are perfectly simple.
                            </p>
                          </div>
                        </div>
                      </b-tab>
                      <b-tab title="Specifications">
                        <div class="table-responsive">
                          <table class="table table-nowrap mb-0">
                            <tbody>
                              <tr>
                                <th scope="row" style="width: 400px;">Category</th>
                                <td>Goes Here</td>
                              </tr>
                              <tr>
                                <th scope="row">Agent</th>
                                <td>Goes Here</td>
                              </tr>
                              <tr>
                                <th scope="row">Bids</th>
                                <td>Goes Here</td>
                              </tr>
                              <tr>
                                <th scope="row">Location</th>
                                <td>Goes Here</td>
                              </tr>
                              <tr>
                                <th scope="row">Completion</th>
                                <td>Goes Here</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </div>
                </div>

                <!-- <div class="mt-4">
                  <h5 class="font-size-14">Reviews :</h5>
                  <div class="d-inline-flex mb-3">
                    <div class="text-muted mr-3">
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star text-warning"></span>
                      <span class="mdi mdi-star"></span>
                    </div>
                    <div class="text-muted">( 132 customer Review)</div>
                  </div>
                  <div class="border p-4 rounded">
                    <div class="media border-bottom pb-3">
                      <div class="media-body">
                        <p class="text-muted mb-2">To an English person, it will seem like simplified English, as a
                          skeptical Cambridge</p>
                        <h5 class="font-size-15 mb-3">James</h5>

                        <ul class="list-inline product-review-link mb-0">
                          <li class="list-inline-item">
                            <a href="#">
                              <i class="mdi mdi-thumb-up align-middle mr-1"></i> Like
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#">
                              <i class="mdi mdi-message-text align-middle mr-1"></i> Comment
                            </a>
                          </li>
                        </ul>
                      </div>
                      <p class="float-sm-right font-size-12">11 Feb, 2020</p>
                    </div>
                    <div class="media border-bottom py-3">
                      <div class="media-body">
                        <p class="text-muted mb-2">Everyone realizes why a new common language would be desirable</p>
                        <h5 class="font-size-15 mb-3">David</h5>

                        <ul class="list-inline product-review-link mb-0">
                          <li class="list-inline-item">
                            <a href="#">
                              <i class="mdi mdi-thumb-up align-middle mr-1"></i> Like
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#">
                              <i class="mdi mdi-message-text align-middle mr-1"></i> Comment
                            </a>
                          </li>
                        </ul>
                      </div>
                      <p class="float-sm-right font-size-12">22 Jan, 2020</p>
                    </div>
                    <div class="media py-3">
                      <div class="media-body">
                        <p class="text-muted mb-2">If several languages coalesce, the grammar of the resulting</p>
                        <h5 class="font-size-15 mb-3">Scott</h5>

                        <ul class="list-inline product-review-link mb-0">
                          <li class="list-inline-item">
                            <a href="#">
                              <i class="mdi mdi-thumb-up align-middle mr-1"></i> Like
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a href="#">
                              <i class="mdi mdi-message-text align-middle mr-1"></i> Comment
                            </a>
                          </li>
                        </ul>
                      </div>
                      <p class="float-sm-right font-size-12">04 Jan, 2020</p>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
            <!-- end card -->
          </div>
        </div>
        <!-- end row -->

        <!-- <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    <div class="media">
                      <div class="avatar-sm mr-3">
                        <span class="avatar-title bg-light rounded-circle text-primary font-size-24">
                          <i class="ri-checkbox-circle-line"></i>
                        </span>
                      </div>
                      <div class="media-body align-self-center overflow-hidden">
                        <h5>Free Shipping</h5>
                        <p class="text-muted mb-0">Sed ut perspiciatis unde</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="media mt-4 mt-md-0">
                      <div class="avatar-sm mr-3">
                        <span class="avatar-title bg-light rounded-circle text-primary font-size-24">
                          <i class="ri-exchange-line"></i>
                        </span>
                      </div>
                      <div class="media-body align-self-center overflow-hidden">
                        <h5>Easy Return</h5>
                        <p class="text-muted mb-0">Neque porro quisquam est</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="media mt-4 mt-md-0">
                      <div class="avatar-sm mr-3">
                        <span class="avatar-title bg-light rounded-circle text-primary font-size-24">
                          <i class="ri-money-dollar-circle-line"></i>
                        </span>
                      </div>
                      <div class="media-body align-self-center overflow-hidden">
                        <h5>Cash on Delivery</h5>
                        <p class="text-muted mb-0">Ut enim ad minima quis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- end row -->
      </Layout>
      <!-- <form @submit.prevent="handleSubmit">
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
      </form> -->
    </b-modal>
    <!-- end modal -->

  </div>
</template>