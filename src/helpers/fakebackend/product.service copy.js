import axios from "axios";
import swal from "sweetalert";
import { userService } from "./user.service";
// const API_URL = "https://ug-africana-api.azurewebsites.net/";
// const API_URL = "https://ttsrestcode.azurewebsites.net/project_api/v1/";
const API_URL = userService.API_URL+"project_api/v1/";
//import api from "../../api/authenticate";

export const productFunctions = {
  productInfo,
  productLocation,
  productImage,
  productData,
};

async function productInfo(projectDataPayload) {
  console.log(projectDataPayload);
  const formData = new FormData();

  formData.append("string", new Blob([JSON.stringify(projectDataPayload)], {type: 'application/json'}));
  for (let i = 0; i < projectDataPayload.file.length; i++) { 
    formData.append("files", projectDataPayload.file[i]);
    try {
      let response = await axios.post(
        API_URL + "post_proj_data",
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

function productData() {
  axios
    .get(API_URL + "get")
    .then(function (response) {
      // console.log(JSON.stringify(response.data[0].projectUpload.image))
      return response.data;
      // self.image = 'data:image/png;base64,'+ btoa (this.transactionData[0].projectUpload.image);
    })
    .catch(function (response) {
      swal({
        icon: "error",
        text: "Error " + response.message,
        timer: 1500,
        buttons: false,
      });  
    });
}
