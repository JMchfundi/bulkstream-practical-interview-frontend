import axios from "axios";
import swal from "sweetalert";
import { userService } from "./user.service";

// const API_URL = "https://ug-africana-api.azurewebsites.net/";
// const API_URL = "https://ttsrestcode.azurewebsites.net/doc_api/v1/";
const API_URL = userService.API_URL+"doc_api/v1/";
//import api from "../../api/authenticate";

export const documentsFunctions = {
  uploadDocument,
  productLocation,
  productImage,
  data,
};

async function uploadDocument(data) {
  var user = JSON.parse(localStorage.getItem("user"));

  let formData = new FormData();
  formData.append("filename", data.doctype);
  formData.append("user", user.email);
  // formData.append("files", data.file);
  // formData.append("files", data.file);

  for (let i = 0; i < data.file.length; i++) {
    formData.append("files", data.file[i]);
}
  
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

async function productLocation(data) {
  var projectname = JSON.parse(localStorage.getItem('projectname'));
  data.projectname = projectname;

  try {
    let response =   await axios.post(API_URL + "post_url", new URLSearchParams(data));
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Saved" + response.status,
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

async function productImage(data) {
  var projectname = JSON.parse(localStorage.getItem('projectname'));
  //        console.log(this.typeform.file.name)
  data.projectname = projectname;
  try {
let response = await axios.post(API_URL + "post_url", new URLSearchParams(data));
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Saved" + response.status,
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

function data() {
  var user = JSON.parse(localStorage.getItem("user"));
  axios
    .get(API_URL + "get_docs/"+user.email)
}
