import axios from "axios";
import swal from "sweetalert";
import { userService } from "./user.service";

// const API_URL = "https://ug-africana-api.azurewebsites.net/";
// const API_URL = "https://ttsrestcode.azurewebsites.net/profile_api/v1/";
const API_URL =userService.API_URL+"profile_api/v1/";
//import api from "../../api/authenticate";

export const profilePicFunctions = {
  uploadProfile,
  data,
};

async function uploadProfile(data) {
  var user = JSON.parse(localStorage.getItem("user"));

  let formData = new FormData();
  formData.append("filename", user.name);
  formData.append("user", user.email);
  formData.append("file", data.update);
  //console.log(user.email);
  //    alert("Message", "Check This Out")
  try {
    let response = await axios.post(
      API_URL + "post_file",
      formData
    );
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success " + response.status,
        timer: 1500,
        buttons: false,
      }).then(
        function(){ 
          location.reload();
          }
      );
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

function data() {
  var user = JSON.parse(localStorage.getItem("user"));
  axios
    .get(API_URL + "get_docs/"+user.email)
}
