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
          <span class="d-flex"><i class="ri-building-fill mr-1"></i>
          </span> Property details
        </h4>
      </div>
      <form action="" class="form-fluid font-size-16 needs-validation" @submit.prevent="">
        <div class="row">
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Project Name</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Project Name" class="form-control rounded-0 div-details" required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Project Developer</label>
              </div>
              <div class="col-lg-8 ">
                <input type="" placeholder="Project Developer" for="" class="form-control rounded-0 div-details"
                  required>
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
                <label for="" class="font-size-15 font-weight-light">Project Location</label>
              </div>
              <div class="col-lg-8">
                <input type="" for="" placeholder="Project Location" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Project Start Date</label>
              </div>
              <div class="col-lg-8">
                <input type="date" for="" placeholder="Project Start Date" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Unit Type</label>
              </div>
              <div class="col-lg-8">
                <input type="" id="" for="" placeholder="Unit Type" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Unit Size</label>
              </div>
              <div class="col-lg-8">
                <input type="" id="" for="" placeholder="Unit Size" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Purchase Price</label>
              </div>
              <div class="col-lg-8">
                <input type="" id="" for="" placeholder="0.00" class="form-control rounded-0 div-details" required>
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
</div></template>