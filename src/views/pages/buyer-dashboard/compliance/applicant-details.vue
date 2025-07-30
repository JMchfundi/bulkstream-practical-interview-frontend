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
          <span class="d-flex">
            <i class="ri-account-pin-circle-fill mr-1"></i>
          </span> personal details
        </h4>
      </div>
      <form action="" class="form-fluid font-size-16 needs-validation" @submit.prevent="">
        <div class="row">
          <div class="col">
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Surname</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="Surname" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="other_name" class="font-size-15 font-weight-light">Other Names</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="other_name" placeholder="Other Names" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">ID Number</label>
              </div>
              <div class="col-lg-8">
                <input for="" id="" placeholder="ID Number" class="form-control rounded-0 div-details">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Marital Status</label>
              </div>
              <div class="col-lg-8">
                <select class="form-control rounded-0 div-details ">
                  <option value="">Select</option>
                  <option value="">Married</option>
                  <option value="">Single</option>
                  <option value="">Divorced</option>
                  <option value="">Widow/Widower</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">KRA PIN Number</label>
              </div>
              <div class="col-lg-8">
                <input type="" for="" id="" placeholder="KRA PIN Number" class="form-control rounded-0 div-details"
                  required>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Nationality</label>
              </div>
              <div class="col-lg-8 ">
                <select class="form-control rounded-0 div-details ">
                  <option value="" id="">Select</option>
                  <option value="" id="">Kenyan</option>
                  <option value="" id="">Uganda</option>
                  <option value="" id="">Tanzania</option>
                  <option value="" id="">Rwanda</option>
                  <option value="" id="">Burundi</option>
                  <option value="" id="">S.Sudan</option>
                </select>
              </div>
            </div>
            
            <!-- Attachments -->
            <div class="border-bottom mb-3 d-flex align-items-center">
              <h4 class="d-flex " style="color: #4A2A;">
                <span class="d-flex"><i class="ri-attachment-fill mr-1"></i></span> Attachments
              </h4>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">ID Card</label>
              </div>
              <div class="col-lg-8">
                <input type="file" class="form-control rounded-0 div-details">
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">Passport Photo</label>
              </div>
              <div class="col-lg-8 ">
                <input type="file" class="form-control rounded-0 div-details">
              </div>
            </div>

            <div class="form-group row">
              <div class="col-lg-4">
                <label for="" class="font-size-15 font-weight-light">KRA PIN Certificate</label>
              </div>
              <div class="col-lg-8">
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
      <!-- End Form -->
    </div>
    <!-- End Col -->
  </div>
  <!-- End Row -->
</template>
