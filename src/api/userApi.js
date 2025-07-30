import apiClient from "./axios"; // Your custom Axios instance

const userApi = {
  // Get all users
  getAll: () => apiClient.get("/get_service"),

  // Get user by email using request param
  getByEmail: (email) => apiClient.get("/get_user", { params: { email } }),
  getById: (id) => apiClient.get("/get/", { params: { id } }),

  // Get user by email using path variable
  getByEmailPath: (email) => apiClient.get(`/get_user_data/${email}`),

  // Get current authenticated user (based on token)
  getCurrentUser: () => apiClient.get("/current_user"),

  // Login to get JWT token
  login: (credentials) => apiClient.post("/login_request", credentials),

  // Create/register a new user
  register: (userData) =>
    apiClient.post("/post_service", userData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  // Delete a user by email
  deleteByEmail: (email) => apiClient.delete(`/delete_service/${email}`),

  // Delete all users
  deleteAll: () => apiClient.delete("/delete_all_service"),

  // (Optional) Upload file - Uncomment and modify if needed
  // uploadFile: (id, file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   return apiClient.put(`/put_file/${id}`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // },
};

export default userApi;
