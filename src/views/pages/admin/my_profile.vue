<!-- <style>
thead {
  line-height: 0.8em;
}

hr {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.k_sh {
  font-weight: lighter;
  font-size: smaller;
}

.user-avatar {
  width: 15em;
  height: 15em;
}

/* .buttons {
  width: 15em;

} */
.update_photo {
  max-width: 15em;
}

@media all and (max-width:30em) {
  /* a.buttons {
    display: block;
    margin: 0.2em auto;
  } */
}

.user-avatar>span>i {
  font-size: 15em;
  color: rgb(220, 236, 241);

}

.p-details>li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 4px;
  font-weight: bolder;
  font-size: small;
  color: black;
  height: 2.6em;

}

.p-docs>li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 6px;
  font-weight: lighter;
  height: 3em;
}

.p-docs>li a {
  /* color: rgb(20, 20, 228); */
  color: #23D173;
}

.p-docs>li a:hover {
  color: rgb(9, 89, 113);
}

.progress,
.p-details>li:nth-child(odd),
.p-docs>li:nth-child(odd) {
  background-color: rgb(220, 236, 241);
}

/* .choose-file {
  border: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 1.1em;

} */


.btn-edit {
  border: 1px solid rgba(0, 0, 0, 0.1);
  line-height: 1.8em;
  /* background-color:  #005691;
  color: #FFFFFF; */
}

.btn-edit {
  width: 10em;

}

.p-icon {
  font-size: 25px;
}

.docs-title {
  width: 10rem;

}

.ri-close-line {
  font-weight: 900;
  color: #FFA500;
  font-size: xx-large;
}
</style>
<script>
import PageHeader from "@/components/page-header";
import Layout from "../../layouts/main";
// import Layout from "../../../layouts/main";
import Personal_Info from "../buyer-dashboard/profile/person_details";
import EmploymentDetails from "../buyer-dashboard/profile/employment_details";
import KYC_Docs_upload from "../buyer-dashboard/profile/kyc_docs_upload";
import FamilyResidence from "../buyer-dashboard/profile/familyResidence"
import KinsDetails from "../buyer-dashboard/profile/kins_details"
import Home_Ownership from "../buyer-dashboard/profile/homeownership"
export default {
  components: {
    PageHeader,
    Layout,
    Personal_Info,
    EmploymentDetails,
    KYC_Docs_upload,
    FamilyResidence,
    KinsDetails,
    Home_Ownership
  },
  data() {
    return {
      title: 'My profile',
      items: [
        {
          text: 'Finsis',
        },
        {
          text: 'My Profile',
          active: true
        },
      ],
    };
  },
};
</script>
<template>
  <Layout>
    <div class="main-container">
      <PageHeader :title="title" :items="items" />
      <hr class="mt-0 pt-0">
      <div class="card">
        <div class="card-body">
          <h6 class="font-size-13 font-weight-light">Your profile is 1 step away to completeness</h6>
          <div class="progress" style="height: 20px;">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
              aria-label="Default striped example" style="width: 20%;" aria-valuenow="20" aria-valuemin="0"
              aria-valuemax="100">20% complete</div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <Personal_Info></Personal_Info>
              <EmploymentDetails></EmploymentDetails>
              <FamilyResidence></FamilyResidence>
              <KinsDetails></KinsDetails>
            </div>
            <!-- Beginning of User documents upload -->
            <div class="col-lg-6">
              <KYC_Docs_upload></KYC_Docs_upload>
              <Home_Ownership></Home_Ownership>
            </div>
          </div>
          <div class="d-flex justify-content-end p-3 border-bottom">
            <router-link to="/kaufer/edit_profile" custom v-slot="{ navigate }">
              <button @click="navigate" role="link" class="btn btn-sm btn-primary btn-edit d-flex">
                <i class="ri-file-edit-line mr-1"></i>Edit profile
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- End of the main-container -->
  </Layout>
</template> -->