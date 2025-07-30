import axios from "axios";
import swal from "sweetalert";
import { userService } from "./user.service";

// const API_URL = "https://ug-africana-api.azurewebsites.net/";
// const API_URL = "https://ttsrestcode.azurewebsites.net/";
const API_URL = userService.API_URL;
//import api from "../../api/authenticate";

export const profileFunctions = {
  API_URL,
  profileCitizen,
//  productInfo,
profilePersonalInfo,
profileFamilyResidence,
profileNextOfKin,
profileEmpDetails,
profileHomeOwnership,
  productImage,
  profileData,
};

async function profileCitizen(data) {
  var user = JSON.parse(localStorage.getItem("user"));
  data.user_signature = user.email;
 // localStorage.setItem("projectname", JSON.stringify(data.projectname));
  //console.log(user.email);
  //    alert("Message", "Check This Out")
  try {
    let response = await axios.post(
      API_URL + "post_citizen",
      new URLSearchParams(data)
    );
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success " + response,
        timer: 1500,
        buttons: false,
      });
    } else
      swal({
        icon: "error",
        text: "Error " + response,
        timer: 1500,
        buttons: false,
      });
  } catch (response) {
    swal({
      icon: "error",
      text: "Error " + response,
      timer: 1500,
      buttons: false,
    });
  }
}

async function profilePersonalInfo(data) {
  var user = JSON.parse(localStorage.getItem("user"));
  data.user_signature = user.email;
 // localStorage.setItem("projectname", JSON.stringify(data.projectname));
  //console.log(user.email);
  //    alert("Message", "Check This Out")
  try {
    let response = await axios.post(
      API_URL + "post_person_info",
      new URLSearchParams(data)
    );
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success " + response,
        timer: 1500,
        buttons: false,
      });
    } else
      swal({
        icon: "error",
        text: "Error " + response,
        timer: 1500,
        buttons: false,
      });
  } catch (response) {
    swal({
      icon: "error",
      text: "Error " + response,
      timer: 1500,
      buttons: false,
    });
  }
}

async function profileFamilyResidence(data) {
  var user = JSON.parse(localStorage.getItem("user"));
  data.user_signature = user.email;
 // localStorage.setItem("projectname", JSON.stringify(data.projectname));
  //console.log(user.email);
  //    alert("Message", "Check This Out")
  try {
    let response = await axios.post(
      API_URL + "post_residence",
      new URLSearchParams(data)
    );
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success " + response,
        timer: 1500,
        buttons: false,
      });
    } else
      swal({
        icon: "error",
        text: "Error " + response,
        timer: 1500,
        buttons: false,
      });
  } catch (response) {
    swal({
      icon: "error",
      text: "Error " + response,
      timer: 1500,
      buttons: false,
    });
  }
}

async function profileNextOfKin(data) {
  var user = JSON.parse(localStorage.getItem("user"));
  data.user_signature = user.email;
 // localStorage.setItem("projectname", JSON.stringify(data.projectname));
  //console.log(user.email);
  //    alert("Message", "Check This Out")
  try {
    let response = await axios.post(
      API_URL + "post_next_kin",
      new URLSearchParams(data)
    );
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success " + response,
        timer: 1500,
        buttons: false,
      });
    } else
      swal({
        icon: "error",
        text: "Error " + response,
        timer: 1500,
        buttons: false,
      });
  } catch (response) {
    swal({
      icon: "error",
      text: "Error " + response,
      timer: 1500,
      buttons: false,
    });
  }
}

async function profileHomeOwnership(data) {
  var user = JSON.parse(localStorage.getItem("user"));
  data.user_signature = user.email;
 // localStorage.setItem("projectname", JSON.stringify(data.projectname));
  //console.log(user.email);
  //    alert("Message", "Check This Out")
  try {
    let response = await axios.post(
      API_URL + "post_home_ownership",
      new URLSearchParams(data)
    );
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success " + response,
        timer: 1500,
        buttons: false,
      });
    } else
      swal({
        icon: "error",
        text: "Error " + response.message,
        timer: 1500,
        buttons: false,
      });
  } catch (response) {
    swal({
      icon: "error",
      text: "Error " + response.message,
      timer: 1500,
      buttons: false,
    });
  }
}

async function profileEmpDetails(data) {
  var user = JSON.parse(localStorage.getItem("user"));
  data.user_signature = user.email;
 // localStorage.setItem("projectname", JSON.stringify(data.projectname));
  //console.log(user.email);
  //    alert("Message", "Check This Out")
  try {
    let response = await axios.post(
      API_URL + "post_emp_details",
      new URLSearchParams(data)
    );
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success " + response,
        timer: 1500,
        buttons: false,
      });
    } else
      swal({
        icon: "error",
        text: "Error " + response,
        timer: 1500,
        buttons: false,
      });
  } catch (response) {
    swal({
      icon: "error",
      text: "Error " + response,
      timer: 1500,
      buttons: false,
    });
  }
}

function productImage(data) {
  //        var projectname = JSON.parse(localStorage.getItem('projectname'));
  //        console.log(this.typeform.file.name)
  this.typeform.projectname = "JafarAkidaHouse12";
  axios.post(API_URL + "post_url", new URLSearchParams(data));
}

function profileData() {
    var user = JSON.parse(localStorage.getItem("user"));
    axios
    .get(API_URL + "get_user?email="+user.email).then(response=>{
      if (response.status === 200) {
        return response.data
      } else
        swal({
          icon: "error",
          text: "Error " + response.message,
          timer: 1500,
          buttons: false,
        });  
    }).catch (response => {
        swal({
      icon: "error",
      text: "Error " + response.message,
      timer: 1500,
      buttons: false,
    });
  })
}
