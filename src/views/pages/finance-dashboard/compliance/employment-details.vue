<template>
  <form action="" class="form-fluid font-size-16">
    <div class="row no-gutters">
      <div class="col-12">
        <h4 class="d-flex justify-content-start align-items-center text-capitalize mb-0 pb-0">
          <span><i class="ri-award-fill"></i></span> employment details
        </h4>
        <hr class="mt-0 pt-0 ">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100 ">Name Of Employer</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Name Of Employer" class="w-100 div-details border border-1 mb-1 on-focus-">
      </div>
      <div class="col-lg-4">
        <label for="other_name" class="w-100">Date Employed</label>
      </div>
      <div class="col-lg-8">
        <input type="date" d-none for="" id="other_name" placeholder="Date Employed"
          class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Department</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Department" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Station</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Station" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Designation</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Designation" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Office Location & Address</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Office Location & Address" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Office Tel No</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Office Tel No" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Office Mobile No</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Office Mobile No" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Office Emaild Address</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Office Emaild Address" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Office Website</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="www.example.com" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Terms of Employment</label>
      </div>
      <div class="col-lg-8">
        <select for="" class="w-100 border border-1 mb-1">
          <option value="">Select</option>
          <option value="">Employed but under probation</option>
          <option value="">Permante & Pensionable</option>
          <option value="">Contracted</option>
          <option value="">part-time</option>
        </select>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Gross Salary</label>
      </div>
      <div class="col-lg-8">
        <input type="" for="" id="" placeholder="0.00" class="w-100 div-details border border-1 mb-1" required>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Net Salary</label>
      </div>
      <div class="col-lg-8">
        <input type="" for="" id="" placeholder="0.00" class="w-100 div-details border border-1 mb-1" required>
      </div>
    </div>
    <!-- Attachments -->
    <div class="row no-gutters">
      <div class="col-12">
        <h4 class="d-flex justify-content-start align-items-center text-capitalize mb-0 pb-0">
          <span><i class="ri-attachment-fill"></i></span> Attachments
        </h4>
        <hr class="mt-0">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Certified Bank Statements(Last 6 months)</label>
      </div>
      <div class="col-lg-8 ">
        <div class="input-group  ">
          <input type="file" class="pl-2 ml-1 btn-sm choose-file border border-1 mb-1 w-100">
        </div>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Payslips(Last 3 Months)</label>
      </div>
      <div class="col-lg-8 ">
        <div class="input-group  ">
          <input type="file" class="pl-2 ml-1 btn-sm choose-file border border-1 mb-1 w-100">
        </div>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Letter From Employer</label>
      </div>
      <div class="col-lg-8 ">
        <div class="input-group ">
          <input type="file" class="pl-2 ml-1 btn-sm choose-file border border-1 mb-1 w-100">
        </div>
      </div>
    </div>
    <div class="row no-gutters mt-2 p-1">
      <div class="col d-flex justify-content-end">
        <a href="#" class="btn btn-sm btn-success d-flex align-items-center">
          <i class="ri-save-fill font-size-15 mr-1"></i>SAVE & CONTINUE</a>
      </div>
    </div>
  </form>
</template>