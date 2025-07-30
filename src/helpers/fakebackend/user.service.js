import { authHeader } from "./auth-header";
import axios from "axios";
import swal from "sweetalert";
// const API_URL = "https://ttshousingapi.azurewebsites.net/";
const API_URL = process.env.VUE_APP_API_BASE_URL;
// const API_URL = "https://ttsrestlocation.azurewebsites.net/";
// ttshousingapi.azurewebsites.net
// const API_URL = "http://localhost/";

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token; 
//import api from "../../api/authenticate";

export const userService = {
  API_URL,
  login,
  logout,
  register,
  getAll,
};

function login(email, password) {
  // const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email: email, password: password })
  // };

  return new Promise((resolve, reject) => {
    // return axios.post(API_URL+'login_request', { email: email, password: password })
    setTimeout(async () => {
      let filteredUsers = await axios.post(API_URL + "login_request", {
        email: email,
        password: password,
      });

      if (filteredUsers.status === 200) {
        swal({
          icon: "success",
          text: "Welcome",
          timer: 1500,
          buttons: false,
        });

          // if login details are valid return user details and fake jwt token
          let user = {
            token: filteredUsers.data,
          };
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(user)),
          });
      } else
        swal({
          icon: "error",
          text: "Error " + filteredUsers.error,
          timer: 1500,
          buttons: false,
        });

        reject("These credentials do not match our records.");
      
      return;
      // return axios.post(API_URL+'login_request', {email: email, password: password})
      // .then(response => {
      //     if (response.data.token) {
      //       localStorage.setItem('user', JSON.stringify(response.data));
      //     }
      //     return response.data;
      //   });
    }, 500);
  })
    .then(handleResponse)
    .then((user) => {
      console.log("from user service" + user);
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

async function register(user) {
  try {
    let response = await axios.post(API_URL + "post_service", user);
    if (response.status === 200) {
      swal({
        icon: "success",
        text: "Success",
        timer: 1500,
        buttons: false,
      });
    } else
      swal({
        icon: "success",
        text: "Success " + response.error,
        timer: 1500,
        buttons: false,
      });
  } catch (response) {
    swal({
        icon: "success",
        text: "Success " + response.error,
      timer: 1500,
        buttons: false,
    });
  }
  // const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(user)
  // };
  // return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
