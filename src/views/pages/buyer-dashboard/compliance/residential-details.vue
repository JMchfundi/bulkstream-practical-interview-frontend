<style scoped>
.div-details {
  font-weight: lighter;
  color: #000;
  font-size: smaller;
  padding: 0.3em 0 0.3em 0.8em;
}

/* select,
input {
  outline: none;
  height: 2.5em;
} */

select:focus,
input:focus {
  border: 1px solid #4CB1F6;
}
</style>
<template>
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom mt-3 mb-3 d-flex align-items-center">
        <h4 class="d-flex" style="color: #FFA500;">
          <span class="d-flex">
            <i class="ri-phone-fill mr-1"></i>
          </span> residential & contact details
        </h4>
      </div>
      <form action="" class="form-fluid font-size-16 needs-validation" @submit.prevent="">
        <div class="row">
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Mobile Number</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Mobile Number" class="form-control rounded-0 div-details" required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Email Address</label>
              </div>
              <div class="col-lg-8 ">
                <input type="email" placeholder="example@mail.com" for="" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Residential Status</label>
              </div>
              <div class="col-lg-8">
                <select for="" class="form-control rounded-0 div-details" required>
                  <option value="" class="text-uppercase">Choose...</option>
                  <option value="" class="text-uppercase">Owned and on mortgage</option>
                  <option value="" class="text-uppercase">owned and not on mortgage</option>
                  <option value="" class="text-uppercase">rented</option>
                  <option value="" class="text-uppercase">provided by employer</option>
                  <option value="" class="text-uppercase">other</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Physical Address</label>
              </div>
              <div class="col-lg-8">
                <input type="" for="" placeholder="Physical Address" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">House Number</label>
              </div>
              <div class="col-lg-8">
                <input type="" for="" placeholder="House Number" class="form-control rounded-0 div-details" required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Street/Location</label>
              </div>
              <div class="col-lg-8">
                <input type="" for="" placeholder="Street/Location" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Town</label>
              </div>
              <div class="col-lg-8">
                <input type="" id="" for="" placeholder="Town" class="form-control rounded-0 div-details" required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Country</label>
              </div>
              <div class="col-lg-8 ">
                <select for="" class="form-control rounded-0 div-details" required>
                  <option value="">Select...</option>
                  <option value="">Kenya</option>
                  <option value="">Tanzania</option>
                  <option value="">Uganda</option>
                  <option value="">Rwanda</option>
                  <option value="">Burundi</option>
                  <option value="">S.Sudan</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row no-gutters mt-2 p-1">
          <div class="col d-flex justify-content-end">
            <a href="#" class="btn btn-sm btn-success d-flex align-items-center">
              <span class="d-flex"><i class="ri-save-fill font-size-15 mr-1"></i></span>SAVE & CONTINUE</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>