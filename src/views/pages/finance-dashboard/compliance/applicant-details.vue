<style>
</style>
<template>
  <form action="" class="form-fluid font-size-16">
    <div class="row no-gutters">
      <div class="col-12">
        <h4 class="d-flex justify-content-start align-items-center text-capitalize mb-0 pb-0">
          <span><i class="ri-account-pin-circle-fill "></i></span> personal details
        </h4>
        <hr class="mt-0 pt-0 ">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100 ">Surname</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="Surname" class="w-100 div-details border border-1 mb-1 on-focus-">
      </div>
      <div class="col-lg-4">
        <label for="other_name" class="w-100">Other Names</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="other_name" placeholder="Other Names" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">ID Number</label>
      </div>
      <div class="col-lg-8">
        <input for="" id="" placeholder="ID Number" class="w-100 div-details border border-1 mb-1">
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Marital Status</label>
      </div>
      <div class="col-lg-8">
        <select for="" class="w-100 border border-1 mb-1">
          <option value="">Select</option>
          <option value="">Married</option>
          <option value="">Single</option>
          <option value="">Divorced</option>
          <option value="">Widow/Widower</option>
        </select>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">KRA PIN Number</label>
      </div>
      <div class="col-lg-8">
        <input type="" for="" id="" placeholder="KRA PIN Number" class="w-100 div-details border border-1 mb-1"
          required>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Nationality</label>
      </div>
      <div class="col-lg-8 ">
        <select for="" class="w-100 border border-1 mb-1">
          <option value="" id="">Select</option>
          <option value="" id="">Kenyan</option>
        </select>
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
        <label for="" class="w-100">ID Card</label>
      </div>
      <div class="col-lg-8">
        <div class="input-group">
          <input type="file" class="pl-2 ml-1 btn-sm choose-file border border-1 mb-1  w-100">
        </div>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">Passport Photo</label>
      </div>
      <div class="col-lg-8 ">
        <div class="input-group">
          <input type="file" class="pl-2 ml-1 btn-sm choose-file border border-1 mb-1 w-100 ">
        </div>
      </div>
      <div class="col-lg-4">
        <label for="" class="w-100">KRA PIN Certificate</label>
      </div>
      <div class="col-lg-8">
        <div class="input-group">
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
