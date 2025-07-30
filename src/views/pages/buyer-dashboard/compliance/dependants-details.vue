<style scoped>
thead {
  line-height: 0.8em;
}
</style>
<script>
import DependentsTable from "./tables/dependants_table"

export default {
  components: {
    DependentsTable
  }
}
</script>
<template>
  <div class="row">
    <div class="col">
      <div class="card-title border-bottom mt-3 mb-3 d-flex align-items-center">
        <h4 class="d-flex" style="color: #FFA500;">
        <span class="d-flex"><i class="ri-group-fill mr-1"></i>
        </span> dependents details
      </h4>
      </div>
    
      <DependentsTable />
      <div class="row no-gutters mt-2 p-1">
        <div class="col d-flex justify-content-end">
          <a href="#" class="btn btn-sm btn-success d-flex align-items-center">
            <i class="ri-save-fill font-size-15 mr-1"></i>SAVE & CONTINUE</a>
        </div>
      </div>
    </div>
  </div>
</template>