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
<script>
import CurrentLoansTable from '../profile/tables/current_loans_table';
export default {
  components: { CurrentLoansTable }
}
</script>
<template>
  <div class="main">
    <div class="row">
      <div class="col-12">
        <div class="card-title border-bottom mt-3 mb-3 d-flex align-items-center">
          <h4 class="d-flex" style="color: #FFA500;">
            <span class="d-flex"><i class="ri-funds-fill mr-1"></i>
            </span> current loans
          </h4>
        </div>
      </div>

      <div>
        <CurrentLoansTable />
      </div>
    </div>

    <div class="row mb-2">
      <div class="col d-flex justify-content-start">
        <div class="custom-control custom-checkbox ">
          <input type="checkbox" class="custom-control-input" id="customControlInline" required/>
          <label class="custom-control-label" for="customControlInline">I consent to disclose and or obtain information
            relating to
            applicants account(s) to and or from any Credit</label>
        </div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-lg-4">
        <label for="" class="font-size-15 font-weight-light">Attach CRB Check</label>
      </div>
      <div class="col-lg-8 ">
        <div class="input-group  ">
          <input type="file" class="form-control rounded-0 div-details">
        </div>
      </div>
    </div>
    <div class="row no-gutters mt-2 p-1">
      <div class="col d-flex justify-content-end">
        <a href="#" class="btn btn-sm d-flex align-items-center text-light" style="background-color: #4A2A6B;">
          <span class="d-flex"><i class="ri-save-fill mr-1"></i></span>SAVE & CONTINUE</a>
      </div>
    </div>
  </div>
</template>