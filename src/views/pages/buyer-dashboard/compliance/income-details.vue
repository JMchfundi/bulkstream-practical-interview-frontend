<style scoped>
.div-details {
  font-weight: lighter;
  color: #000;
  font-size: smaller;
  padding: 0.3em 0 0.3em 0.8em;
}

select:focus,
input:focus {
  border: 1px solid #4CB1F6;
}

.choose-file {
  line-height: 1.2em;
}
</style>
<template>
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom mt-3 mb-3 d-flex align-items-center">
        <h4 class="d-flex" style="color: #FFA500;">
          <span class="d-flex"><i class="ri-coins-fill mr-1"></i>
          </span> income details
        </h4>
      </div>
      <form action="" class="form-fluid font-size-16 needs-validation" @submit.prevent="">
        <div class="row">
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Source Of Income</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Income source" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="other_name" class="font-size-15 font-weight-light">Annual Turnover(Last 3 Years)</label>
              </div>
              <div class="col-lg-8">
                <input type="" d-none for="" id="" placeholder="Annual turnover(Last 3 years)"
                  class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Office Location & Address</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Office Location & Address" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Office Tel No</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Office Tel No" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Office Mobile No</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Office Mobile No" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Office Emaild Address</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Office Emaild Address" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Office Website</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="www.example.com" class="form-control rounded-0 div-details">
              </div>
            </div>

            <!-- Attachments -->
            <div class="border-bottom mb-3 d-flex align-items-center">
              <h4 class="d-flex" style="color: #4A2A;">
                <span class="d-flex"><i class="ri-attachment-fill mr-1"></i></span> Attachments
              </h4>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Business Profile</label>
              </div>
              <div class="col-lg-8 ">
                <input type="file" class="form-control rounded-0 div-details">
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Business Registration Certifiecate</label>
              </div>
              <div class="col-lg-8 ">
                <input type="file" class="form-control rounded-0 div-details">
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Audited Accounts(Last 3 Years)</label>
              </div>
              <div class="col-lg-8 ">
                <input type="file" class="form-control rounded-0 div-details">
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Management Accounts(Current Year)</label>
              </div>
              <div class="col-lg-8 ">
                <input type="file" class="form-control rounded-0 div-details">
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