import apiClient from "./axios"; // Custom Axios instance

const loanTypeApi = {
  // Fetch all loan types
  getAll: () => apiClient.get("/api/loan-types"),

  // Fetch a single loan type by ID
  getById: (id) => apiClient.get(`/api/loan-types/${id}`),

  // Fetch attributes for a specific loan type by ID
  getAttributesByTypeId: (id) => apiClient.get(`/api/loan-types/${id}/attributes`),

  // Create a new loan type
  create: (data) => apiClient.post("/api/loan-types", data),

  // Update an existing loan type
  update: (id, data) => apiClient.put(`/api/loan-types/${id}`, data),

  // Delete a loan type by ID
  delete: (id) => apiClient.delete(`/api/loan-types/${id}`),

  // Optional: Batch create or update (if supported)
  batchSave: (data) => apiClient.post("/api/loan-types/batch", data),

  // Optional: Search/filter functionality (if backend supports it)
  search: (params) => apiClient.get("/api/loan-types/search", { params }),
};

export default loanTypeApi;
