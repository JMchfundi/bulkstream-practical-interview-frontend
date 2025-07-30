<script>
import KinsTable from "@/views/pages/buyer-dashboard/profile/tables/next_kin_table"

export default {
  components: {
    KinsTable
  }
}
</script>
<template>
  <div>
    <div class="d-flex align-items-center justify-content-center mt-4 border-bottom">
      <h4 class="text-capitalize font-weight-light d-flex">
        <span class="d-flex"><i class="ri-user-heart-fill mr-1"></i></span>
        next of kins
      </h4>
    </div>
    <div class="mt-1">
      <KinsTable></KinsTable>
    </div>
  </div>
</template>