<template>
<body>
  <!--/ Property Grid Star /-->
  <section class="property-grid grid">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="grid-option">
          </div>
        </div>
        <div class="col-md-4" v-for="hotel in hotels" v-bind:key="hotel.id">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img src="img/property-1.jpg" alt="" class="img-a img-fluid">
            </div>
            <div class="card-overlay">
              <div class="card-overlay-a-content">
                <div class="card-header-a">
                  <h2 class="card-title-a">
                    <a href="#"> {{ hotel.projectname }}
                      <br /> Olive Road Two</a>
                  </h2>
                </div>
                <div class="card-body-a">
                  <div class="price-box d-flex">
                    <span class="price-a">Selling Price | $ 12.000</span>
                  </div>
                    <router-link tag="a" :to="`/hotel/${1}`" class="link-a">
                      Click here to view
                      <span class="ion-ios-arrow-forward"></span>
                    </router-link>
                </div>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li>
                      <h4 class="card-info-title">Area</h4>
                      <span>340m
                        <sup>2</sup>
                      </span>
                    </li>
                    <li>
                      <h4 class="card-info-title">Beds</h4>
                      <span>2</span>
                    </li>
                    <li>
                      <h4 class="card-info-title">Baths</h4>
                      <span>4</span>
                    </li>
                    <li>
                      <h4 class="card-info-title">Garages</h4>
                      <span>1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <nav class="pagination-a">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">
                  <span class="ion-ios-arrow-back"></span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">1</a>
              </li>
              <li class="page-item active">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item next">
                <a class="page-link" href="#">
                  <span class="ion-ios-arrow-forward"></span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
  <!--/ Property Grid End /-->
</body>
</template>

<script>
// import hotels from "@/assets/data/hotels"
import bedSizeIcons from "@/assets/data/maps/bed-size-icons"
import facilityIcons from "@/assets/data/maps/facility-icons"
import includedIcons from "@/assets/data/maps/included-icons"

import bookingValidation from "@/mixins/validation/booking-validation.js"
import validateState from "@/mixins/validation/validate-state.js"
import axios from "axios"
import { userService } from "@/api/user.service"

export default {
  name: "Hotel",
  components: {
  },
  mixins: [bookingValidation, validateState],
  data() {
    return {
      // hotels,
      bedSizeIcons,
      facilityIcons,
      includedIcons,
      hotels: [],
      hotelDesc: "",  // description about hotel
      form: { // booking data
        adultCount: 0,
        infantCount: 0,
        checkInDate: null,
        checkOutDate: null,
        bedSize: null,
        included: null,
      }
    }
  },
  computed: {
    // // calcs the total visitor count
    // totalVisitorCount() {
    //   return this.form.adultCount + this.form.infantCount;
    // },
    // // calcs the total price.
    // totalPrice() {
    //   return this.form.adultCount * ((this.hotel.pricing.bed[this.form.bedSize || "normal"]) + (this.hotel.pricing.included[this.form.included] || 0));
    // }
  },
  mounted() {
    this.getAfricanaData()
    // const hotelId = this.$route.params.id; // get hotel id from route param
    // this.hotel = this.hotels.find(hotel => hotel.id == hotelId); // find hotel by id
    // this.hotelDesc = this.hotel.desc.split("\n"); // split hotel description by new lines for making paragraphs
  },
  methods: {
    getAfricanaData() {
      var self = this
      axios.get(userService.API_URL + "project_api/v1/house/get")
        .then(function (response) {
          self.hotels = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      },
  }  
};
</script>